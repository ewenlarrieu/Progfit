import express from "express";
import {
  subscribeToProgramme,
  unsubscribeFromProgramme,
  markSeanceAsCompleted,
  validateWeek,
  getHistoriqueProgrammes,
  getCurrentProgramme,
} from "../controllers/userProgrammeController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/current", auth, getCurrentProgramme);
router.post("/complete-seance", auth, markSeanceAsCompleted);
router.post("/validate-week", auth, validateWeek);
router.delete("/unsubscribe", auth, unsubscribeFromProgramme);
router.post("/:programmeId", auth, subscribeToProgramme);
router.get("/history", auth, getHistoriqueProgrammes);

export default router;
