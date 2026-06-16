import { Router } from 'express';
import { authorize } from '../../middleware/auth.js';
import { createRawMaterial, listRawMaterials, lowStock, moveStock } from './inventory.controller.js';
const router = Router();
router.get('/raw-materials', listRawMaterials);
router.post('/raw-materials', authorize('ADMIN','MANAGER','INVENTORY'), createRawMaterial);
router.get('/low-stock', lowStock);
router.post('/movements', authorize('ADMIN','MANAGER','INVENTORY'), moveStock);
export default router;
