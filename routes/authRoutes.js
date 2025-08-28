import express from "express";
import { register, verifyEmail } from "../controllers/authController.js";

const router = express.Router();

// Route d'inscription
router.post("/register", register);

// Route de vérification d'email
router.get("/verify-email/:token", verifyEmail);

export default router;
