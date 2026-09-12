import { Router } from "express";
import {interviewController} from "../controller/interview.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {roleMiddleware} from "../middleware/role.middleware";

const router = Router();



// RECRUITER SCHEDULES
// INTERVIEW

router.post("/",authMiddleware,roleMiddleware("RECRUITER"),interviewController.createInterview.bind(interviewController));



// JOB SEEKER INTERVIEWS


router.get("/my-interviews",authMiddleware,roleMiddleware("JOB_SEEKER"),interviewController.getMyInterviews.bind(interviewController));



// RECRUITER INTERVIEWS


router.get("/recruiter",authMiddleware,roleMiddleware("RECRUITER"),interviewController.getRecruiterInterviews.bind(interviewController));



// GET INTERVIEW


// router.get(
//     "/:id",
//     authMiddleware,
//     interviewController.getInterviewById.bind(
//         interviewController
//     )
// );



// UPDATE INTERVIEW


// router.put(
//     "/:id",
//     authMiddleware,
//     roleMiddleware("RECRUITER"),
//     interviewController.updateInterview.bind(
//         interviewController
//     )
// );



// UPDATE STATUS


// router.patch(
//     "/:id/status",
//     authMiddleware,
//     roleMiddleware("RECRUITER"),
//     interviewController.updateInterviewStatus.bind(
//         interviewController
//     )
// );


export default router;