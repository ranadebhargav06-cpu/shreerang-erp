import { prisma } from '../../config/db.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { created, ok } from '../../utils/apiResponse.js';
export const listSuppliers = asyncHandler(async (req,res)=> ok(res, await prisma.supplier.findMany({ orderBy:{ name:'asc' } })));
export const createSupplier = asyncHandler(async (req,res)=> created(res, await prisma.supplier.create({ data:req.body }), 'Supplier created'));
export const listPurchases = asyncHandler(async (req,res)=> ok(res, await prisma.purchase.findMany({ include:{ supplier:true, items:{ include:{ rawMaterial:true } }, expenses:true }, orderBy:{ purchaseDate:'desc' } })));
export const createPurchase = asyncHandler(async (req,res)=> {
  const poNumber = req.body.poNumber || `PO-${Date.now().toString().slice(-8)}`;
  const purchase = await prisma.purchase.create({ data:{ ...req.body, poNumber, items:{ create:req.body.items || [] }, expenses:{ create:req.body.expenses || [] } }, include:{ items:true, expenses:true } });
  created(res, purchase, 'Purchase recorded');
});
