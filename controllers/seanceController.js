import Programme from "../models/Programme.js";
import Exercice from "../models/Exercice.js";

// Récupérer une séance complète avec échauffement et exercices
export const getSeanceComplete = async (req, res) => {
  try {
    const { programmeId, seanceId } = req.params;

    // Récupérer le programme et la séance spécifique
    const programme = await Programme.findById(programmeId);

    if (!programme) {
      return res.status(404).json({
        message: "Programme non trouvé",
      });
    }

    // Trouver la séance spécifique
    const seance = programme.seances.id(seanceId);

    if (!seance) {
      return res.status(404).json({
        message: "Séance non trouvée",
      });
    }

    // Récupérer les détails complets des exercices
    const exercicesDetailles = await Exercice.find({
      _id: { $in: seance.exercices },
    });

    // Créer l'échauffement standard
    const echauffement = {
      nom: "Échauffement",
      description: "Préparation du corps avant l'entraînement",
      duree: 5,
      instructions: [
        "Marchez sur place pendant 1 minute pour activer la circulation",
        "Effectuez 10 rotations d'épaules vers l'avant puis vers l'arrière",
        "Faites 10 flexions de genoux sur place",
        "Réalisez 5 fentes alternées sans descendre complètement",
        "Terminez par 10 balancements de bras de chaque côté",
      ],
    };

    // Créer les étirements de fin
    const etirements = {
      nom: "Étirements",
      description: "Retour au calme et assouplissement",
      duree: 5,
      instructions: [
        "Étirez vos bras au-dessus de la tête pendant 15 secondes",
        "Étirez chaque mollet contre un mur pendant 20 secondes",
        "Étirez vos quadriceps en attrapant votre cheville, 15s par jambe",
        "Étirez votre dos en vous penchant vers l'avant, jambes tendues",
        "Respirez profondément et décontractez-vous",
      ],
    };

    // Structure complète de la séance
    const seanceComplete = {
      programme: {
        nom: programme.nom,
        objectif: programme.objectif,
      },
      seance: {
        nom: seance.nom,
        objectif: seance.objectif,
        dureeEstimee: seance.dureeEstimee,
      },
      structure: [echauffement, ...exercicesDetailles, etirements],
    };

    res.status(200).json({
      message: "Séance complète récupérée avec succès",
      seanceComplete,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de la séance:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de la séance",
    });
  }
};

// Marquer un exercice comme terminé dans une séance
export const terminerExercice = async (req, res) => {
  try {
    const { exerciceIndex } = req.body;

    // Ici vous pourrez ajouter la logique pour sauvegarder la progression
    // Pour l'instant, on confirme simplement que l'exercice est terminé

    res.status(200).json({
      message: `Exercice ${exerciceIndex + 1} terminé avec succès !`,
      nextExercice: exerciceIndex + 1,
    });
  } catch (error) {
    console.error("Erreur lors de la validation de l'exercice:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la validation",
    });
  }
};
