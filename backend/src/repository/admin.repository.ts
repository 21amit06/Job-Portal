import { db } from "../utility/database";


export class AdminRepository {

    // GET ALL USERS
    async getAllUsers() {

        return db.any( `SELECT
                id,
                first_name,
                last_name,
                email,
                phone,
                user_type,
                created_at

            FROM job_portal.users

            ORDER BY created_at DESC`);

    }



  
    // GET USER BY ID
  

    async getUserById( userId: number) {

        return db.oneOrNone(`SELECT
                id,
                first_name,
                last_name,
                email,
                phone,
                user_type,
                created_at

            FROM job_portal.users

            WHERE id = $1
            `, [userId]
        );

    }



  
    // DELETE USER
    async deleteUser(userId: number) {

        return db.result(`
            DELETE FROM job_portal.users
            WHERE id = $1
            `,[ userId ]
        );

    }



  
    // GET ALL COMPANIES
    async getAllCompanies() {

        return db.any( ` SELECT  c.*,
                CONCAT(u.first_name,' ',COALESCE(u.last_name, '')) AS recruiter_name,
                u.email AS recruiter_email
            FROM job_portal.companies c

            INNER JOIN job_portal.users u
                ON c.recruiter_id = u.id

            ORDER BY c.created_at DESC
            `);

    }



  
    // GET COMPANY BY ID
  
    async getCompanyById(
        companyId: number
    ) {

        return db.oneOrNone(
            `
            SELECT

                c.*,

                CONCAT(
                    u.first_name,
                    ' ',
                    COALESCE(u.last_name, '')
                ) AS recruiter_name,

                u.email AS recruiter_email

            FROM job_portal.companies c

            INNER JOIN job_portal.users u
                ON c.recruiter_id = u.id

            WHERE c.company_id = $1
            `,
            [
                companyId
            ]
        );

    }



  
    // UPDATE COMPANY STATUS
  

    async updateCompanyStatus(
        companyId: number,
        status: string
    ) {

        return db.one(
            `
            UPDATE job_portal.companies

            SET
                status = $1

            WHERE company_id = $2

            RETURNING *
            `,
            [
                status,
                companyId
            ]
        );

    }



  
    // GET ALL JOBS
  

    async getAllJobs() {

        return db.any(
            `
            SELECT

                j.*,

                c.company_name,

                CONCAT(
                    u.first_name,
                    ' ',
                    COALESCE(u.last_name, '')
                ) AS recruiter_name

            FROM job_portal.jobs j

            LEFT JOIN job_portal.companies c
                ON j.company_id = c.company_id

            INNER JOIN job_portal.users u
                ON j.recruiter_id = u.id

            ORDER BY j.created_at DESC
            `
        );

    }



  
    // UPDATE JOB STATUS
  

    async updateJobStatus(
        jobId: number,
        status: string
    ) {

        return db.one(
            `
            UPDATE job_portal.jobs

            SET
                status = $1,
                updated_at = CURRENT_TIMESTAMP

            WHERE job_id = $2

            RETURNING *
            `,
            [
                status,
                jobId
            ]
        );

    }



  
    // ADMIN DASHBOARD STATISTICS
  

    async getDashboardStats() {

        return db.one(`
            SELECT

                (SELECT COUNT(*)
                 FROM job_portal.users)
                AS total_users,

                (SELECT COUNT(*)
                 FROM job_portal.jobs)
                AS total_jobs,

                (SELECT COUNT(*)
                 FROM job_portal.applications)
                AS total_applications,

                (SELECT COUNT(*)
                 FROM job_portal.companies)
                AS total_companies
        `);

    }



  
    // RECENT USERS
  

    async getRecentUsers() {

        return db.any(`
            SELECT
                id,
                first_name,
                last_name,
                email,
                phone,
                user_type,
                created_at

            FROM job_portal.users

            ORDER BY created_at DESC

            LIMIT 5
        `);

    }



  
    // RECENT JOBS
  

    // async getRecentJobs() {

    //      const totalApplicants = await db.one(`
    //         SELECT COUNT(*)::int AS count
    //         FROM job_portal.applications a
    //         INNER JOIN job_portal.jobs j
    //             ON a.job_id = j.job_id
            
    //     `);

    //     return db.any(`
    //         SELECT

    //             j.job_id,
    //             j.title,
    //             j.status,
    //             j.created_at,

    //             c.company_name,
                
    //             CONCAT(
    //                 u.first_name,
    //                 ' ',
    //                 COALESCE(u.last_name, '')
    //             ) AS recruiter_name

    //         FROM job_portal.jobs j

    //         LEFT JOIN job_portal.companies c
    //             ON j.company_id = c.company_id

    //         INNER JOIN job_portal.users u
    //             ON j.recruiter_id = u.id

    //         ORDER BY j.created_at DESC

    //         LIMIT 5
    //     `);

    // }



    async getRecentJobs() {

    return db.any(`
        SELECT

            j.job_id,
            j.title,
            j.status,
            j.created_at,

            c.company_name,

            CONCAT(
                u.first_name,
                ' ',
                COALESCE(u.last_name, '')
            ) AS recruiter_name,

            COUNT(a.application_id)::int AS total_applicants

        FROM job_portal.jobs j

        LEFT JOIN job_portal.companies c
            ON j.company_id = c.company_id

        INNER JOIN job_portal.users u
            ON j.recruiter_id = u.id

        LEFT JOIN job_portal.applications a
            ON j.job_id = a.job_id

        GROUP BY
            j.job_id,
            j.title,
            j.status,
            j.created_at,
            c.company_name,
            u.first_name,
            u.last_name

        ORDER BY j.created_at DESC

        LIMIT 5
    `);

}



  
    // WEEKLY ACTIVITY
    async getWeeklyActivity() {

        return db.one(`
            SELECT

                (
                    SELECT COUNT(*)
                    FROM job_portal.users
                    WHERE created_at >= CURRENT_TIMESTAMP - INTERVAL '7 days'
                ) AS new_users,

                (
                    SELECT COUNT(*)
                    FROM job_portal.jobs
                    WHERE created_at >= CURRENT_TIMESTAMP - INTERVAL '7 days'
                ) AS new_jobs,

                (
                    SELECT COUNT(*)
                    FROM job_portal.applications
                    WHERE applied_at >= CURRENT_TIMESTAMP - INTERVAL '7 days'
                ) AS applications,

                (
                    SELECT COUNT(*)
                    FROM job_portal.companies
                    WHERE created_at >= CURRENT_TIMESTAMP - INTERVAL '7 days'
                ) AS new_companies
        `);

    }


}


export const adminRepository =new AdminRepository();