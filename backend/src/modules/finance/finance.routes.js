import { Router } from 'express';
import { authorize } from '../../middleware/auth.js';
import { addExpense, cashBook, monthlySummary, profitLoss } from './finance.controller.js';
const router = Router();
router.get('/profit-loss', profitLoss);
router.get('/cash-book', cashBook);
router.get('/monthly-summary', monthlySummary);
router.post('/expenses', authorize('ADMIN','MANAGER','ACCOUNTANT'), addExpense);
export default router;
