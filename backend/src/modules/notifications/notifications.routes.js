import { Router } from 'express';
import { createNotification, listNotifications, markRead, generateBusinessAlerts } from './notifications.controller.js';
const router = Router();
router.get('/', listNotifications);
router.post('/', createNotification);
router.patch('/:id/read', markRead);
router.post('/generate-alerts', generateBusinessAlerts);
export default router;
