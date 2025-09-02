import express from "express";
import {
  getAllExercices,
  getExerciceById,
  addBasicExercices,
} from "../controllers/exerciceController.js";

const router = express.Router();

// Route pour récupérer tous les exercices
router.get("/", getAllExercices);

// Route pour ajouter les exercices de base (setup initial)
router.post("/add-basic", addBasicExercices);

// Route pour récupérer un exercice par ID
router.get("/:id", getExerciceById);

export default router;
