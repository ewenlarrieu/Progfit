import express from "express";
import { subscribeToProgramme } from "../controllers/userProgrammeController";

const router = express.Router();

router.post("/:programmeId", subscribeToProgramme);

export default router;
