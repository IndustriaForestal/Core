import { combineReducers } from 'redux'
import reducerApp from './reducer'
import reducerCustomers from '../pages/Customers/reducer'
import reducerProcesses from '../pages/Processes/reducer'
import reducerStock from '../pages/Stock/reducer'
import reducerPallets from '../pages/Pallets/reducer'
import reducerItems from '../pages/Items/reducer'
import reducerWood from '../pages/Wood/reducer'
import reducerUsers from '../pages/Users/reducer'
import reducerZones from '../pages/Zones/reducer'
import reducerQualities from '../pages/Qualities/reducer'
import reducerSpecialProcesses from '../pages/SpecialProcesses/reducer'
import reducerMaterial from '../pages/Material/reducer'
import reducerComplements from '../pages/Complements/reducer'
import reducerSuppliers from '../pages/Suppliers/reducer'
import reducerOrders from '../pages/Orders/reducer'
import reducerSchedule from '../pages/Schedule/reducer'
import reducerPurchaseOrders from '../pages/PurchaseOrder/reducer'
import reducerColors from '../pages/Colors/reducer'
import reducerSamples from '../pages/Samples/reducer'
import reducerWarehouse from '../pages/Warehouse/reducer'
import reducerReports from '../pages/Reports/reducer'
import reducerTraffic from '../pages/Traffic/reducer'

const reducer = combineReducers({
  reducerApp,
  reducerCustomers,
  reducerProcesses,
  reducerStock,
  reducerPallets,
  reducerItems,
  reducerZones,
  reducerWood,
  reducerQualities,
  reducerSpecialProcesses,
  reducerUsers,
  reducerMaterial,
  reducerComplements,
  reducerSuppliers,
  reducerOrders,
  reducerSchedule,
  reducerPurchaseOrders,
  reducerColors,
  reducerSamples,
  reducerWarehouse,
  reducerReports,
  reducerTraffic,
})

export default reducer
