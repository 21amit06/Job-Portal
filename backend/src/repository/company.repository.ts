import { db } from "../utility/database";

export class CompanyRepository {

    async createCompany(company: any) {

        return db.one( `INSERT INTO job_portal.companies
            (
                recruiter_id,
                company_name,
                industry,
                company_size,
                location,
                website,
                description,
                logo_url
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
                company.recruiter_id,
                company.company_name,
                company.industry,
                company.company_size,
                company.location,
                company.website,
                company.description,
                company.logo_url
            ]
        );
    }


    async getCompanyByRecruiter(recruiterId: number) {

        return db.oneOrNone(`SELECT *
            FROM job_portal.companies
            WHERE recruiter_id = $1
            `,
            [recruiterId]
        );
    }


    async getCompanyById(companyId: number) {

        return db.oneOrNone(`SELECT *
            FROM job_portal.companies
            WHERE company_id = $1
            `,
            [companyId]
        );
    }


    async updateCompany(companyId: number,company: any) {

        return db.one(`UPDATE job_portal.companies
            SET
                company_name = $1,
                industry = $2,
                company_size = $3,
                location = $4,
                website = $5,
                description = $6,
                logo_url = $7
            WHERE company_id = $8
            RETURNING *
            `,
            [
                company.company_name,
                company.industry,
                company.company_size,
                company.location,
                company.website,
                company.description,
                company.logo_url,
                companyId
            ]
        );
    }
}


export const companyRepository = new CompanyRepository();