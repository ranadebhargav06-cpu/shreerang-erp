import { Router } from 'express';
import { placeholders } from './ai.controller.js';
const router = Router();
router.get('/readiness', placeholders);
export default router;
