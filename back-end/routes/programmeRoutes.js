import express from "express";
import {
  createProgramme,
  deleteProgrammeById,
  getAllProgrammes,
  getProgrammesByLevel,
  getProgrammeDetails,
  assignExercisesToProgrammes,
} from "../controllers/programmeController.js";

const router = express.Router();

// Route pour créer un nouveau programme
router.post("/", createProgramme);

// Route pour supprimer un programme par son ID
router.delete("/:id", deleteProgrammeById);

// Route pour récupérer tous les programmes
router.get("/", getAllProgrammes);

// Route pour assigner automatiquement les exercices aux programmes
router.post("/assign-exercices", assignExercisesToProgrammes);

// Route pour récupérer un programme avec détails complets
router.get("/:id", getProgrammeDetails);

export default router;
