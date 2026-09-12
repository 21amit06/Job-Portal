import { Response } from "express";

import {
    AuthRequest
} from "../middleware/auth.middleware";

import {
    notificationRepository
} from "../repository/notification.repository";


export class NotificationController {


    // =========================
    // GET MY NOTIFICATIONS
    // =========================

    async getMyNotifications(
        req: AuthRequest,
        res: Response
    ) {

        try {

            const userId =
                req.user.id;


            const notifications =
                await notificationRepository
                    .getNotificationsByUser(
                        userId
                    );


            return res.status(200).json({

                notifications

            });

        }
        catch (error) {

            console.log(error);

            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }



    // =========================
    // GET UNREAD NOTIFICATIONS
    // =========================

    async getUnreadNotifications(
        req: AuthRequest,
        res: Response
    ) {

        try {

            const userId =
                req.user.id;


            const notifications =
                await notificationRepository
                    .getUnreadNotifications(
                        userId
                    );


            return res.status(200).json({

                notifications

            });

        }
        catch (error) {

            console.log(error);

            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }



    // =========================
    // GET UNREAD COUNT
    // =========================

    async getUnreadCount(
        req: AuthRequest,
        res: Response
    ) {

        try {

            const userId =
                req.user.id;


            const result =
                await notificationRepository
                    .getUnreadCount(
                        userId
                    );


            return res.status(200).json({

                count: Number(result.count)

            });

        }
        catch (error) {

            console.log(error);

            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }



    // =========================
    // MARK NOTIFICATION AS READ
    // =========================

    async markAsRead(
        req: AuthRequest,
        res: Response
    ) {

        try {

            const notificationId =
                Number(req.params.id);


            const notification =
                await notificationRepository
                    .getNotificationsByUser(
                        req.user.id
                    );


            const exists =
                notification.find(
                    (item: any) =>
                        item.notification_id ===
                        notificationId
                );


            if (!exists) {

                return res.status(404).json({
                    message:
                        "Notification not found"
                });

            }


            const result =
                await notificationRepository
                    .markAsRead(
                        notificationId
                    );


            return res.status(200).json({

                message:
                    "Notification marked as read",

                notification: result

            });

        }
        catch (error) {

            console.log(error);

            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }



    // =========================
    // MARK ALL AS READ
    // =========================

    async markAllAsRead(
        req: AuthRequest,
        res: Response
    ) {

        try {

            const userId =
                req.user.id;


            await notificationRepository
                .markAllAsRead(
                    userId
                );


            return res.status(200).json({

                message:
                    "All notifications marked as read"

            });

        }
        catch (error) {

            console.log(error);

            return res.status(500).json({
                message:
                    "Internal server error"
            });

        }

    }

}


export const notificationController =
    new NotificationController();