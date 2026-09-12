import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const roleMiddleware = (...allowedRoles: string[]) => {

    return (req: AuthRequest, res: Response,next: NextFunction) => {

        if (!req.user) {
            return res.status(401).json({
                message: "User is not authenticated"
            });

        }

        if (!allowedRoles.includes(req.user.user_type)) {
            return res.status(403).json({
                message: "You are not authorized to access this resource"
            });

        }

        next();
    };
};