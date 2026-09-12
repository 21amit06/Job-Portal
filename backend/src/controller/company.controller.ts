import { Response } from "express";
import {AuthRequest} from "../middleware/auth.middleware";

import {companyRepository} from "../repository/company.repository";


export class CompanyController {

    async createCompany(req: AuthRequest,res: Response) {
        try {
            const {
                company_name,
                industry,
                company_size,
                location,
                website,
                description,
                logo_url
            } = req.body;


            if (!company_name) {
                return res.status(400).json({
                    message: "Company name is required"
                });

            }


            const recruiterId =req.user.id;
            const existingCompany =await companyRepository.getCompanyByRecruiter(recruiterId);

            if (existingCompany) {
                return res.status(400).json({
                    message:"Company already exists for this recruiter"
                });

            }


            const company = {
                recruiter_id: recruiterId,
                company_name,
                industry,
                company_size,
                location,
                website,
                description,
                logo_url

            };


            const result =
                await companyRepository.createCompany(company);
            return res.status(201).json({
                message: "Company created successfully",
                company: result

            });

        }
        catch (error) {
            return res.status(500).json({
                message: "Internal server error"
            });

        }
    }



    async getMyCompany(req: AuthRequest,res: Response) {
        try {
            const recruiterId =req.user.id;

            const company =await companyRepository.getCompanyByRecruiter(recruiterId );


            if (!company) {
                return res.status(404).json({
                    message: "Company not found"
                });

            }


            return res.status(200).json({
                company
            });

        }
        catch (error) {

            //console.log(error);

            return res.status(500).json({
                message: "Internal server error"
            });

        }
    }



    async getCompanyById(req: AuthRequest,res: Response) {
        try {
            const companyId =Number(req.params.id);
            const company =await companyRepository.getCompanyById(companyId);


            if (!company) {
                return res.status(404).json({
                    message: "Company not found"
                });

            }

            return res.status(200).json({
                company
            });

        }
        catch (error) {

           // console.log(error);

            return res.status(500).json({
                message: "Internal server error"
            });

        }
    }



    async updateMyCompany(req: AuthRequest,res: Response) {
    try {
        const recruiterId = req.user.id;
        const existingCompany =await companyRepository.getCompanyByRecruiter(recruiterId);


        // Company does not exist
        if (!existingCompany) {

            const {
                company_name,
                industry,
                company_size,
                location,
                website,
                description,
                logo_url
            } = req.body;


            if (!company_name) {

                return res.status(400).json({
                    message: "Company name is required"
                });

            }


            const company = {
                recruiter_id: recruiterId,
                company_name,
                industry,
                company_size,
                location,
                website,
                description,
                logo_url

            };


            const result =await companyRepository.createCompany(company);

            return res.status(201).json({

                message:"Company created successfully",
                company: result

            });

        }


        // Company already exists
        const result =await companyRepository.updateCompany(existingCompany.company_id,req.body);
        return res.status(200).json({

            message: "Company updated successfully",
            company: result

        });

    }
    catch (error) {

        //console.log(error);

        return res.status(500).json({

            message:
                "Internal server error"

        });

    }
}
}


export const companyController =
    new CompanyController();