import { prisma } from '../../config/db.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ok } from '../../utils/apiResponse.js';
const n = (v)=>Number(v||0);
export const summary = asyncHandler(async (req,res)=>{
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const [todaySales, monthlySales, customers, batches, products, expenses] = await Promise.all([
    prisma.sale.findMany({ where:{ saleDate:{ gte:todayStart } } }),
    prisma.sale.findMany({ where:{ saleDate:{ gte:monthStart } }, include:{ items:{ include:{ product:true } } } }),
    prisma.customer.findMany(),
    prisma.productBatch.findMany({ include:{ product:true } }),
    prisma.product.findMany({ include:{ saleItems:true } }),
    prisma.expense.findMany({ where:{ expenseDate:{ gte:monthStart } } })
  ]);
  const topSellingProducts = products.map(p=>({ id:p.id, name:p.name, quantity:p.saleItems.reduce((s,i)=>s+n(i.quantity),0) })).sort((a,b)=>b.quantity-a.quantity).slice(0,5);
  const revenueByDay = Array.from({length:30},(_,idx)=>{ const d=new Date(); d.setDate(d.getDate()-idx); const key=d.toISOString().slice(0,10); return { date:key, revenue: monthlySales.filter(s=>s.saleDate.toISOString().slice(0,10)===key).reduce((sum,s)=>sum+n(s.total),0)}; }).reverse();
  ok(res, {
    todaysSales: todaySales.reduce((s,x)=>s+n(x.total),0),
    monthlySales: monthlySales.reduce((s,x)=>s+n(x.total),0),
    outstandingPayments: customers.reduce((s,x)=>s+n(x.outstanding),0),
    totalCustomers: customers.length,
    inventoryStatus: batches.map(b=>({ product:b.product.name, batchNumber:b.batchNumber, quantity:n(b.quantity) })),
    topSellingProducts,
    revenueByDay,
    monthlyExpenses: expenses.reduce((s,x)=>s+n(x.amount),0)
  });
});
