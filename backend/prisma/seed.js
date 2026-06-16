import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){
  const passwordHash = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({ where:{ email:'admin@shreerangpapad.com' }, update:{}, create:{ name:'Shreerang Admin', email:'admin@shreerangpapad.com', phone:'9999999999', role:'ADMIN', passwordHash } });
  const cat = await prisma.productCategory.upsert({ where:{ name:'Papad' }, update:{}, create:{ name:'Papad', description:'Papad finished goods' } });
  const products = [
    ['Udad Papad','UDAD-PAPAD',80,70], ['Masala Papad','MASALA-PAPAD',90,78], ['Rice Papad','RICE-PAPAD',75,65]
  ];
  for (const [name,sku,priceRetail,priceWholesale] of products) {
    const p = await prisma.product.upsert({ where:{ sku }, update:{}, create:{ name, sku, categoryId:cat.id, priceRetail, priceWholesale, unit:'packet', description:`${name} manufactured by Shreerang Papad` } });
    await prisma.productBatch.upsert({ where:{ productId_batchNumber:{ productId:p.id, batchNumber:'OPENING' } }, update:{}, create:{ productId:p.id, batchNumber:'OPENING', quantity:100, costPerUnit:45 } });
  }
  for (const r of [['Udad Dal','kg',50,10],['Rice Flour','kg',40,10],['Masala Mix','kg',20,5],['Packaging Material','pcs',500,100]]) {
    await prisma.rawMaterial.upsert({ where:{ name:r[0] }, update:{}, create:{ name:r[0], unit:r[1], currentStock:r[2], reorderLevel:r[3] } });
  }
}
main().finally(()=>prisma.$disconnect());
