import { db } from "../utility/database";

export class DashboardRepository {

    // RECRUITER DASHBOARD
   
    async getRecruiterDashboard(recruiterId: number) {
        // JOBS POSTED
      
        const jobsPosted = await db.one(`
            SELECT COUNT(*)::int AS count
            FROM job_portal.jobs
            WHERE recruiter_id = $1
        `, [recruiterId]);

      
        // TOTAL APPLICANTS
        const totalApplicants = await db.one(`
            SELECT COUNT(*)::int AS count
            FROM job_portal.applications a
            INNER JOIN job_portal.jobs j
                ON a.job_id = j.job_id
            WHERE j.recruiter_id = $1
        `, [recruiterId]);


        // TOTAL INTERVIEWS
        const interviews = await db.one(`
            SELECT COUNT(*)::int AS count
            FROM job_portal.interviews i
            INNER JOIN job_portal.applications a
                ON i.application_id = a.application_id
            INNER JOIN job_portal.jobs j
                ON a.job_id = j.job_id
            WHERE j.recruiter_id = $1
        `, [recruiterId]);


      
        // SHORTLISTED
      
        const shortlisted = await db.one(`
            SELECT COUNT(*)::int AS count
            FROM job_portal.applications a
            INNER JOIN job_portal.jobs j
                ON a.job_id = j.job_id
            WHERE j.recruiter_id = $1
            AND a.status = 'SHORTLISTED'
        `, [recruiterId]);


      
        // RECENT JOBS
      
        const recentJobs = await db.any(`
            SELECT
                j.job_id,
                j.title,
                j.location,
                j.job_type,
                j.status,
                j.created_at,

                COUNT(a.application_id)::int AS applicants

            FROM job_portal.jobs j

            LEFT JOIN job_portal.applications a
                ON j.job_id = a.job_id

            WHERE j.recruiter_id = $1

            GROUP BY
                j.job_id,
                j.title,
                j.location,
                j.job_type,
                j.status,
                j.created_at

            ORDER BY j.created_at DESC
            LIMIT 5
        `, [recruiterId]);


      
        // RECENT APPLICANTS
      
        const recentApplicants = await db.any(`
            SELECT
                a.application_id,
                a.status,
                a.applied_at,
                u.id AS job_seeker_id,
                CONCAT(
                    u.first_name,
                    ' ',
                    COALESCE(u.last_name, '')
                ) AS applicant_name,

                u.email AS applicant_email,
                j.job_id,
                j.title AS job_title

            FROM job_portal.applications a

            INNER JOIN job_portal.users u
                ON a.job_seeker_id = u.id

            INNER JOIN job_portal.jobs j
                ON a.job_id = j.job_id

            WHERE j.recruiter_id = $1
            ORDER BY a.applied_at DESC

            LIMIT 5
        `, [recruiterId]);


      
        // RETURN DASHBOARD DATA
      

        return {

            stats: {
                jobsPosted: jobsPosted.count,
                totalApplicants: totalApplicants.count,
                interviews: interviews.count,
                shortlisted: shortlisted.count
            },
            recentJobs,
            recentApplicants

        };
    }
}


export const dashboardRepository =new DashboardRepository();