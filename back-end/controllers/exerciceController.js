import Exercice from "../models/Exercice.js";

// Récupérer tous les exercices
export const getAllExercices = async (req, res) => {
  try {
    const exercices = await Exercice.find().sort({ nom: 1 });

    res.status(200).json({
      message: "Exercices récupérés avec succès",
      count: exercices.length,
      exercices,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des exercices:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des exercices",
    });
  }
};

// Récupérer un exercice par ID
export const getExerciceById = async (req, res) => {
  try {
    const { id } = req.params;

    const exercice = await Exercice.findById(id);

    if (!exercice) {
      return res.status(404).json({
        message: "Exercice non trouvé",
      });
    }

    res.status(200).json({
      message: "Exercice récupéré avec succès",
      exercice,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'exercice:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'exercice",
    });
  }
};

// Supprimer tous les exercices
export const deleteAllExercices = async (req, res) => {
  try {
    const result = await Exercice.deleteMany({});

    res.status(200).json({
      message: "Tous les exercices ont été supprimés avec succès",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression des exercices:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la suppression des exercices",
    });
  }
};

// Ajouter des exercices
export const addExercicesFromJSON = async (req, res) => {
  try {
    const { exercices, replaceAll = false } = req.body;

    // Validation du format
    if (!exercices || !Array.isArray(exercices)) {
      return res.status(400).json({
        message: "Le body doit contenir un tableau 'exercices'",
        example: {
          exercices: [
            {
              nom: "Nom de l'exercice",
              description: "Description",
              groupesMusculaires: ["Pectoraux", "Triceps"],
              instructions: ["Étape 1", "Étape 2"],
              series: 3,
              repetitions: "8-12",
              niveau: "Débutant",
            },
          ],
          replaceAll: false, // optionnel, pour remplacer tous les exercices
        },
      });
    }

    // Si replaceAll est true, supprimer tous les exercices existants
    if (replaceAll) {
      const deletedCount = await Exercice.deleteMany({});
      console.log(`${deletedCount.deletedCount} exercices supprimés`);
    }

    // Valider chaque exercice
    const exercicesValides = [];
    const erreurs = [];

    for (let i = 0; i < exercices.length; i++) {
      const exercice = exercices[i];

      // Validation des champs requis
      if (
        !exercice.nom ||
        !exercice.description ||
        !exercice.groupesMusculaires ||
        !exercice.instructions ||
        !exercice.series ||
        !exercice.repetitions ||
        !exercice.niveau
      ) {
        erreurs.push(`Exercice ${i + 1}: Champs manquants`);
        continue;
      }

      // Validation du niveau
      if (!["Débutant", "Intermédiaire", "Avancé"].includes(exercice.niveau)) {
        erreurs.push(
          `Exercice ${
            i + 1
          }: Niveau invalide (doit être: Débutant, Intermédiaire, ou Avancé)`
        );
        continue;
      }

      exercicesValides.push(exercice);
    }

    if (erreurs.length > 0) {
      return res.status(400).json({
        message: "Erreurs de validation",
        erreurs,
        exercicesValides: exercicesValides.length,
        exercicesTotal: exercices.length,
      });
    }

    // Insérer les exercices valides
    const exercicesAjoutes = await Exercice.insertMany(exercicesValides);

    res.status(201).json({
      message: `${exercicesAjoutes.length} exercices ajoutés avec succès !`,
      count: exercicesAjoutes.length,
      exercices: exercicesAjoutes.map((ex) => ({
        id: ex._id,
        nom: ex.nom,
        niveau: ex.niveau,
      })),
      replaceAll: replaceAll,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout des exercices JSON:", error);
    res.status(500).json({
      message: "Erreur lors de l'ajout des exercices",
      error: error.message,
    });
  }
};
