import express from "express";
import {
  register,
  login,
  updateProfile,
  getProfile,
  deleteAccount,
} from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", auth, updateProfile);
router.get("/profile", auth, getProfile);
router.delete("/delete-account", auth, deleteAccount);

export default router;
