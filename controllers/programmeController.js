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

// Récupérer programmes par niveau et objectif
export const getProgrammesByProfile = async (req, res) => {
  try {
    const { niveau, objectif } = req.params;

    const programmes = await Programme.find({
      niveau: niveau,
      objectif: objectif,
    }).sort({ nom: 1 });

    res.status(200).json({
      message: `Programmes ${niveau} pour ${objectif} récupérés avec succès`,
      count: programmes.length,
      programmes,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des programmes par profil:",
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

// Ajouter le programme Full Body
export const addFullBodyProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Full Body - Perte de poids",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Full Body existe déjà",
      });
    }

    // Récupérer les exercices nécessaires
    const exercices = await Exercice.find({
      nom: {
        $in: ["Pompes", "Squats", "Planche", "Fentes", "Mountain Climbers"],
      },
    });

    if (exercices.length < 5) {
      return res.status(400).json({
        message:
          "Tous les exercices requis ne sont pas disponibles. Ajoutez d'abord les exercices de base.",
      });
    }

    // Créer le programme Full Body
    const fullBodyProgram = {
      nom: "Full Body - Perte de poids",
      description:
        "Programme complet 3 fois par semaine pour brûler les graisses et tonifier tout le corps",
      niveau: "Débutant",
      objectif: "Perte de poids",
      duree: 4, // 4 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance Full Body A",
          objectif: "Renforcement corps entier + cardio",
          dureeEstimee: 45,
          exercices: [
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Planche")._id,
            exercices.find((e) => e.nom === "Mountain Climbers")._id,
          ],
        },
        {
          jour: 3,
          nom: "Séance Full Body B",
          objectif: "Renforcement + endurance",
          dureeEstimee: 45,
          exercices: [
            exercices.find((e) => e.nom === "Fentes")._id,
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Planche")._id,
          ],
        },
        {
          jour: 5,
          nom: "Séance Full Body C",
          objectif: "Circuit intensif",
          dureeEstimee: 50,
          exercices: [
            exercices.find((e) => e.nom === "Mountain Climbers")._id,
            exercices.find((e) => e.nom === "Fentes")._id,
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Planche")._id,
          ],
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(fullBodyProgram);

    res.status(201).json({
      message: "Programme Full Body créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error("Erreur lors de la création du programme Full Body:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};
