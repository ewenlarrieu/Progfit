import Programme from "../models/Programme.js";

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
          "All fields are required: nom, description, difficulte, objectif, duree, seances",
      });
    }

    const validDifficulties = ["Beginner", "Intermediate", "Advanced"];
    if (!validDifficulties.includes(difficulte)) {
      return res.status(400).json({
        message: "Difficulte must be: Beginner, Intermediate, or Advanced",
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
          "Objectif must be: perte de poids, prise de masse, entretien, or force",
      });
    }

    if (!Array.isArray(seances) || seances.length === 0) {
      return res.status(400).json({
        message: "At least one seance is required",
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
      message: "Programme created successfully!",
      programme: newProgramme,
    });
  } catch (error) {
    console.error("Error creating programme:", error);
    res.status(500).json({
      message: "Server error while creating programme",
    });
  }
};

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
      message: "Server error while getting programmes",
    });
  }
};

export const deleteProgramme = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProgramme = await Programme.findByIdAndDelete(id);

    if (!deletedProgramme) {
      return res.status(404).json({
        message: "Programme not found",
      });
    }

    res.status(200).json({
      message: "Programme deleted successfully",
      programme: deletedProgramme,
    });
  } catch (error) {
    console.error("Error deleting programme:", error);
    res.status(500).json({
      message: "Server error while deleting programme",
    });
  }
};
