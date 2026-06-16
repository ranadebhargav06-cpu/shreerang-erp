import { prisma } from '../../config/db.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { created, ok } from '../../utils/apiResponse.js';
export const listCustomers = asyncHandler(async (req,res)=> ok(res, await prisma.customer.findMany({ include:{ addresses:true }, orderBy:{ name:'asc' } })));
export const getCustomer = asyncHandler(async (req,res)=> ok(res, await prisma.customer.findUnique({ where:{ id:req.params.id }, include:{ addresses:true, payments:true, invoices:true, sales:true } })));
export const createCustomer = asyncHandler(async (req,res)=> created(res, await prisma.customer.create({ data:req.body }), 'Customer created'));
export const updateCustomer = asyncHandler(async (req,res)=> ok(res, await prisma.customer.update({ where:{ id:req.params.id }, data:req.body }), 'Customer updated'));
export const deleteCustomer = asyncHandler(async (req,res)=> ok(res, await prisma.customer.delete({ where:{ id:req.params.id } }), 'Customer deleted'));
export const addAddress = asyncHandler(async (req,res)=> created(res, await prisma.address.create({ data:{ ...req.body, customerId:req.params.id } }), 'Address added'));
export const addPayment = asyncHandler(async (req,res)=> {
  const payment = await prisma.payment.create({ data:{ ...req.body, customerId:req.params.id } });
  await prisma.customer.update({ where:{ id:req.params.id }, data:{ outstanding:{ decrement:req.body.amount } } });
  created(res, payment, 'Payment recorded');
});
