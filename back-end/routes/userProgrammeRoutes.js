import express from "express";
import {
  inscrireAuProgramme,
  getProgrammeActuel,
  terminerProgramme,
  abandonnerProgramme,
  mettreAJourProgression,
  getHistoriquePrograms,
  terminerSeance,
  getSeancesTerminees,
  annulerSeance,
} from "../controllers/userProgrammeController.js";

const router = express.Router();

// Route pour s'inscrire à un programme
router.post("/inscrire", inscrireAuProgramme);

// Route pour récupérer le programme actuel de l'utilisateur
router.get("/actuel", getProgrammeActuel);

// Route pour terminer le programme actuel
router.put("/terminer", terminerProgramme);

// Route pour abandonner le programme actuel
router.put("/abandonner", abandonnerProgramme);

// Route pour mettre à jour la progression
router.put("/progression", mettreAJourProgression);

// Route pour récupérer l'historique des programmes
router.get("/historique", getHistoriquePrograms);

// Route pour marquer une séance comme terminée
router.post("/seance/terminer", terminerSeance);

// Route pour récupérer les séances terminées du programme actuel
router.get("/seances", getSeancesTerminees);

// Route pour annuler une séance terminée
router.delete("/seance/annuler", annulerSeance);

export default router;
