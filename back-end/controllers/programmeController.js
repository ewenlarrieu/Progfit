import Programme from "../models/Programme.js";
import Exercice from "../models/Exercice.js";

// Récupérer tous les programmes
export const getAllProgrammes = async (req, res) => {
  try {
    const programmes = await Programme.find().sort({ nom: 1 });

    res.status(200).json({
      message: "Programmes récupérés avec succès",
      count: programmes.length,
      programmes,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des programmes:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des programmes",
    });
  }
};

// Récupérer programmes par niveau
export const getProgrammesByLevel = async (req, res) => {
  try {
    const { niveau } = req.params;

    // Valider que le niveau est autorisé
    const niveauxAutorises = ["Débutant", "Intermédiaire", "Avancé"];
    if (!niveauxAutorises.includes(niveau)) {
      return res.status(400).json({
        message: `Niveau invalide. Les niveaux autorisés sont: ${niveauxAutorises.join(
          ", "
        )}`,
      });
    }

    const programmes = await Programme.find({ niveau }).sort({ nom: 1 });

    res.status(200).json({
      message: `Programmes de niveau ${niveau} récupérés avec succès`,
      count: programmes.length,
      programmes,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des programmes par niveau:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des programmes",
    });
  }
};

// Récupérer un programme avec ses exercices détaillés
export const getProgrammeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const programme = await Programme.findById(id).populate(
      "seances.exercices"
    );

    if (!programme) {
      return res.status(404).json({
        message: "Programme non trouvé",
      });
    }

    res.status(200).json({
      message: "Détails du programme récupérés avec succès",
      programme,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du programme:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des détails",
    });
  }
};

// Assigner des exercices aux programmes selon leur niveau et objectif
export const assignExercisesToProgrammes = async (req, res) => {
  try {
    console.log("🔧 Assignation des exercices aux programmes...");

    // Récupérer tous les programmes et exercices
    const programmes = await Programme.find();
    const exercices = await Exercice.find();

    console.log(`📊 ${programmes.length} programmes trouvés`);
    console.log(`🏋️ ${exercices.length} exercices disponibles`);

    // Définir les exercices par type de programme
    const exercicesParNiveau = {
      Débutant: exercices.filter((ex) => ex.niveau === "Débutant"),
      Intermédiaire: exercices.filter((ex) => ex.niveau === "Intermédiaire"),
      Avancé: exercices.filter((ex) => ex.niveau === "Avancé"),
    };

    // Exercices spécifiques par objectif
    const exercicesParObjectif = {
      Entretien: [
        "Pompes",
        "Squats",
        "Planche",
        "Étirements des bras",
        "Marche sur place",
        "Étirements des jambes",
        "Rotation du tronc",
      ],
      "Perte de poids": [
        "Burpees",
        "Mountain Climbers",
        "Jumping Jacks",
        "Squats sautés",
        "Pompes",
        "Planche",
      ],
      "Prise de masse": [
        "Pompes",
        "Squats",
        "Tractions",
        "Dips",
        "Pike push-ups",
        "Fentes",
      ],
      Force: [
        "Pompes diamant",
        "Squats isométriques",
        "Planche avancée",
        "Tractions",
        "Handstand push-ups assistés",
      ],
    };

    let programmesModifies = 0;

    for (const programme of programmes) {
      console.log(
        `\n🎯 Traitement programme: ${programme.nom} (${programme.niveau} - ${programme.objectif})`
      );

      // Sélectionner les exercices appropriés
      const exercicesDisponibles =
        exercicesParNiveau[programme.niveau] || exercices;
      const exercicesObjectif = exercicesParObjectif[programme.objectif] || [];

      // Filtrer les exercices par nom pour cet objectif
      const exercicesSelectionnes = exercicesDisponibles.filter((ex) =>
        exercicesObjectif.includes(ex.nom)
      );

      // Si pas assez d'exercices spécifiques, ajouter d'autres exercices du niveau
      if (exercicesSelectionnes.length < 6) {
        const exercicesSupplementaires = exercicesDisponibles
          .filter(
            (ex) => !exercicesSelectionnes.some((sel) => sel._id.equals(ex._id))
          )
          .slice(0, 6 - exercicesSelectionnes.length);
        exercicesSelectionnes.push(...exercicesSupplementaires);
      }

      console.log(
        `   ✅ ${exercicesSelectionnes.length} exercices sélectionnés`
      );

      // Assigner les exercices aux séances
      programme.seances.forEach((seance, index) => {
        // Assigner 2-4 exercices par séance selon le niveau
        const nombreExercices =
          programme.niveau === "Débutant"
            ? 3
            : programme.niveau === "Intermédiaire"
            ? 4
            : 5;

        // Mélanger et sélectionner des exercices
        const exercicesSeance = exercicesSelectionnes
          .sort(() => 0.5 - Math.random())
          .slice(0, nombreExercices)
          .map((ex) => ex._id);

        seance.exercices = exercicesSeance;
        console.log(
          `   🏋️ Séance ${index + 1}: ${
            exercicesSeance.length
          } exercices assignés`
        );
      });

      await programme.save();
      programmesModifies++;
    }

    console.log(
      `\n✅ ${programmesModifies} programmes mis à jour avec succès !`
    );

    res.status(200).json({
      message: `${programmesModifies} programmes mis à jour avec des exercices`,
      programmesModifies,
      totalExercices: exercices.length,
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'assignation:", error);
    res.status(500).json({
      message: "Erreur serveur lors de l'assignation des exercices",
      error: error.message,
    });
  }
};

// Supprimer tous les programmes (fonction utilitaire)
export const deleteAllProgrammes = async (req, res) => {
  try {
    const result = await Programme.deleteMany({});

    res.status(200).json({
      message: `Tous les programmes ont été supprimés avec succès`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression des programmes:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la suppression des programmes",
    });
  }
};
