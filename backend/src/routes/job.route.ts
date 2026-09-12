import { Router } from "express";
import {jobController} from "../controller/job.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {roleMiddleware} from "../middleware/role.middleware";

const router = Router();


// Recruiter creates job
router.post("/",authMiddleware,roleMiddleware("RECRUITER"),jobController.createJob.bind(jobController));


// Job seeker / recruiter can see active jobs
router.get("/",authMiddleware,jobController.getAllJobs.bind(jobController));


// Recruiter gets their own jobs
router.get("/my-jobs",authMiddleware,roleMiddleware("RECRUITER"),jobController.getMyJobs.bind(jobController));


// Get particular job
router.get("/:id",authMiddleware,jobController.getJobById.bind(jobController));


// Recruiter updates job
router.put("/:id",authMiddleware,roleMiddleware("RECRUITER"),jobController.updateJob.bind(jobController));


// Recruiter deletes job
router.delete("/:id",authMiddleware,roleMiddleware("RECRUITER"),jobController.deleteJob.bind(jobController));


export default router;