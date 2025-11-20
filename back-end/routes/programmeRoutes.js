import express from "express";
import {
  createProgramme,
  getAllProgrammes,
  deleteProgramme,
  getProgrammeById,
} from "../controllers/programmeController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", isAdmin, createProgramme);
router.get("/", getAllProgrammes);
router.delete("/:id", isAdmin, deleteProgramme);
router.get("/:id", getProgrammeById);

export default router;
