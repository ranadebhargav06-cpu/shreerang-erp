import { Router } from 'express';
import { summary } from './dashboard.controller.js';
const router = Router();
router.get('/', summary);
export default router;
