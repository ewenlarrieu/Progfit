import express from "express";
import {
  subscribeToProgramme,
  unsubscribeFromProgramme,
  markSeanceAsCompleted,
  validateWeek,
} from "../controllers/userProgrammeController.js";

const router = express.Router();

// Routes spécifiques AVANT les routes avec paramètres
router.post("/complete-seance", markSeanceAsCompleted);
router.post("/validate-week", validateWeek);
router.delete("/unsubscribe", unsubscribeFromProgramme);
router.post("/:programmeId", subscribeToProgramme);

export default router;
