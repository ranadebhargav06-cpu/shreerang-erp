import { prisma } from '../../config/db.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { created, ok } from '../../utils/apiResponse.js';
const money = (n) => Number(n || 0);
const sequence = () => Date.now().toString().slice(-8);
export const listSales = asyncHandler(async (req,res)=> ok(res, await prisma.sale.findMany({ include:{ customer:true, items:{ include:{ product:true } }, invoice:true }, orderBy:{ saleDate:'desc' } })));
export const salesSummary = asyncHandler(async (req,res)=> {
  const sales = await prisma.sale.findMany();
  const total = sales.reduce((s,x)=>s+money(x.total),0);
  ok(res, { count:sales.length, total });
});
export const createSale = asyncHandler(async (req,res)=> {
  const { customerId, saleType='RETAIL', items=[], discount=0, paymentMode='CASH', paidAmount=0 } = req.body;
  const products = await prisma.product.findMany({ where:{ id:{ in: items.map(i=>i.productId) } } });
  let subtotal = 0, taxAmount = 0;
  const saleItems = items.map(i => {
    const p = products.find(x=>x.id===i.productId);
    const unitPrice = money(i.unitPrice ?? (saleType === 'WHOLESALE' ? p.priceWholesale : p.priceRetail));
    const lineBase = unitPrice * money(i.quantity);
    const tax = lineBase * money(p.gstRate) / 100;
    subtotal += lineBase; taxAmount += tax;
    return { productId:i.productId, batchNo:i.batchNo, quantity:i.quantity, unitPrice, gstRate:p.gstRate, lineTotal:lineBase + tax };
  });
  const total = subtotal + taxAmount - money(discount);
  const sale = await prisma.sale.create({ data:{ saleNumber:`SALE-${sequence()}`, customerId, userId:req.user.id, saleType, subtotal, taxAmount, discount, total, paidAmount, paymentMode, items:{ create:saleItems } }, include:{ items:true } });
  if (customerId && money(paidAmount) < total) await prisma.customer.update({ where:{ id:customerId }, data:{ outstanding:{ increment: total - money(paidAmount) } } });
  created(res, sale, 'Sale recorded');
});
export const returnSale = asyncHandler(async (req,res)=> created(res, await prisma.salesReturn.create({ data:{ saleId:req.params.id, reason:req.body.reason, amount:req.body.amount } }), 'Sales return recorded'));
