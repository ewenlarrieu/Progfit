import express from "express";
import {
  createProgramme,
  getAllProgrammes,
  deleteProgramme,
} from "../controllers/programmeController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", isAdmin, createProgramme);
router.get("/", getAllProgrammes);
router.delete("/:id", isAdmin, deleteProgramme);

export default router;
