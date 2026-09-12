import { Response } from "express";
import {AuthRequest} from "../middleware/auth.middleware";
import {jobRepository} from "../repository/job.repository";
import {companyRepository} from "../repository/company.repository";


export class JobController {

// CREATE JOB
async createJob( req: AuthRequest,res: Response) {
    try {

        const {
            title,
            description,
            requirements,
            location,
            job_type,
            salary_min,
            salary_max,
            experience_required,
            skills,
            vacancies
        } = req.body;


        // Required fields

        if (!title ||!description ||!job_type) {
            return res.status(400).json({
                message: "Title, description and job type are required"
            });

        }


        // Logged-in recruiter

        const recruiterId =req.user.id;
        // Check whether recruiter has a company
        const company =await companyRepository.getCompanyByRecruiter(recruiterId);

        // Create job
        const job = {
            company_id:company ? company.company_id : null,
            recruiter_id:recruiterId,
            title,
            description,
            requirements,
            location,
            job_type,
            salary_min,
            salary_max,
            experience_required,
            skills,
            vacancies:
                vacancies || 1

        };


        const result =await jobRepository.createJob(job);
        return res.status(201).json({
            message:"Job created successfully",
            job: result

        });

    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });

    }

}


   
    // GET ALL JOBS
    async getAllJobs(req: AuthRequest, res: Response) {
        try {
            const jobs =await jobRepository.getAllJobs();
            return res.status(200).json({
                jobs
            });

        }
        catch (error) {
            return res.status(500).json({
                message: "Internal server error"
            });

        }

    }



   
    // GET JOB BY ID
    async getJobById(req: AuthRequest,res: Response) {
        try {
            const jobId =Number(req.params.id);
            const job = await jobRepository.getJobById(
                    jobId
                );


            if (!job) {
                return res.status(404).json({
                    message: "Job not found"
                });

            }

            return res.status(200).json({
                job
            });

        }
        catch (error) {

            return res.status(500).json({
                message: "Internal server error"
            });

        }

    }



   
    // GET RECRUITER JOBS
    async getMyJobs( req: AuthRequest, res: Response) {
        try {
            const recruiterId =req.user.id;
            const jobs =await jobRepository.getJobsByRecruiter(recruiterId);
          return res.status(200).json({
                jobs
            });

        }
        catch (error) {
            return res.status(500).json({
                message: "Internal server error"
            });

        }

    }



   
    // UPDATE JOB
    async updateJob( req: AuthRequest, res: Response) {
         try {
            const jobId = Number(req.params.id);
            const job =await jobRepository.getJobById(jobId);
            if (!job) {
                return res.status(404).json({
                    message: "Job not found"
                });

            }

            // Check ownership

            if (job.recruiter_id !== req.user.id) {
                return res.status(403).json({
                    message: "You are not allowed to update this job"
                });

            }


            const result =await jobRepository.updateJob(jobId,req.body);
            return res.status(200).json({
                message:"Job updated successfully",
                job: result

            });

        }
        catch (error) {
            return res.status(500).json({
                message: "Internal server error"
            });

        }

    }



   
    // DELETE JOB
    async deleteJob( req: AuthRequest, res: Response) {
        try {
            const jobId =Number(req.params.id);
            const job =await jobRepository.getJobById(jobId);
            if (!job) {
                return res.status(404).json({
                    message: "Job not found"
                });

            }

            // Check ownership

            if (job.recruiter_id !==req.user.id) {
                return res.status(403).json({
                    message:"You are not allowed to delete this job"
                });

            }


            await jobRepository.deleteJob(jobId);

            return res.status(200).json({
               message:"Job deleted successfully"

            });

        }
        catch (error) {
            return res.status(500).json({
                message: "Internal server error"
            });

        }

    }

}


export const jobController =new JobController();