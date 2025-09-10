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
