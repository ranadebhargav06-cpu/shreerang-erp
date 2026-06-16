import { Router } from 'express';
import { authorize } from '../../middleware/auth.js';
import { createInvoiceFromSale, listInvoices, whatsappLink, invoicePdfData } from './billing.controller.js';
const router = Router();
router.get('/invoices', listInvoices);
router.post('/invoices/from-sale/:saleId', authorize('ADMIN','MANAGER','SALES','ACCOUNTANT'), createInvoiceFromSale);
router.get('/invoices/:id/pdf-data', invoicePdfData);
router.get('/invoices/:id/whatsapp', whatsappLink);
export default router;
