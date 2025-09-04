import express from "express";
import {
  getAllProgrammes,
  getProgrammesByLevel,
  getProgrammesByProfile,
  getProgrammeDetails,
  addFullBodyProgram,
  addMassGainProgram,
  deleteAllProgrammes,
  addMaintenanceProgram,
  addStrengthProgram,
  addWeightLossIntermediateProgram,
  addMassGainIntermediateProgram,
  addStrengthIntermediateProgram,
  addStrengthAdvancedProgram,
  addMaintenanceIntermediateProgram,
  addMassGainAdvancedProgram,
  addMaintenanceAdvancedProgram,
  addAllPrograms,
} from "../controllers/programmeController.js";

const router = express.Router();

// Route pour récupérer tous les programmes
router.get("/", getAllProgrammes);

// Route pour ajouter le programme Full Body (setup initial)
router.post("/add-fullbody", addFullBodyProgram);

// Route pour ajouter le programme Prise de masse
router.post("/add-massgain", addMassGainProgram);

// Route pour ajouter le programme Entretien
router.post("/add-maintenance", addMaintenanceProgram);

// Route pour ajouter le programme Force
router.post("/add-strength", addStrengthProgram);

// Route pour ajouter le programme Perte de poids Intermédiaire
router.post("/add-weightloss-intermediate", addWeightLossIntermediateProgram);

// Route pour ajouter le programme Prise de masse Intermédiaire
router.post("/add-massgain-intermediate", addMassGainIntermediateProgram);

// Route pour ajouter le programme Force Intermédiaire
router.post("/add-strength-intermediate", addStrengthIntermediateProgram);

// Route pour ajouter le programme Force Avancé
router.post("/add-strength-advanced", addStrengthAdvancedProgram);

// Route pour ajouter le programme Entretien Intermédiaire
router.post("/add-maintenance-intermediate", addMaintenanceIntermediateProgram);

// Route pour ajouter le programme Prise de masse Avancé
router.post("/add-massgain-advanced", addMassGainAdvancedProgram);

// Route pour ajouter le programme Entretien Avancé
router.post("/add-maintenance-advanced", addMaintenanceAdvancedProgram);

// Route pour ajouter tous les programmes d'un coup
router.post("/add-all", addAllPrograms);

// Route pour supprimer tous les programmes (réinitialisation)
router.delete("/delete-all", deleteAllProgrammes);

// Route pour récupérer programmes par niveau
router.get("/niveau/:niveau", getProgrammesByLevel);

// Route pour récupérer un programme avec détails complets
router.get("/:id", getProgrammeDetails);

// Route pour récupérer programmes par profil utilisateur
router.get("/profile/:niveau/:objectif", getProgrammesByProfile);

export default router;
