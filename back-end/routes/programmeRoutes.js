import express from "express";
import {
  getAllProgrammes,
  getProgrammesByLevel,
  getProgrammeDetails,
  deleteAllProgrammes,
  assignExercisesToProgrammes,
} from "../controllers/programmeController.js";

const router = express.Router();

// Route pour récupérer tous les programmes
router.get("/", getAllProgrammes);

// Route pour supprimer tous les programmes (réinitialisation)
router.delete("/delete-all", deleteAllProgrammes);

// Route pour récupérer programmes par niveau
router.get("/niveau/:niveau", getProgrammesByLevel);

// Route pour assigner automatiquement les exercices aux programmes
router.post("/assign-exercices", assignExercisesToProgrammes);

// Route pour récupérer un programme avec détails complets
router.get("/:id", getProgrammeDetails);

export default router;
