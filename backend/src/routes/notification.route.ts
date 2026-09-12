import { Router } from "express";

import {
    notificationController
} from "../controller/notification.controller";

import {
    authMiddleware
} from "../middleware/auth.middleware";


const router = Router();


// =========================
// GET ALL NOTIFICATIONS
// =========================

router.get(
    "/",
    authMiddleware,
    notificationController.getMyNotifications.bind(
        notificationController
    )
);


// =========================
// GET UNREAD NOTIFICATIONS
// =========================

router.get(
    "/unread",
    authMiddleware,
    notificationController.getUnreadNotifications.bind(
        notificationController
    )
);


// =========================
// GET UNREAD COUNT
// =========================

router.get(
    "/unread/count",
    authMiddleware,
    notificationController.getUnreadCount.bind(
        notificationController
    )
);


// =========================
// MARK ALL AS READ
// =========================

router.patch(
    "/read-all",
    authMiddleware,
    notificationController.markAllAsRead.bind(
        notificationController
    )
);


// =========================
// MARK ONE AS READ
// =========================

router.patch(
    "/:id/read",
    authMiddleware,
    notificationController.markAsRead.bind(
        notificationController
    )
);


export default router;