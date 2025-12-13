import Programme from "../models/Programme.js";
import User from "../models/User.js";

//Subscribe to programme
export const subscribeToProgramme = async (req, res) => {
  try {
    const userId = req.user._id;
    const { programmeId } = req.params;

    const existingUser = await User.findById(userId);
    if (
      existingUser.programmeActuel &&
      existingUser.programmeActuel.programmeId
    ) {
      return res.status(400).json({
        message:
          "Vous êtes déjà inscrit à un programme. Veuillez vous désinscrire d'abord.",
      });
    }

    const programme = await Programme.findById(programmeId);
    if (!programme) {
      return res.status(401).json({
        message: "Programme non trouvé",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        "programmeActuel.programmeId": programmeId,
        "programmeActuel.dateDebut": new Date(),
        "programmeActuel.semaineActuelle": 1,
        "programmeActuel.seancesCompletees": [],
        "programmeActuel.statut": "actif",
      },
      { new: true }
    );
    res.status(200).json({
      message: "Inscription au programme réussie",
      user: {
        id: user._id,
        nom: user.nom,
        programmeActuel: user.programmeActuel,
      },
    });
  } catch (error) {
    console.error("Error subscribing to programme:", error);
    res.status(500).json({
      message: "Erreur serveur lors de l'inscription au programme",
    });
  }
};

//Unsubscribe to programme
export const unsubscribeFromProgramme = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    if (!user.programmeActuel || !user.programmeActuel.programmeId) {
      return res.status(400).json({
        message: "Aucun programme actif à annuler",
      });
    }

    user.historiquePrograms.push({
      programmeId: user.programmeActuel.programmeId,
      dateDebut: user.programmeActuel.dateDebut,
      dateFin: new Date(),
      statut: "abandonne",
    });
    user.programmeActuel = undefined;

    await user.save();

    res.status(200).json({
      message: "Désinscription du programme réussie",
      user: {
        id: user._id,
        nom: user.nom,
        programmeActuel: user.programmeActuel,
      },
    });
  } catch (error) {
    console.error("Error unsubscribing from programme:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la désinscription du programme",
    });
  }
};

// Mark a seance as completed
export const markSeanceAsCompleted = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jour } = req.body;

    if (!jour) {
      return res.status(400).json({
        message: "Le jour est requis",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    if (!user.programmeActuel || !user.programmeActuel.programmeId) {
      return res.status(400).json({
        message: "Aucun programme actif",
      });
    }

    const programme = await Programme.findById(
      user.programmeActuel.programmeId
    );
    if (!programme) {
      return res.status(404).json({
        message: "Programme non trouvé",
      });
    }

    const seanceExists = programme.seances.some((s) => s.jour === jour);
    if (!seanceExists) {
      return res.status(400).json({
        message: "Ce jour n'existe pas dans le programme",
      });
    }

    if (user.programmeActuel.seancesCompletees.includes(jour)) {
      return res.status(400).json({
        message: "Cette séance est déjà terminée",
      });
    }

    user.programmeActuel.seancesCompletees.push(jour);

    user.totalSeancesCompletees = (user.totalSeancesCompletees || 0) + 1;

    await user.save();

    // Check if all seances are now completed
    const allJours = programme.seances.map((s) => s.jour);
    const allCompleted = allJours.every((j) =>
      user.programmeActuel.seancesCompletees.includes(j)
    );

    res.status(200).json({
      message: allCompleted
        ? "Séance terminée ! Toutes les séances sont complétées, vous pouvez valider la semaine"
        : "Séance marquée comme terminée",
      weekComplete: allCompleted,
      user: {
        id: user._id,
        nom: user.nom,
        programmeActuel: user.programmeActuel,
      },
    });
  } catch (error) {
    console.error("Error marking seance as completed:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la validation de la séance",
    });
  }
};

// Validate and move to next week
export const validateWeek = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    if (!user.programmeActuel || !user.programmeActuel.programmeId) {
      return res.status(400).json({
        message: "Aucun programme actif",
      });
    }

    // Check if programme is already completed
    if (user.programmeActuel.statut === "termine") {
      return res.status(400).json({
        message: "Ce programme est déjà terminé",
      });
    }

    const programme = await Programme.findById(
      user.programmeActuel.programmeId
    );
    if (!programme) {
      return res.status(404).json({
        message: "Programme non trouvé",
      });
    }

    const allJours = programme.seances.map((s) => s.jour);
    const allCompleted = allJours.every((j) =>
      user.programmeActuel.seancesCompletees.includes(j)
    );

    if (!allCompleted) {
      return res.status(400).json({
        message:
          "Toutes les séances doivent être terminées avant de valider la semaine",
        completed: user.programmeActuel.seancesCompletees.length,
        total: allJours.length,
      });
    }

    // Move to next week
    user.programmeActuel.semaineActuelle += 1;
    user.programmeActuel.seancesCompletees = [];

    if (user.programmeActuel.semaineActuelle > programme.duree) {
      // Add to history before clearing
      user.historiquePrograms.push({
        programmeId: user.programmeActuel.programmeId,
        dateDebut: user.programmeActuel.dateDebut,
        dateFin: new Date(),
        statut: "termine",
      });
      user.programmeActuel = undefined;

      await user.save();

      return res.status(200).json({
        message: "Programme terminé ! Félicitations !",
        programmeCompleted: true,
        user: {
          id: user._id,
          nom: user.nom,
          programmeActuel: user.programmeActuel,
        },
      });
    }

    await user.save();

    res.status(200).json({
      message: `Semaine ${
        user.programmeActuel.semaineActuelle - 1
      } validée ! Passage à la semaine ${user.programmeActuel.semaineActuelle}`,
      user: {
        id: user._id,
        nom: user.nom,
        programmeActuel: user.programmeActuel,
      },
    });
  } catch (error) {
    console.error("Error validating week:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la validation de la semaine",
    });
  }
};

//Get history programmes
export const getHistoriqueProgrammes = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate(
      "historiquePrograms.programmeId"
    );

    if (!user) {
      return res.status(401).json({
        message: "Utilisateur non trouvé",
      });
    }

    res.status(200).json({
      message: "Historique des programmes :",
      histoique: user.historiquePrograms,
    });
  } catch (error) {
    console.error("Error getting history:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'historique",
    });
  }
};

//Get curent programme
export const getCurrentProgramme = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate(
      "programmeActuel.programmeId"
    );

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    if (!user.programmeActuel || !user.programmeActuel.programmeId) {
      return res.status(200).json({
        message: "Aucun programme actif",
        programmeActuel: null,
      });
    }

    res.status(200).json({
      message: "Programme actuel récupéré avec succès",
      programmeActuel: {
        programme: user.programmeActuel.programmeId,
        dateDebut: user.programmeActuel.dateDebut,
        semaineActuelle: user.programmeActuel.semaineActuelle,
        seancesCompletees: user.programmeActuel.seancesCompletees,
        statut: user.programmeActuel.statut,
      },
    });
  } catch (error) {
    console.error("Error getting current programme:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération du programme actuel",
    });
  }
};
