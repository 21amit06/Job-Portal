import { Response } from "express";

import {
    AuthRequest
} from "../middleware/auth.middleware";

import {
    applicationRepository
} from "../repository/application.repository";

import {
    jobRepository
} from "../repository/job.repository";
import {
    notificationRepository
} from "../repository/notification.repository";

export class ApplicationController {


    // =========================
    // APPLY FOR JOB
    // =========================

    async applyForJob(
        req: AuthRequest,
        res: Response
    ) {

        try {

            const {
                job_id,
                resume_url,
                cover_letter
            } = req.body;


            if (!job_id) {

                return res.status(400).json({
                    message: "Job id is required"
                });

            }


            const job =
                await jobRepository.getJobById(
                    Number(job_id)
                );


            if (!job) {

                return res.status(404).json({
                    message: "Job not found"
                });

            }


            if (job.status !== "ACTIVE") {

                return res.status(400).json({
                    message:
                        "You cannot apply for an inactive job"
                });

            }


            const jobSeekerId =
                req.user.id;


            const existingApplication =
                await applicationRepository
                    .getApplicationByJobAndSeeker(
                        Number(job_id),
                        jobSeekerId
                    );


            if (existingApplication) {

                return res.status(400).json({
                    message:
                        "You have already applied for this job"
                });

            }


            const application = {

                job_id: Number(job_id),

                job_seeker_id: jobSeekerId,

                resume_url,

                cover_letter

            };


            const result =
                await applicationRepository
                    .createApplication(
                        application
                    );


            return res.status(201).json({

                message:
                    "Application submitted successfully",

                application: result

            });

        }
        catch (error) {

            console.log(error);

            return res.status(500).json({
                message: "Internal server error"
            });

        }

    }



    // =========================
    // GET MY APPLICATIONS
    // =========================
async getMyApplications(
    req: AuthRequest,
    res: Response
) {
    try {

        const jobSeekerId = req.user.id;

        console.log("================================");
        console.log("Logged in user:", req.user);
        console.log("Job Seeker ID:", jobSeekerId);

        const applications =
            await applicationRepository
                .getApplicationsByJobSeeker(jobSeekerId);

        console.log("Applications from DB:", applications);
        console.log("Number of applications:", applications.length);
        console.log("================================");

        return res.status(200).json({
            applications
        });

    } catch (error) {

        console.log("GET MY APPLICATIONS ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


    // =========================
    // GET APPLICATION BY ID
    // =========================

    async getApplicationById(
        req: AuthRequest,
        res: Response
    ) {

        try {

            const applicationId =
                Number(req.params.id);


            const application =
                await applicationRepository
                    .getApplicationById(
                        applicationId
                    );


            if (!application) {

                return res.status(404).json({
                    message: "Application not found"
                });

            }


            if (
                application.job_seeker_id !==
                req.user.id
            ) {

                return res.status(403).json({
                    message:
                        "You are not allowed to view this application"
                });

            }


            return res.status(200).json({

                application

            });

        }
        catch (error) {

            console.log(error);

            return res.status(500).json({
                message: "Internal server error"
            });

        }

    }



    // =========================
    // GET APPLICANTS FOR JOB
    // =========================

    async getApplicantsForJob(
        req: AuthRequest,
        res: Response
    ) {

        try {

            const jobId =
                Number(req.params.jobId);


            const job =
                await jobRepository.getJobById(
                    jobId
                );


            if (!job) {

                return res.status(404).json({
                    message: "Job not found"
                });

            }


            if (
                job.recruiter_id !==
                req.user.id
            ) {

                return res.status(403).json({
                    message:
                        "You are not allowed to view applicants for this job"
                });

            }


            const applications =
                await applicationRepository
                    .getApplicationsByJob(
                        jobId
                    );


            return res.status(200).json({

                applications

            });

        }
        catch (error) {

            console.log(error);

            return res.status(500).json({
                message: "Internal server error"
            });

        }

    }



    // =========================
    // UPDATE APPLICATION STATUS
    // =========================

  // =========================
// UPDATE APPLICATION STATUS
// =========================

async updateApplicationStatus(
    req: AuthRequest,
    res: Response
) {

    try {

        const applicationId =
            Number(req.params.id);


        const {
            status
        } = req.body;


        if (!status) {

            return res.status(400).json({
                message: "Status is required"
            });

        }


        const allowedStatuses = [

            "APPLIED",

            "SHORTLISTED",

            "INTERVIEW",

            "SELECTED",

            "REJECTED"

        ];


        if (
            !allowedStatuses.includes(status)
        ) {

            return res.status(400).json({
                message:
                    "Invalid application status"
            });

        }


        const application =
            await applicationRepository
                .getApplicationById(
                    applicationId
                );


        if (!application) {

            return res.status(404).json({
                message:
                    "Application not found"
            });

        }


        // Check recruiter ownership

        if (
            application.recruiter_id !==
            req.user.id
        ) {

            return res.status(403).json({
                message:
                    "You are not allowed to update this application"
            });

        }


        // Update application

        const result =
            await applicationRepository
                .updateApplicationStatus(
                    applicationId,
                    status
                );


        // =========================
        // CREATE NOTIFICATION
        // =========================

        let title = "";

        let message = "";


        if (status === "SHORTLISTED") {

            title =
                "Application Shortlisted";

            message =
                `Your application for ${application.title} has been shortlisted.`;

        }


        else if (status === "INTERVIEW") {

            title =
                "Interview Stage";

            message =
                `Your application for ${application.title} has moved to the interview stage.`;

        }


        else if (status === "SELECTED") {

            title =
                "Congratulations!";

            message =
                `You have been selected for ${application.title}.`;

        }


        else if (status === "REJECTED") {

            title =
                "Application Update";

            message =
                `Your application for ${application.title} has been rejected.`;

        }


        else {

            title =
                "Application Updated";

            message =
                `Your application for ${application.title} has been updated.`;

        }


        await notificationRepository
            .createNotification({

                user_id:
                    application.job_seeker_id,

                title:

                    title,

                message:

                    message,

                type:

                    "APPLICATION",

                reference_id:

                    applicationId

            });


        return res.status(200).json({

            message:
                "Application status updated successfully",

            application:
                result

        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            message:
                "Internal server error"
        });

    }

}













async getRecruiterApplications(req: AuthRequest, res: Response) {

    try {

        const recruiterId = req.user.id;

        const applications =
            await applicationRepository.getApplicationsByRecruiter(
                recruiterId
            );

        return res.status(200).json({
            applications
        });

    } catch (error) {

        console.error(
            "Failed to get recruiter applications:",
            error
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

}


export const applicationController =
    new ApplicationController();