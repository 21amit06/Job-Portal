import { Response } from "express";
import {AuthRequest} from "../middleware/auth.middleware";
import {interviewRepository} from "../repository/interview.repository";
import {applicationRepository} from "../repository/application.repository";
import { notificationRepository} from "../repository/notification.repository";

export class InterviewController {

    // CREATE INTERVIEW
    async createInterview(req: AuthRequest, res: Response) {
        try {
            const {
                application_id,
                scheduled_date,
                scheduled_time,
                mode,
                meeting_link,
                location,
                interviewer_name,
                notes
            } = req.body;


            if (!application_id || !scheduled_date ||!scheduled_time ||!mode) {
                return res.status(400).json({
                    message:
                        "Application, date, time and mode are required"
                });

            }


            const application =await applicationRepository.getApplicationById( Number(application_id));
            if (!application) {
                return res.status(404).json({
                    message:
                        "Application not found"
                });

            }


            // Only the recruiter who owns the job
            // can schedule the interview

            if ( application.recruiter_id !== req.user.id ) {
                return res.status(403).json({
                    message:
                        "You are not allowed to schedule this interview"
                });

            }


            if (application.status ==="REJECTED" ) {
                return res.status(400).json({
                    message:
                        "Cannot schedule interview for rejected application"
                });

            }


            const interview = { application_id:Number(application_id),
                scheduled_date,
                scheduled_time,
                mode,
                meeting_link,
                location,
                interviewer_name,
                notes
            };


            const result =await interviewRepository.createInterview(interview);


                    await notificationRepository.createNotification({

        user_id:application.job_seeker_id,
        title: "Interview Scheduled",
        message:`Your interview for ${application.title} has been scheduled on ${scheduled_date} at ${scheduled_time}.`,
        type:"INTERVIEW",
        reference_id: result.interview_id
    });

            return res.status(201).json({
                message:"Interview scheduled successfully",
                interview: result

            });

        }
        catch (error) {

            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }




    // JOB SEEKER INTERVIEWS


 async getMyInterviews(req: AuthRequest, res: Response) {

    try {
        const jobSeekerId = req.user.id;

        const interviews =await interviewRepository.getInterviewsByJobSeeker(jobSeekerId);
        return res.status(200).json({
            interviews
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });

    }

}



    // RECRUITER INTERVIEWS


    async getRecruiterInterviews( req: AuthRequest, res: Response) {

        try {
            const recruiterId =req.user.id;
            const interviews = await interviewRepository.getInterviewsByRecruiter(recruiterId );
            return res.status(200).json({
                interviews

            });

        }
        catch (error) {
            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }




    // GET INTERVIEW BY ID


    async getInterviewById(req: AuthRequest,res: Response) {

        try {
            const interviewId = Number(req.params.id);


            const interview = await interviewRepository.getInterviewById(interviewId );


            if (!interview) {
                return res.status(404).json({
                    message:
                        "Interview not found"
                });

            }

            const isJobSeeker =interview.job_seeker_id === req.user.id;

            const isRecruiter =interview.recruiter_id ===req.user.id;
            if (!isJobSeeker &&!isRecruiter ) {
                return res.status(403).json({
                    message:"You are not allowed to view this interview"
                });

            }

            return res.status(200).json({
                interview
            });

        }
        catch (error) {
            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }




    // UPDATE INTERVIEW


    async updateInterview(req: AuthRequest, res: Response) {

        try {
            const interviewId = Number(req.params.id);

            const interview =await interviewRepository.getInterviewById(interviewId);
            if (!interview) {
                return res.status(404).json({
                    message:
                        "Interview not found"
                });

            }


            if ( interview.recruiter_id !==req.user.id ) {
                return res.status(403).json({
                    message:
                        "You are not allowed to update this interview"
                });

            }


            const {
                scheduled_date,
                scheduled_time,
                mode,
                meeting_link,
                location,
                interviewer_name,
                notes,
                status
            } = req.body;


            if (!scheduled_date ||!scheduled_time ||!mode || !status) {
                return res.status(400).json({
                    message:
                        "Date, time, mode and status are required"
                });

            }


            const allowedStatuses = [
                "SCHEDULED",
                "COMPLETED",
                "CANCELLED",
                "RESCHEDULED"
            ];


            if (!allowedStatuses.includes(status) ) {
                return res.status(400).json({
                    message:
                        "Invalid interview status"
                });

            }


            const result = await interviewRepository.updateInterview(interviewId,{
                            scheduled_date,
                            scheduled_time,
                            mode,
                            meeting_link,
                            location,
                            interviewer_name,
                            notes,
                            status
                        }
                    );


            return res.status(200).json({
                message:
                    "Interview updated successfully",
                interview: result
            });

        }
        catch (error) {
            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }




    // UPDATE STATUS


    async updateInterviewStatus(req: AuthRequest, res: Response) {
        try {
            const interviewId = Number(req.params.id);
            const {status} = req.body;
            if (!status) {
                return res.status(400).json({
                    message:
                        "Status is required"
                });

            }

            const allowedStatuses = [
                "SCHEDULED",
                "COMPLETED",
                "CANCELLED",
                "RESCHEDULED"
            ];


            if (!allowedStatuses.includes(status) ) {
                return res.status(400).json({
                    message:
                        "Invalid interview status"
                });

            }


            const interview =await interviewRepository.getInterviewById(interviewId);
            if (!interview) {
                return res.status(404).json({
                    message:
                        "Interview not found"
                });

            }


            if (interview.recruiter_id !==req.user.id) {
                return res.status(403).json({
                    message:"You are not allowed to update this interview"
                });

            }


            const result = await interviewRepository.updateInterviewStatus(interviewId,status );
         

 let title = "";

let message = "";

if (status === "COMPLETED") {
    title ="Interview Completed";
    message =`Your interview for ${interview.title} has been marked as completed.`;
}
else if (status === "CANCELLED") {
    title ="Interview Cancelled";
    message = `Your interview for ${interview.title} has been cancelled.`;
}
else if (status === "RESCHEDULED") {
    title ="Interview Rescheduled";
    message = `Your interview for ${interview.title} has been rescheduled.`;
}
else {
    title ="Interview Updated";
    message = `Your interview for ${interview.title} has been updated.`;

}


await notificationRepository.createNotification({
        user_id:interview.job_seeker_id,
        title: title,
        message:message,
        type: "INTERVIEW",
        reference_id:interviewId

    });

            return res.status(200).json({
                message:
                    "Interview status updated successfully",
                interview: result

            });

        }
        catch (error) {
            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }

}


export const interviewController =
    new InterviewController();