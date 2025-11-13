import express from "express";
import {
  register,
  login,
  updateProfile,
  getProfile,
  deleteAccount,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", updateProfile);
router.get("/profile", getProfile);
router.delete("/delete-account", deleteAccount);

export default router;
