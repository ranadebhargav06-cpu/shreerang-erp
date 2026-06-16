import { prisma } from '../../config/db.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { created, ok } from '../../utils/apiResponse.js';
export const listNotifications = asyncHandler(async (req,res)=> ok(res, await prisma.notification.findMany({ orderBy:{ createdAt:'desc' } })));
export const createNotification = asyncHandler(async (req,res)=> created(res, await prisma.notification.create({ data:req.body }), 'Notification created'));
export const markRead = asyncHandler(async (req,res)=> ok(res, await prisma.notification.update({ where:{ id:req.params.id }, data:{ read:true } }), 'Marked read'));
export const generateBusinessAlerts = asyncHandler(async (req,res)=>{ const lows=(await prisma.rawMaterial.findMany()).filter(r=>Number(r.currentStock)<=Number(r.reorderLevel)); const dues=(await prisma.customer.findMany()).filter(c=>Number(c.outstanding)>0); const createdAlerts=[]; for (const r of lows) createdAlerts.push(await prisma.notification.create({ data:{ title:'Low stock alert', message:`${r.name} is below reorder level`, type:'LOW_STOCK' } })); for (const c of dues) createdAlerts.push(await prisma.notification.create({ data:{ title:'Pending payment reminder', message:`${c.name} has outstanding ₹${c.outstanding}`, type:'PAYMENT_DUE' } })); ok(res, createdAlerts, 'Alerts generated'); });
