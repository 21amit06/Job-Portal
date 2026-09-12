import { Router } from "express";
import {companyController} from "../controller/company.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {roleMiddleware} from "../middleware/role.middleware";

const router = Router();

// router.post(
//     "/",
//     authMiddleware,
//     roleMiddleware("RECRUITER"),
//     companyController.createCompany.bind(
//         companyController
//     )
// );


// router.get(
//     "/my-company",
//     authMiddleware,
//     roleMiddleware("RECRUITER"),
//     companyController.getMyCompany.bind(
//         companyController
//     )
// );


// router.get(
//     "/:id",
//     authMiddleware,
//     companyController.getCompanyById.bind(
//         companyController
//     )
// );


router.put(
    "/my-company",
    authMiddleware,
    roleMiddleware("RECRUITER"),
    companyController.updateMyCompany.bind(
        companyController
    )
);


export default router;