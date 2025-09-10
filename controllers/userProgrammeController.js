import User from "../models/User.js";
import Programme from "../models/Programme.js";
import jwt from "jsonwebtoken";

// S'inscrire à un programme
export const inscrireAuProgramme = async (req, res) => {
  try {
    const { programmeId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token d'authentification requis",
      });
    }

    // Décoder le token pour obtenir l'ID utilisateur
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Correction: utiliser userId au lieu de id

    // Vérifier que le programme existe
    const programme = await Programme.findById(programmeId);
    if (!programme) {
      return res.status(404).json({
        message: "Programme non trouvé",
      });
    }

    // Récupérer l'utilisateur
    const user = await User.findById(userId);
    console.log("Utilisateur trouvé:", user ? "Oui" : "Non");
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
        userId: userId,
        decodedToken: decoded,
      });
    }

    // Vérifier si l'utilisateur a déjà un programme actuel
    if (
      user.programmeActuel &&
      user.programmeActuel.programmeId &&
      user.programmeActuel.statut === "actif"
    ) {
      return res.status(400).json({
        message:
          "Vous avez déjà un programme actif. Terminez-le avant d'en commencer un nouveau.",
        programmeActuel: user.programmeActuel,
      });
    }

    // Assigner le nouveau programme
    user.programmeActuel = {
      programmeId: programmeId,
      dateDebut: new Date(),
      progression: 0,
      statut: "actif",
    };

    await user.save();

    // Retourner l'utilisateur avec le programme populé
    const userWithProgramme = await User.findById(userId).populate(
      "programmeActuel.programmeId"
    );

    res.status(200).json({
      message: "Inscription au programme réussie !",
      programmeActuel: userWithProgramme.programmeActuel,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription au programme:", error);
    res.status(500).json({
      message: "Erreur serveur lors de l'inscription au programme",
    });
  }
};

// Récupérer le programme actuel de l'utilisateur
export const getProgrammeActuel = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token d'authentification requis",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).populate(
      "programmeActuel.programmeId"
    );

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    if (
      !user.programmeActuel ||
      !user.programmeActuel.programmeId ||
      user.programmeActuel.statut !== "actif"
    ) {
      return res.status(404).json({
        message: "Aucun programme actuel",
      });
    }

    res.status(200).json({
      message: "Programme actuel récupéré avec succès",
      programmeActuel: user.programmeActuel,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du programme actuel:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération du programme actuel",
    });
  }
};

// Terminer le programme actuel
export const terminerProgramme = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token d'authentification requis",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    if (
      !user.programmeActuel ||
      !user.programmeActuel.programmeId ||
      user.programmeActuel.statut !== "actif"
    ) {
      return res.status(400).json({
        message: "Aucun programme actif à terminer",
      });
    }

    // Ajouter le programme à l'historique
    user.historiquePrograms.push({
      programmeId: user.programmeActuel.programmeId,
      dateDebut: user.programmeActuel.dateDebut,
      dateFin: new Date(),
      progression: user.programmeActuel.progression,
      statut: "termine",
    });

    // Réinitialiser le programme actuel
    user.programmeActuel = {
      programmeId: null,
      dateDebut: null,
      progression: 0,
      statut: "actif",
    };

    await user.save();

    res.status(200).json({
      message: "Programme terminé avec succès !",
    });
  } catch (error) {
    console.error("Erreur lors de la fin du programme:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la fin du programme",
    });
  }
};

// Abandonner le programme actuel
export const abandonnerProgramme = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token d'authentification requis",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    if (
      !user.programmeActuel ||
      !user.programmeActuel.programmeId ||
      user.programmeActuel.statut !== "actif"
    ) {
      return res.status(400).json({
        message: "Aucun programme actif à abandonner",
      });
    }

    // Ajouter le programme à l'historique
    user.historiquePrograms.push({
      programmeId: user.programmeActuel.programmeId,
      dateDebut: user.programmeActuel.dateDebut,
      dateFin: new Date(),
      progression: user.programmeActuel.progression,
      statut: "abandonne",
    });

    // Réinitialiser le programme actuel
    user.programmeActuel = {
      programmeId: null,
      dateDebut: null,
      progression: 0,
      statut: "actif",
    };

    await user.save();

    res.status(200).json({
      message: "Programme abandonné",
    });
  } catch (error) {
    console.error("Erreur lors de l'abandon du programme:", error);
    res.status(500).json({
      message: "Erreur serveur lors de l'abandon du programme",
    });
  }
};

// Mettre à jour la progression du programme
export const mettreAJourProgression = async (req, res) => {
  try {
    const { progression } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token d'authentification requis",
      });
    }

    // Valider la progression
    if (
      typeof progression !== "number" ||
      progression < 0 ||
      progression > 100
    ) {
      return res.status(400).json({
        message: "La progression doit être un nombre entre 0 et 100",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    if (
      !user.programmeActuel ||
      !user.programmeActuel.programmeId ||
      user.programmeActuel.statut !== "actif"
    ) {
      return res.status(400).json({
        message: "Aucun programme actif",
      });
    }

    // Mettre à jour la progression
    user.programmeActuel.progression = progression;
    await user.save();

    res.status(200).json({
      message: "Progression mise à jour avec succès",
      progression: user.programmeActuel.progression,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la progression:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour de la progression",
    });
  }
};

// Récupérer l'historique des programmes
export const getHistoriquePrograms = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token d'authentification requis",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).populate(
      "historiquePrograms.programmeId"
    );

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    res.status(200).json({
      message: "Historique des programmes récupéré avec succès",
      historique: user.historiquePrograms,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'historique",
    });
  }
};

// Marquer une séance comme terminée
export const terminerSeance = async (req, res) => {
  try {
    const { seanceIndex, exercicesTermines } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token d'authentification requis",
      });
    }

    // Valider les données d'entrée
    if (typeof seanceIndex !== "number" || seanceIndex < 0) {
      return res.status(400).json({
        message: "L'index de la séance doit être un nombre positif",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).populate(
      "programmeActuel.programmeId"
    );

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    if (
      !user.programmeActuel ||
      !user.programmeActuel.programmeId ||
      user.programmeActuel.statut !== "actif"
    ) {
      return res.status(400).json({
        message: "Aucun programme actif",
      });
    }

    // Vérifier que l'index de séance est valide
    const programme = user.programmeActuel.programmeId;
    if (seanceIndex >= programme.seances.length) {
      return res.status(400).json({
        message: `Index de séance invalide. Le programme a ${
          programme.seances.length
        } séances (0-${programme.seances.length - 1})`,
      });
    }

    // Vérifier si la séance n'est pas déjà terminée
    const seanceDejaTerminee = user.programmeActuel.seancesTerminees.find(
      (s) => s.seanceIndex === seanceIndex
    );

    if (seanceDejaTerminee) {
      return res.status(400).json({
        message: "Cette séance a déjà été marquée comme terminée",
        dateTerminee: seanceDejaTerminee.dateTerminee,
      });
    }

    // Ajouter la séance terminée
    const nouvelleSeanceTerminee = {
      seanceIndex: seanceIndex,
      dateTerminee: new Date(),
      exercicesTermines: exercicesTermines || [],
    };

    user.programmeActuel.seancesTerminees.push(nouvelleSeanceTerminee);

    // Calculer automatiquement la progression basée sur les séances terminées
    const totalSeances = programme.seances.length;
    const seancesTermineesCount = user.programmeActuel.seancesTerminees.length;
    const nouvelleProgression = Math.round(
      (seancesTermineesCount / totalSeances) * 100
    );

    user.programmeActuel.progression = nouvelleProgression;

    await user.save();

    res.status(200).json({
      message: "Séance marquée comme terminée avec succès !",
      seanceTerminee: nouvelleSeanceTerminee,
      progression: nouvelleProgression,
      seancesTerminees: seancesTermineesCount,
      totalSeances: totalSeances,
    });
  } catch (error) {
    console.error("Erreur lors de la validation de la séance:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la validation de la séance",
    });
  }
};

// Récupérer les séances terminées du programme actuel
export const getSeancesTerminees = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token d'authentification requis",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId)
      .populate("programmeActuel.programmeId")
      .populate(
        "programmeActuel.seancesTerminees.exercicesTermines.exerciceId"
      );

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    if (
      !user.programmeActuel ||
      !user.programmeActuel.programmeId ||
      user.programmeActuel.statut !== "actif"
    ) {
      return res.status(400).json({
        message: "Aucun programme actif",
      });
    }

    const programme = user.programmeActuel.programmeId;
    const seancesTerminees = user.programmeActuel.seancesTerminees;

    // Créer un résumé avec les détails des séances
    const resumeSeances = programme.seances.map((seance, index) => {
      const seanceTerminee = seancesTerminees.find(
        (st) => st.seanceIndex === index
      );

      return {
        index: index,
        nom: seance.nom,
        objectif: seance.objectif,
        dureeEstimee: seance.dureeEstimee,
        terminee: !!seanceTerminee,
        dateTerminee: seanceTerminee?.dateTerminee || null,
        exercicesTermines: seanceTerminee?.exercicesTermines || [],
      };
    });

    res.status(200).json({
      message: "Séances récupérées avec succès",
      programme: {
        nom: programme.nom,
        totalSeances: programme.seances.length,
      },
      progression: user.programmeActuel.progression,
      seancesTermineesCount: seancesTerminees.length,
      seances: resumeSeances,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des séances:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des séances",
    });
  }
};

// Annuler/Supprimer une séance terminée
export const annulerSeance = async (req, res) => {
  try {
    const { seanceIndex } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token d'authentification requis",
      });
    }

    if (typeof seanceIndex !== "number" || seanceIndex < 0) {
      return res.status(400).json({
        message: "L'index de la séance doit être un nombre positif",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).populate(
      "programmeActuel.programmeId"
    );

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    if (
      !user.programmeActuel ||
      !user.programmeActuel.programmeId ||
      user.programmeActuel.statut !== "actif"
    ) {
      return res.status(400).json({
        message: "Aucun programme actif",
      });
    }

    // Trouver et supprimer la séance terminée
    const indexASupprimer = user.programmeActuel.seancesTerminees.findIndex(
      (s) => s.seanceIndex === seanceIndex
    );

    if (indexASupprimer === -1) {
      return res.status(404).json({
        message: "Cette séance n'a pas été marquée comme terminée",
      });
    }

    user.programmeActuel.seancesTerminees.splice(indexASupprimer, 1);

    // Recalculer la progression
    const programme = user.programmeActuel.programmeId;
    const totalSeances = programme.seances.length;
    const seancesTermineesCount = user.programmeActuel.seancesTerminees.length;
    const nouvelleProgression = Math.round(
      (seancesTermineesCount / totalSeances) * 100
    );

    user.programmeActuel.progression = nouvelleProgression;

    await user.save();

    res.status(200).json({
      message: "Séance annulée avec succès",
      progression: nouvelleProgression,
      seancesTerminees: seancesTermineesCount,
      totalSeances: totalSeances,
    });
  } catch (error) {
    console.error("Erreur lors de l'annulation de la séance:", error);
    res.status(500).json({
      message: "Erreur serveur lors de l'annulation de la séance",
    });
  }
};
