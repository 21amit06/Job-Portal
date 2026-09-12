import { Router } from "express";
import {applicationController} from "../controller/application.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {roleMiddleware} from "../middleware/role.middleware";


const router = Router();

// JOB SEEKER APPLY
router.post("/",authMiddleware,roleMiddleware("JOB_SEEKER"),applicationController.applyForJob.bind(applicationController));



// JOB SEEKER APPLICATIONS

router.get( "/my-applications",authMiddleware,roleMiddleware("JOB_SEEKER"),applicationController.getMyApplications.bind(applicationController));








//GET APPLICIANT APPLICATION
router.get("/recruiter",authMiddleware,roleMiddleware("RECRUITER"),applicationController.getRecruiterApplications.bind(applicationController));




// RECRUITER GET APPLICANTS


// router.get(
//     "/job/:jobId",
//     authMiddleware,
//     roleMiddleware("RECRUITER"),
//     applicationController.getApplicantsForJob.bind(
//         applicationController
//     )
// );



// GET APPLICATION


// router.get(
//     "/:id",
//     authMiddleware,
//     applicationController.getApplicationById.bind(
//         applicationController
//     )
// );



// RECRUITER UPDATE STATUS
router.put("/:id/status",authMiddleware,roleMiddleware("RECRUITER"),applicationController.updateApplicationStatus.bind(applicationController));



export default router;