import express from "express";
import {
  getSeanceComplete,
  terminerExercice,
} from "../controllers/seanceController.js";

const router = express.Router();

// Route pour récupérer une séance complète avec échauffement
router.get("/:programmeId/:seanceId", getSeanceComplete);

// Route pour marquer un exercice comme terminé
router.post("/terminer-exercice", terminerExercice);

export default router;
