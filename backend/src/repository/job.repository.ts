import { db } from "../utility/database";

export class JobRepository {

    async createJob(job: any) {
        return db.one(  ` INSERT INTO job_portal.jobs
            (
                company_id,
                recruiter_id,
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
                $8,
                $9,
                $10,
                $11,
                $12
            )
            RETURNING *
            `,
            [
                job.company_id,
                job.recruiter_id,
                job.title,
                job.description,
                job.requirements,
                job.location,
                job.job_type,
                job.salary_min,
                job.salary_max,
                job.experience_required,
                job.skills,
                job.vacancies
            ]
        );

    }


  async getAllJobs() {

    return db.any(`SELECT j.*,
            c.company_name
        FROM job_portal.jobs j
        LEFT JOIN job_portal.companies c
            ON j.company_id = c.company_id
        WHERE j.status = 'ACTIVE'
        ORDER BY j.created_at DESC
    `);

}

   async getJobById(jobId: number) {

    return db.oneOrNone(` SELECT j.*,
            c.company_name,
            c.location AS company_location
        FROM job_portal.jobs j
        LEFT JOIN job_portal.companies c
            ON j.company_id = c.company_id
        WHERE j.job_id = $1
    `, [jobId]);

}

   async getJobsByRecruiter(recruiterId: number) {

    return db.any(`SELECT j.*,
            c.company_name
        FROM job_portal.jobs j

        LEFT JOIN job_portal.companies c
            ON j.company_id = c.company_id

        WHERE j.recruiter_id = $1
        ORDER BY j.created_at DESC
    `, [recruiterId]);

}

    async updateJob(jobId: number,job: any) {
        return db.one( `UPDATE job_portal.jobs
            SET
                title = $1,
                description = $2,
                requirements = $3,
                location = $4,
                job_type = $5,
                salary_min = $6,
                salary_max = $7,
                experience_required = $8,
                skills = $9,
                vacancies = $10,
                status = $11,
                updated_at = CURRENT_TIMESTAMP

            WHERE job_id = $12

            RETURNING *
            `,
            [
                job.title,
                job.description,
                job.requirements,
                job.location,
                job.job_type,
                job.salary_min,
                job.salary_max,
                job.experience_required,
                job.skills,
                job.vacancies,
                job.status,
                jobId
            ]
        );

    }


    async deleteJob(jobId: number) {

        return db.result(` DELETE FROM job_portal.jobs
                          WHERE job_id = $1 `,
                        [jobId]);

    }

}

export const jobRepository =new JobRepository();