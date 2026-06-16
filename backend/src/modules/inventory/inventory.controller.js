import { prisma } from '../../config/db.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { created, ok } from '../../utils/apiResponse.js';
export const listRawMaterials = asyncHandler(async (req,res)=> ok(res, await prisma.rawMaterial.findMany({ include:{ movements:true }, orderBy:{ name:'asc' } })));
export const createRawMaterial = asyncHandler(async (req,res)=> created(res, await prisma.rawMaterial.create({ data:req.body }), 'Raw material created'));
export const lowStock = asyncHandler(async (req,res)=> ok(res, (await prisma.rawMaterial.findMany()).filter(r=>Number(r.currentStock)<=Number(r.reorderLevel))));
export const moveStock = asyncHandler(async (req,res)=> {
  const movement = await prisma.stockMovement.create({ data:req.body });
  if (req.body.rawMaterialId) await prisma.rawMaterial.update({ where:{ id:req.body.rawMaterialId }, data:{ currentStock:{ increment:req.body.quantity } } });
  created(res, movement, 'Stock movement recorded');
});
