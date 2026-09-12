import { Router } from "express";
import {dashboardController} from "../controller/dashboard.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {roleMiddleware} from "../middleware/role.middleware";

const router = Router();

router.get("/recruiter",authMiddleware,roleMiddleware("RECRUITER"),dashboardController.getRecruiterDashboard.bind(dashboardController));

export default router;