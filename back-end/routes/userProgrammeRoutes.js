import express from "express";
import {
  subscribeToProgramme,
  unsubscribeFromProgramme,
  markSeanceAsCompleted,
  validateWeek,
  getHistoriqueProgrammes,
  cancelLastSeance,
  getCurrentProgramme,
} from "../controllers/userProgrammeController.js";

const router = express.Router();

router.get("/current", getCurrentProgramme);
router.post("/complete-seance", markSeanceAsCompleted);
router.post("/validate-week", validateWeek);
router.delete("/unsubscribe", unsubscribeFromProgramme);
router.post("/:programmeId", subscribeToProgramme);
router.get("/history", getHistoriqueProgrammes);
router.delete("/cancel-last-seance", cancelLastSeance);

export default router;
