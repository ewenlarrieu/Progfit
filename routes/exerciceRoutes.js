import express from "express";
import {
  getAllExercices,
  getExerciceById,
  deleteAllExercices,
  addExercicesFromJSON,
} from "../controllers/exerciceController.js";

const router = express.Router();

// Route pour récupérer tous les exercices
router.get("/", getAllExercices);

// Route pour ajouter des exercices via JSON
router.post("/add-from-json", addExercicesFromJSON);

// Route pour supprimer tous les exercices (réinitialisation)
router.delete("/delete-all", deleteAllExercices);

// Route pour récupérer un exercice par ID
router.get("/:id", getExerciceById);

export default router;
