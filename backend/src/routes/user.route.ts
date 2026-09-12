import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

const userController = new UserController();


router.post("/register",userController.register.bind(userController));


router.post("/login",userController.login.bind(userController));

router.get(
    "/my-profile",
    authMiddleware,
    userController.getMyProfile.bind(userController)
);
export default router;