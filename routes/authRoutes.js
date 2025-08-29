import express from "express";
import {
  register,
  verifyEmail,
  updateProfile,
} from "../controllers/authController.js";

const router = express.Router();

// Route d'inscription
router.post("/register", register);

// Route de vérification d'email
router.get("/verify-email/:token", verifyEmail);

// Route de mise à jour du profil (niveau et objectifs)
router.put("/update-profile", updateProfile);

export default router;
