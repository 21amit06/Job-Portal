import { db } from "../utility/database";


export class ApplicationRepository {

    // CREATE APPLICATION
    async createApplication(application: any) {

        return db.one( `
            INSERT INTO job_portal.applications
            (
                job_id,
                job_seeker_id,
                resume_url,
                cover_letter
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )
            RETURNING *
            `,
            [
                application.job_id,
                application.job_seeker_id,
                application.resume_url,
                application.cover_letter
            ]
        );

    }



    
    // CHECK EXISTING APPLICATION
    async getApplicationByJobAndSeeker(jobId: number, jobSeekerId: number ) {

        return db.oneOrNone(` SELECT *
            FROM job_portal.applications
            WHERE job_id = $1
            AND job_seeker_id = $2
            `,[jobId,jobSeekerId]
        );

    }



    
    // GET MY APPLICATIONS
    async getApplicationsByJobSeeker(jobSeekerId: number) {

        return db.any( ` SELECT
                a.application_id,
                a.job_id,
                a.job_seeker_id,
                a.resume_url,
                a.cover_letter,
                a.status,
                a.applied_at,
                a.updated_at,

                j.title AS job_title,
                j.location AS job_location,
                j.job_type,
                j.salary_min,
                j.salary_max,

                c.company_name

            FROM job_portal.applications a

            INNER JOIN job_portal.jobs j
                ON a.job_id = j.job_id

            LEFT JOIN job_portal.companies c
                ON j.company_id = c.company_id

            WHERE a.job_seeker_id = $1

            ORDER BY a.applied_at DESC
            `,[ jobSeekerId]
        );

    }



    
    // GET APPLICATION BY ID
    async getApplicationById(applicationId: number) {

        return db.oneOrNone(
            `
            SELECT
                a.*,

                j.title,

                j.company_id,

                j.recruiter_id

            FROM job_portal.applications a

            INNER JOIN job_portal.jobs j
                ON a.job_id = j.job_id

            WHERE a.application_id = $1
            `,
            [applicationId]
        );

    }



    
    // GET APPLICANTS FOR JOB
    

    async getApplicationsByJob( jobId: number) {

        return db.any(
            `
            SELECT
                a.application_id,
                a.job_id,
                a.job_seeker_id,
                a.resume_url,
                a.cover_letter,
                a.status,
                a.applied_at,
                a.updated_at,
                CONCAT(
                    u.first_name,
                    ' ',
                    COALESCE(u.last_name, '')
                ) AS name,
                u.email

            FROM job_portal.applications a

            INNER JOIN job_portal.users u
                ON a.job_seeker_id = u.id

            WHERE a.job_id = $1

            ORDER BY a.applied_at DESC
            `,
            [jobId]
        );

    }



    
    // UPDATE APPLICATION STATUS
    

    async updateApplicationStatus(applicationId: number, status: string) {

        return db.one(
            `
            UPDATE job_portal.applications

            SET
                status = $1,
                updated_at = CURRENT_TIMESTAMP

            WHERE application_id = $2

            RETURNING *
            `,[status,applicationId]
        );

    }



    
    // GET APPLICATIONS BY RECRUITER
    

    async getApplicationsByRecruiter(recruiterId: number ) {

        return db.any(`
            SELECT
                a.application_id,
                a.job_id,
                a.job_seeker_id,
                a.resume_url,
                a.cover_letter,
                a.status,
                a.applied_at,
                a.updated_at,

                CONCAT(
                    u.first_name,
                    ' ',
                    COALESCE(u.last_name, '')
                ) AS applicant_name,

                u.email AS applicant_email,

                j.title AS job_title,
                j.location AS job_location,
                j.job_type

            FROM job_portal.applications a

            INNER JOIN job_portal.users u
                ON a.job_seeker_id = u.id

            INNER JOIN job_portal.jobs j
                ON a.job_id = j.job_id

            WHERE j.recruiter_id = $1

            ORDER BY a.applied_at DESC
        `, [recruiterId]);

    }

}


export const applicationRepository =new ApplicationRepository();