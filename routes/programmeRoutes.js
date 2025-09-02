import express from "express";
import {
  getAllProgrammes,
  getProgrammesByLevel,
  getProgrammesByProfile,
  getProgrammeDetails,
  addFullBodyProgram,
} from "../controllers/programmeController.js";

const router = express.Router();

// Route pour récupérer tous les programmes
router.get("/", getAllProgrammes);

// Route pour ajouter le programme Full Body (setup initial)
router.post("/add-fullbody", addFullBodyProgram);

// Route pour récupérer programmes par niveau
router.get("/niveau/:niveau", getProgrammesByLevel);

// Route pour récupérer un programme avec détails complets
router.get("/:id", getProgrammeDetails);

// Route pour récupérer programmes par profil utilisateur
router.get("/profile/:niveau/:objectif", getProgrammesByProfile);

export default router;
