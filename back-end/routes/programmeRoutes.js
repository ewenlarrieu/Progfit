import express from "express";
import {
  createProgramme,
  getAllProgrammes,
} from "../controllers/programmeController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", isAdmin, createProgramme);
router.get("/", getAllProgrammes);

export default router;
