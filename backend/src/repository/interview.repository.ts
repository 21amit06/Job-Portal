import { db } from "../utility/database";
import {
    notificationRepository
} from "../repository/notification.repository";

export class InterviewRepository {
    // CREATE INTERVIEW

    async createInterview(interview: any) {
        return db.one( `
            INSERT INTO job_portal.interviews
            (
                application_id,
                scheduled_date,
                scheduled_time,
                mode,
                meeting_link,
                location,
                interviewer_name,
                notes
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8
            )
            RETURNING *
            `,
            [
                interview.application_id,
                interview.scheduled_date,
                interview.scheduled_time,
                interview.mode,
                interview.meeting_link,
                interview.location,
                interview.interviewer_name,
                interview.notes
            ]
        );

    }



    
    // GET INTERVIEW BY ID
    async getInterviewById(interviewId: number) {

        return db.oneOrNone(
            `
            SELECT
                i.*,
                a.job_id,
                a.job_seeker_id,
                j.title,
                j.recruiter_id,
                CONCAT(
                    u.first_name,
                    ' ',
                    COALESCE(u.last_name, '')
                ) AS job_seeker_name,
                u.email AS job_seeker_email
            FROM job_portal.interviews i

            INNER JOIN job_portal.applications a
                ON i.application_id = a.application_id

            INNER JOIN job_portal.jobs j
                ON a.job_id = j.job_id

            INNER JOIN job_portal.users u
                ON a.job_seeker_id = u.id

            WHERE i.interview_id = $1
            `,[ interviewId]
        );

    }

    
    // GET INTERVIEWS FOR JOB SEEKER
    
    async getInterviewsByJobSeeker(jobSeekerId: number) {

        return db.any(` SELECT
                i.interview_id,
                i.application_id,
                i.scheduled_date,
                i.scheduled_time,
                i.mode,
                i.meeting_link,
                i.location,
                i.interviewer_name,
                i.notes,
                i.status,
                i.created_at,
                i.updated_at,

                a.job_seeker_id,
                a.job_id,

                j.title,
                j.location AS job_location,
                j.job_type,

                c.company_name

            FROM job_portal.interviews i

            INNER JOIN job_portal.applications a
                ON i.application_id = a.application_id

            INNER JOIN job_portal.jobs j
                ON a.job_id = j.job_id

            LEFT JOIN job_portal.companies c
                ON j.company_id = c.company_id

            WHERE a.job_seeker_id = $1

            ORDER BY
                i.scheduled_date ASC,
                i.scheduled_time ASC
        `, [jobSeekerId]);

    }



    
    // GET INTERVIEWS FOR RECRUITER
    

    async getInterviewsByRecruiter(recruiterId: number) {

        return db.any( ` SELECT i.*,
                a.application_id,
                a.job_seeker_id,
                j.job_id,
                j.title,
                CONCAT(
                    u.first_name,
                    ' ',
                    COALESCE(u.last_name, '')
                ) AS job_seeker_name,

                u.email AS job_seeker_email,
                c.company_name

            FROM job_portal.interviews i

            INNER JOIN job_portal.applications a
                ON i.application_id = a.application_id

            INNER JOIN job_portal.jobs j
                ON a.job_id = j.job_id

            INNER JOIN job_portal.users u
                ON a.job_seeker_id = u.id

            LEFT JOIN job_portal.companies c
                ON j.company_id = c.company_id

            WHERE j.recruiter_id = $1
            ORDER BY
                i.scheduled_date ASC,
                i.scheduled_time ASC
            `,
            [recruiterId]
        );

    }



    
    // UPDATE INTERVIEW
    
    async updateInterview(interviewId: number, interview: any ) {

        return db.one(
            `
            UPDATE job_portal.interviews
            SET
                scheduled_date = $1,
                scheduled_time = $2,
                mode = $3,
                meeting_link = $4,
                location = $5,
                interviewer_name = $6,
                notes = $7,
                status = $8,
                updated_at = CURRENT_TIMESTAMP
            WHERE interview_id = $9

            RETURNING *
            `,
            [
                interview.scheduled_date,
                interview.scheduled_time,
                interview.mode,
                interview.meeting_link,
                interview.location,
                interview.interviewer_name,
                interview.notes,
                interview.status,
                interviewId
            ]
        );

    }



    
    // UPDATE INTERVIEW STATUS
    
    async updateInterviewStatus(interviewId: number, status: string ) {
        return db.one(
            `
            UPDATE job_portal.interviews
            SET
                status = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE interview_id = $2
            RETURNING *
            `,
            [ status,interviewId]
        );

    }

}


export const interviewRepository =new InterviewRepository();