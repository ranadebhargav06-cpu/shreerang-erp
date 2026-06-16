import { Router } from 'express';
import { authorize } from '../../middleware/auth.js';
import { createPurchase, createSupplier, listPurchases, listSuppliers } from './purchases.controller.js';
const router = Router();
router.get('/suppliers', listSuppliers);
router.post('/suppliers', authorize('ADMIN','MANAGER'), createSupplier);
router.get('/', listPurchases);
router.post('/', authorize('ADMIN','MANAGER','ACCOUNTANT'), createPurchase);
export default router;
