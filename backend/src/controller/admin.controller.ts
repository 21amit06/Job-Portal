import { Response } from "express";
import {AuthRequest} from "../middleware/auth.middleware";
import {adminRepository} from "../repository/admin.repository";


export class AdminController {
 // GET ALL USERS

    async getAllUsers(req: AuthRequest,res: Response) {
     try {

            const users =await adminRepository.getAllUsers();
                    return res.status(200).json({users});

        }
        catch (error) {
            return res.status(500).json({
                message:"Internal server error"
            });

        }

    }



    // GET USER BY ID

    async getUserById(req: AuthRequest,res: Response) {

        try {

            const userId =Number(req.params.id);
            const user =await adminRepository.getUserById(userId);


            if (!user) {
            return res.status(404).json({
                    message:"User not found"
                });

            }
            return res.status(200).json({user});

        }
        catch (error) {
            return res.status(500).json({
                message:"Internal server error"
            });

        }

    }



    // DELETE USER

    async deleteUser(req: AuthRequest,res: Response) {

        try {
            const userId = Number(req.params.id);

            if (userId === req.user.id ) {
                return res.status(400).json({
                    message: "Admin cannot delete their own account"
                });

            }


            const user =await adminRepository.getUserById( userId);

            if (!user) {
                   return res.status(404).json({
                    message: "User not found"
                });

            }


            await adminRepository.deleteUser( userId);
            return res.status(200).json({

                message: "User deleted successfully"

            });

        }
        catch (error) {
            return res.status(500).json({
                message:"Internal server error"
            });

        }

    }



    // GET ALL COMPANIES

    async getAllCompanies(req: AuthRequest,res: Response) {

        try {
            const companies =await adminRepository.getAllCompanies();
            return res.status(200).json({ companies});

        }
        catch (error) {
            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }



    // UPDATE COMPANY STATUS

    async updateCompanyStatus( req: AuthRequest, res: Response ) {

        try {

            const companyId =Number(req.params.id);

            const {status} = req.body;

            const allowedStatuses = [
                "PENDING",
                "ACTIVE",
                "SUSPENDED"

            ];


            if (!allowedStatuses.includes(status)) {

                return res.status(400).json({
                    message:
                        "Invalid company status"
                });

            }


            const company =
                await adminRepository
                    .getCompanyById(
                        companyId
                    );


            if (!company) {
                return res.status(404).json({
                    message:"Company not found"
                });

            }


            const result =await adminRepository.updateCompanyStatus( companyId, status);

            return res.status(200).json({
                message:"Company status updated successfully",
                company: result

            });

        }
        catch (error) {
            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }



    // GET ALL JOBS

    async getAllJobs(req: AuthRequest,res: Response) {
        try {

            const jobs =await adminRepository.getAllJobs();
            return res.status(200).json({jobs });

        }
        catch (error) {
            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }



    // UPDATE JOB STATUS

    async updateJobStatus(req: AuthRequest,res: Response) {
     try {

            const jobId =Number(req.params.id);
            const {status} = req.body;
            const allowedStatuses = [
                "ACTIVE",
                "CLOSED",
                "PENDING"
            ];


            if (!allowedStatuses.includes(status)) {

                return res.status(400).json({
                    message:
                        "Invalid job status"
                });

            }


            const result = await adminRepository.updateJobStatus(jobId,status );


            return res.status(200).json({
                message:
                    "Job status updated successfully",

                job: result

            });

        }
        catch (error) {
            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }



// ADMIN DASHBOAR

async getDashboard(req: AuthRequest,res: Response) {

    try {

        const stats =await adminRepository.getDashboardStats();
        const recentUsers =await adminRepository.getRecentUsers();
        const recentJobs =await adminRepository.getRecentJobs();
        const activity = await adminRepository.getWeeklyActivity();

        return res.status(200).json({
            stats,
            recentUsers,
            recentJobs,
            activity

        });

    }
    catch (error) {
        return res.status(500).json({
            message:
                "Internal server error"

        });

    }

}

// async deleteCompany(
//   req: AuthRequest,
//   res: Response
// ) {

//   try {

//     const companyId =
//       Number(req.params.id);


//     if (!companyId) {

//       return res.status(400).json({
//         message: "Invalid company ID"
//       });

//     }


//     const company =
//       await adminRepository.getCompanyById(
//         companyId
//       );


//     if (!company) {

//       return res.status(404).json({
//         message: "Company not found"
//       });

//     }


//     await adminRepository.deleteCompany(
//       companyId
//     );


//     return res.status(200).json({
//       message: "Company deleted successfully"
//     });

//   } catch (error) {

//     console.log(error);

//     return res.status(500).json({
//       message: "Internal server error"
//     });

//   }

// }

}


export const adminController =
    new AdminController();