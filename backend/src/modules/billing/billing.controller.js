import { prisma } from '../../config/db.js';
import { env } from '../../config/env.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { created, ok } from '../../utils/apiResponse.js';
const seq = () => Date.now().toString().slice(-8);
export const listInvoices = asyncHandler(async (req,res)=> ok(res, await prisma.invoice.findMany({ include:{ customer:true, sale:true, items:true }, orderBy:{ issuedAt:'desc' } })));
export const createInvoiceFromSale = asyncHandler(async (req,res)=> {
  const sale = await prisma.sale.findUnique({ where:{ id:req.params.saleId }, include:{ items:{ include:{ product:true } }, customer:true } });
  if (!sale) return res.status(404).json({ success:false, message:'Sale not found' });
  const halfGst = Number(sale.taxAmount) / 2;
  const invoice = await prisma.invoice.create({ data:{ invoiceNumber:`SP-${seq()}`, saleId:sale.id, customerId:sale.customerId, subtotal:sale.subtotal, cgst:halfGst, sgst:halfGst, total:sale.total, dueDate:req.body.dueDate ? new Date(req.body.dueDate) : null, items:{ create:sale.items.map(i=>({ productId:i.productId, description:i.product.name, quantity:i.quantity, unitPrice:i.unitPrice, gstRate:i.gstRate, total:i.lineTotal })) } }, include:{ items:true, customer:true } });
  created(res, invoice, 'GST invoice generated');
});
export const invoicePdfData = asyncHandler(async (req,res)=> ok(res, { business:{ name:env.businessName, location:env.businessLocation }, invoice: await prisma.invoice.findUnique({ where:{ id:req.params.id }, include:{ customer:true, items:{ include:{ product:true } }, sale:true } }) }));
export const whatsappLink = asyncHandler(async (req,res)=> {
  const invoice = await prisma.invoice.findUnique({ where:{ id:req.params.id }, include:{ customer:true } });
  const phone = invoice?.customer?.phone || '';
  const text = encodeURIComponent(`Namaste, your ${env.businessName} invoice ${invoice.invoiceNumber} amount is ₹${invoice.total}. Thank you.`);
  ok(res, { url:`https://wa.me/91${phone.replace(/\D/g,'')}?text=${text}` });
});
