import { ok } from '../../utils/apiResponse.js';
export const placeholders = (req,res)=> ok(res, {
  status:'architecture-ready',
  plannedFeatures:['Demand forecasting','Sales prediction','Inventory prediction','Customer analytics'],
  integrationPattern:'Add ML services under backend/src/modules/ai without changing existing ERP modules. Consume normalized sales, inventory, purchase, and customer history through services.'
});
