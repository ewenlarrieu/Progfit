import Programme from "../models/Programme.js";

//Create programme (Admin)
export const createProgramme = async (req, res) => {
  try {
    const { nom, description, difficulte, objectif, duree, seances } = req.body;

    if (
      !nom ||
      !description ||
      !difficulte ||
      !objectif ||
      !duree ||
      !seances
    ) {
      return res.status(400).json({
        message:
          "Tous les champs sont requis : nom, description, difficulte, objectif, duree, seances",
      });
    }

    const validDifficulties = ["Débutant", "Intermédiaire", "Avancé"];
    if (!validDifficulties.includes(difficulte)) {
      return res.status(400).json({
        message: "La difficulté doit être : Débutant, Intermédiaire ou Avancé",
      });
    }

    const validGoals = [
      "perte de poids",
      "prise de masse",
      "entretien",
      "force",
    ];
    if (!validGoals.includes(objectif.toLowerCase())) {
      return res.status(400).json({
        message:
          "L'objectif doit être : perte de poids, prise de masse, entretien ou force",
      });
    }

    if (!Array.isArray(seances) || seances.length === 0) {
      return res.status(400).json({
        message: "Au moins une séance est requise",
      });
    }

    const newProgramme = await Programme.create({
      nom,
      description,
      difficulte,
      objectif,
      duree,
      seances,
    });

    res.status(201).json({
      message: "Programme créé avec succès !",
      programme: newProgramme,
    });
  } catch (error) {
    console.error("Error creating programme:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

//Get all programme
export const getAllProgrammes = async (req, res) => {
  try {
    const programmes = await Programme.find();

    res.status(200).json({
      success: true,
      count: programmes.length,
      programmes,
    });
  } catch (error) {
    console.error("Error getting programmes:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des programmes",
    });
  }
};

//Delete programme (Admin)
export const deleteProgramme = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProgramme = await Programme.findByIdAndDelete(id);

    if (!deletedProgramme) {
      return res.status(404).json({
        message: "Programme non trouvé",
      });
    }

    res.status(200).json({
      message: "Programme supprimé avec succès",
      programme: deletedProgramme,
    });
  } catch (error) {
    console.error("Error deleting programme:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la suppression du programme",
    });
  }
};

//Get programme by id
export const getProgrammeById = async (req, res) => {
  try {
    const { id } = req.params;

    const programme = await Programme.findById(id);

    if (!programme) {
      return res.status(404).json({
        message: "Programme non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      programme,
    });
  } catch (error) {
    console.error("Error getting programme:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération du programme",
    });
  }
};
