import express from "express";
import {
  register,
  login,
  verifyEmail,
  updateProfile,
  forgotPassword,
  resetPassword,
  getProfile,
} from "../controllers/authController.js";

const router = express.Router();

// Route d'inscription
router.post("/register", register);

// Route de connexion
router.post("/login", login);

// Route de vérification d'email
router.get("/verify-email/:token", verifyEmail);

// Route pour demander la réinitialisation du mot de passe
router.post("/forgot-password", forgotPassword);

// Route pour réinitialiser le mot de passe avec le token
router.post("/reset-password/:token", resetPassword);

// Route de mise à jour du profil (niveau et objectifs)
router.put("/update-profile", updateProfile);

// Route pour récupérer le profil de l'utilisateur
router.get("/profile", getProfile);

export default router;
