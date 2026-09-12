import { Router } from "express";
import {adminController} from "../controller/admin.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {roleMiddleware} from "../middleware/role.middleware";


const router = Router();

// DASHBOARD
router.get("/dashboard", authMiddleware,roleMiddleware("ADMIN"),adminController.getDashboard.bind( adminController));

// USERS
router.get("/users",authMiddleware,roleMiddleware("ADMIN"),adminController.getAllUsers.bind(adminController));


// router.get(
//     "/users/:id",
//     authMiddleware,
//     roleMiddleware("ADMIN"),
//     adminController.getUserById.bind(
//         adminController
//     )
// );

//DELETE JOB BY ID
router.delete("/users/:id",authMiddleware,roleMiddleware("ADMIN"),adminController.deleteUser.bind(adminController));

// COMPANIES
router.get("/companies",authMiddleware,roleMiddleware("ADMIN"),adminController.getAllCompanies.bind(adminController));

//UPDATE COMPANY STATUS
router.patch("/companies/:id/status",authMiddleware,roleMiddleware("ADMIN"),adminController.updateCompanyStatus.bind(adminController));

// GET ALL JOBS
router.get("/jobs",authMiddleware,roleMiddleware("ADMIN"),adminController.getAllJobs.bind(adminController));

//UPDATE JOB STATUS
router.patch("/jobs/:id/status",authMiddleware,roleMiddleware("ADMIN"),adminController.updateJobStatus.bind(adminController));


export default router;