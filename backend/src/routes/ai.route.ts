import express from "express";
import { uploadResume } from "../controller/ai.controller";

const router = express.Router();

router.post("/recommend-jobs", uploadResume);

export default router;