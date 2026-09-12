import { Response } from "express";

import { AuthRequest} from "../middleware/auth.middleware";

import { dashboardRepository} from "../repository/dashboard.repository";


export class DashboardController {
  
    // RECRUITER DASHBOARD

    async getRecruiterDashboard( req: AuthRequest, res: Response) {
        try {
            const recruiterId = req.user.id;
            const dashboard = await dashboardRepository.getRecruiterDashboard( recruiterId);
            return res.status(200).json(dashboard);
        }
        catch (error) {
            return res.status(500).json({
                message:"Internal server error"
            });

        }

    }

}


export const dashboardController =
    new DashboardController();