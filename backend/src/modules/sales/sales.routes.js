import { Router } from 'express';
import { authorize } from '../../middleware/auth.js';
import { createSale, listSales, returnSale, salesSummary } from './sales.controller.js';
const router = Router();
router.get('/', listSales);
router.get('/summary', salesSummary);
router.post('/', authorize('ADMIN','MANAGER','SALES'), createSale);
router.post('/:id/return', authorize('ADMIN','MANAGER','SALES'), returnSale);
export default router;
