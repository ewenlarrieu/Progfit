import express from "express";
import {
  createProgramme,
  getAllProgrammes,
  deleteProgramme,
  getProgrammeById,
} from "../controllers/programmeController.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", auth, isAdmin, createProgramme);
router.get("/", getAllProgrammes);
router.delete("/:id", auth, isAdmin, deleteProgramme);
router.get("/:id", getProgrammeById);

export default router;
