import { db } from "../utility/database";


export class NotificationRepository {


    // =========================
    // CREATE NOTIFICATION
    // =========================

    async createNotification(
        notification: any
    ) {

        return db.one(
            `
            INSERT INTO job_portal.notifications
            (
                user_id,
                title,
                message,
                type,
                reference_id
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5
            )
            RETURNING *
            `,
            [
                notification.user_id,
                notification.title,
                notification.message,
                notification.type,
                notification.reference_id
            ]
        );

    }



    // =========================
    // GET USER NOTIFICATIONS
    // =========================

    async getNotificationsByUser(
        userId: number
    ) {

        return db.any(
            `
            SELECT
                notification_id,
                user_id,
                title,
                message,
                type,
                reference_id,
                is_read,
                created_at

            FROM job_portal.notifications

            WHERE user_id = $1

            ORDER BY created_at DESC
            `,
            [
                userId
            ]
        );

    }



    // =========================
    // GET UNREAD NOTIFICATIONS
    // =========================

    async getUnreadNotifications(
        userId: number
    ) {

        return db.any(
            `
            SELECT
                notification_id,
                user_id,
                title,
                message,
                type,
                reference_id,
                is_read,
                created_at

            FROM job_portal.notifications

            WHERE user_id = $1
            AND is_read = FALSE

            ORDER BY created_at DESC
            `,
            [
                userId
            ]
        );

    }



    // =========================
    // GET UNREAD COUNT
    // =========================

    async getUnreadCount(
        userId: number
    ) {

        return db.one(
            `
            SELECT COUNT(*) AS count

            FROM job_portal.notifications

            WHERE user_id = $1
            AND is_read = FALSE
            `,
            [
                userId
            ]
        );

    }



    // =========================
    // MARK AS READ
    // =========================

    async markAsRead(
        notificationId: number
    ) {

        return db.one(
            `
            UPDATE job_portal.notifications

            SET is_read = TRUE

            WHERE notification_id = $1

            RETURNING *
            `,
            [
                notificationId
            ]
        );

    }



    // =========================
    // MARK ALL AS READ
    // =========================

    async markAllAsRead(
        userId: number
    ) {

        return db.result(
            `
            UPDATE job_portal.notifications

            SET is_read = TRUE

            WHERE user_id = $1
            AND is_read = FALSE
            `,
            [
                userId
            ]
        );

    }

}


export const notificationRepository =
    new NotificationRepository();