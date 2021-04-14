import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import Layout from '../layout'
import Home from '../pages/Home'
import HomeAccounting from '../pages/Home/Accounting'
import HomeAdministration from '../pages/Home/Administration'
import HomeManagement from '../pages/Home/Management'
import HomeProduction from '../pages/Home/Production'
import HomeQuality from '../pages/Home/Quality'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Customers from '../pages/Customers'
import CreateCustomer from '../pages/Customers/CreateCustomer'
import EditCustomer from '../pages/Customers/EditCustomer'
import Nails from '../pages/Nails'
import CreateNail from '../pages/Nails/CreateNail'
import UpdateNail from '../pages/Nails/UpdateNail'
import Material from '../pages/Material'
import CreateMaterial from '../pages/Material/CreateMaterial'
import UpdateMaterial from '../pages/Material/UpdateMaterial'
import Processes from '../pages/Processes'
import CreateProcess from '../pages/Processes/CreateProcess'
import UpdateProcess from '../pages/Processes/UpdateProcess'
import Platforms from '../pages/Platforms'
import CreatePlatform from '../pages/Platforms/CreatePlatform'
import UpdatePlatform from '../pages/Platforms/UpdatePlatform'
import Items from '../pages/Items'
import CreateItem from '../pages/Items/CreateItem'
import UpdateItem from '../pages/Items/UpdateItem'
import Suppliers from '../pages/Suppliers'
import CreateSupplier from '../pages/Suppliers/CreateSupplier'
import UpdateSupplier from '../pages/Suppliers/UpdateSupplier'
import Qualities from '../pages/Qualities'
import CreateQuality from '../pages/Qualities/CreateQuality'
import AddProcess from '../pages/Qualities/AddProcess'
import EditProcess from '../pages/Qualities/EditProcess'
import SpecialProcesses from '../pages/SpecialProcesses'
import CreateSpecialProcess from '../pages/SpecialProcesses/CreateSpecialProcess'
import UpdateSpecialProcess from '../pages/SpecialProcesses/UpdateSpecialProcess'
import Pallets from '../pages/Pallets'
import CreatePallet from '../pages/Pallets/CreatePallet'
import UpdatePallet from '../pages/Pallets/UpdatePallet'
import AddNail from '../pages/Pallets/AddNail'
import AddItem from '../pages/Pallets/AddItem'
import AddPlatform from '../pages/Pallets/AddPlatform'
import AddSpecialProcess from '../pages/Pallets/AddSpecialProcess'
import Stock from '../pages/Stock'
import StockItems from '../pages/Stock/StockItems'
import StockMaterial from '../pages/Stock/StockMaterial'
import StockNails from '../pages/Stock/StockNails'
import StockUpdate from '../pages/Stock/StockUpdate'
import StockChanges from '../pages/Stock/StockChanges'
import StockHistory from '../pages/Stock/StockHistory'
import Orders from '../pages/Orders'
import MainOrder from '../pages/Orders/OrderMain'
import OrderProduction from '../pages/Orders/OrderProduction'
import CreateOrder from '../pages/Orders/CreateOrder'
import UpdateOrder from '../pages/Orders/UpdateOrder'
import OrderIntern from '../pages/Orders/OrderIntern'
import OrderDetails from '../pages/Orders/OrderDetails'
import Raws from '../pages/Raws'
import CreateRaw from '../pages/Raws/CreateRaw'
import UpdateRaw from '../pages/Raws/UpdateRaw'
import Users from '../pages/Users'
import CreateUser from '../pages/Users/CreateUser'
import UpdateUser from '../pages/Users/UpdateUser'
import OrderProductionList from '../pages/OrderProduction'
import OrderProductionItem from '../pages/OrderProduction/OrderProductionItem'
import OrderShipments from '../pages/Orders/OrderShipments'
import Calendar from '../pages/Calendar'
import CalendarProduction from '../pages/CalendarProduction'
import CalendarShipments from '../pages/CalendarShipments'

//SEGUNDA ETAPA

import ShippingProgram from '../pages/ShippingProgram'
import ShippingProgramStock from '../pages/ShippingProgram/Stock'
import SupplierDelivery from '../pages/ShippingProgram/SupplierDelivery'
import Sawn from '../pages/ShippingProgram/Sawn'
import Assamble from '../pages/ShippingProgram/Assamble'
import Stoves from '../pages/ShippingProgram/Stoves'

import Format1 from '../pages/Formats'
import Format2 from '../pages/Formats/FOR-CAL-FTP022'

//Renovando Sistema

import SettingsHome from '../pages/Home/Settings'
import TypeMaterial from '../pages/Settings/TypeMaterial'
import TypeWood from '../pages/Settings/TypeWood'

const App = ({ loggedIn }) => {
  const role = Cookies.get('role')
  if (loggedIn) {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/customers"
              component={
                role === 'Administrador' || role === 'Vista' ? Customers : Home
              }
            />
            <Route
              exact
              path="/customers/create"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? CreateCustomer
                  : Home
              }
            />
            <Route
              exact
              path="/customers/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? EditCustomer
                  : Home
              }
            />
            <Route
              exact
              path="/nails"
              component={
                role === 'Administrador' || role === 'Vista' ? Nails : Home
              }
            />
            <Route
              exact
              path="/nails/create"
              component={
                role === 'Administrador' || role === 'Vista' ? CreateNail : Home
              }
            />
            <Route
              exact
              path="/nails/:id"
              component={
                role === 'Administrador' || role === 'Vista' ? UpdateNail : Home
              }
            />
            <Route
              exact
              path="/material"
              component={
                role === 'Administrador' || role === 'Vista' ? Material : Home
              }
            />
            <Route
              exact
              path="/material/create"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? CreateMaterial
                  : Home
              }
            />
            <Route
              exact
              path="/material/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? UpdateMaterial
                  : Home
              }
            />
            <Route
              exact
              path="/processes"
              component={
                role === 'Administrador' || role === 'Vista' ? Processes : Home
              }
            />
            <Route
              exact
              path="/processes/create"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? CreateProcess
                  : Home
              }
            />
            <Route
              exact
              path="/processes/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? UpdateProcess
                  : Home
              }
            />
            <Route
              exact
              path="/platforms"
              component={
                role === 'Administrador' || role === 'Vista' ? Platforms : Home
              }
            />
            <Route
              exact
              path="/platforms/create"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? CreatePlatform
                  : Home
              }
            />
            <Route
              exact
              path="/platforms/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? UpdatePlatform
                  : Home
              }
            />
            <Route
              exact
              path="/items"
              component={
                role === 'Administrador' || role === 'Vista' ? Items : Home
              }
            />
            <Route
              exact
              path="/items/create"
              component={
                role === 'Administrador' || role === 'Vista' ? CreateItem : Home
              }
            />
            <Route
              exact
              path="/items/:id"
              component={
                role === 'Administrador' || role === 'Vista' ? UpdateItem : Home
              }
            />
            <Route
              exact
              path="/suppliers"
              component={
                role === 'Administrador' || role === 'Vista' ? Suppliers : Home
              }
            />
            <Route
              exact
              path="/suppliers/create"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? CreateSupplier
                  : Home
              }
            />
            <Route
              exact
              path="/suppliers/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? UpdateSupplier
                  : Home
              }
            />
            <Route
              exact
              path="/qualities"
              component={
                role === 'Administrador' || role === 'Vista' ? Qualities : Home
              }
            />
            <Route
              exact
              path="/qualities/create"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? CreateQuality
                  : Home
              }
            />
            <Route
              exact
              path="/qualities/add/:id"
              component={
                role === 'Administrador' || role === 'Vista' ? AddProcess : Home
              }
            />
            <Route
              exact
              path="/qualities/edit/:qualityId/:processId"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? EditProcess
                  : Home
              }
            />
            <Route
              exact
              path="/specialProcesses"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? SpecialProcesses
                  : Home
              }
            />
            <Route
              exact
              path="/specialProcesses/create"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? CreateSpecialProcess
                  : Home
              }
            />
            <Route
              exact
              path="/specialProcesses/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? UpdateSpecialProcess
                  : Home
              }
            />
            <Route
              exact
              path="/pallets"
              component={
                role === 'Administrador' || role === 'Vista' ? Pallets : Home
              }
            />
            <Route
              exact
              path="/pallets/create"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? CreatePallet
                  : Home
              }
            />
            <Route
              exact
              path="/pallets/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? UpdatePallet
                  : Home
              }
            />
            <Route
              exact
              path="/pallets/add/:id"
              component={
                role === 'Administrador' || role === 'Vista' ? AddNail : Home
              }
            />
            <Route
              exact
              path="/pallets/item/:id"
              component={
                role === 'Administrador' || role === 'Vista' ? AddItem : Home
              }
            />
            <Route
              exact
              path="/pallets/platform/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? AddPlatform
                  : Home
              }
            />
            <Route
              exact
              path="/pallets/specialProcess/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? AddSpecialProcess
                  : Home
              }
            />
            <Route
              exact
              path="/stock"
              component={
                role === 'Administrador' || role === 'Vista' ? Stock : Home
              }
            />
            <Route
              exact
              path="/stockNails"
              component={
                role === 'Administrador' || role === 'Vista' ? StockNails : Home
              }
            />
            <Route
              exact
              path="/stockItems"
              component={
                role === 'Administrador' || role === 'Vista' ? StockItems : Home
              }
            />
            <Route
              exact
              path="/stockMaterial"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? StockMaterial
                  : Home
              }
            />
            <Route
              exact
              path="/stock/update/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? StockUpdate
                  : Home
              }
            />
            <Route
              exact
              path="/stockChanges"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? StockChanges
                  : Home
              }
            />
            <Route
              exact
              path="/stockHistory"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? StockHistory
                  : Home
              }
            />
            <Route
              exact
              path="/orders"
              component={
                role === 'Administrador' || role === 'Vista' ? Orders : Home
              }
            />
            <Route
              exact
              path="/orders/main/:id"
              component={
                role === 'Administrador' || role === 'Vista' ? MainOrder : Home
              }
            />
            <Route
              exact
              path="/orders/create"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? CreateOrder
                  : Home
              }
            />
            <Route
              exact
              path="/orders/update/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? UpdateOrder
                  : Home
              }
            />
            <Route
              exact
              path="/orders/create/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? OrderProduction
                  : Home
              }
            />
            <Route
              exact
              path="/orders/intern/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? OrderIntern
                  : Home
              }
            />
            <Route
              exact
              path="/orders/details/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? OrderDetails
                  : Home
              }
            />
            <Route
              exact
              path="/orders/shipments/:id"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? OrderShipments
                  : Home
              }
            />
            <Route
              exact
              path="/raws"
              component={
                role === 'Administrador' || role === 'Vista' ? Raws : Home
              }
            />
            <Route
              exact
              path="/raws/create"
              component={
                role === 'Administrador' || role === 'Vista' ? CreateRaw : Home
              }
            />
            <Route
              exact
              path="/raws/:id"
              component={
                role === 'Administrador' || role === 'Vista' ? UpdateRaw : Home
              }
            />
            <Route
              exact
              path="/users"
              component={
                role === 'Administrador' || role === 'Vista' ? Users : Home
              }
            />
            <Route
              exact
              path="/users/create"
              component={
                role === 'Administrador' || role === 'Vista' ? CreateUser : Home
              }
            />
            <Route
              exact
              path="/users/:id"
              component={
                role === 'Administrador' || role === 'Vista' ? UpdateUser : Home
              }
            />
            <Route
              exact
              path="/calendar"
              component={
                role === 'Administrador' || role === 'Vista' ? Calendar : Home
              }
            />
            <Route
              exact
              path="/calendar-production"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? CalendarProduction
                  : Home
              }
            />
            <Route
              exact
              path="/calendar-shipments"
              component={
                role === 'Administrador' || role === 'Vista'
                  ? CalendarShipments
                  : Home
              }
            />
            {/* Area Usuario */}
            <Route
              exact
              path="/orderProduction"
              component={OrderProductionList}
            />
            <Route
              exact
              path="/orderProduction/:orderId/:index"
              component={OrderProductionItem}
            />
            <Route exact path="/home-quality" component={HomeQuality} />
            <Route exact path="/home-accounting" component={HomeAccounting} />
            <Route
              exact
              path="/home-administration"
              component={HomeAdministration}
            />
            <Route exact path="/home-management" component={HomeManagement} />
            <Route exact path="/home-production" component={HomeProduction} />

            <Route exact path="/home-settings" component={SettingsHome} />
            {/* SEGUNDA ETAPA */}

            <Route exact path="/shipping-program" component={ShippingProgram} />
            <Route
              exact
              path="/shipping-program/stock"
              component={ShippingProgramStock}
            />
            <Route
              exact
              path="/shipping-program/supplier-delivery"
              component={SupplierDelivery}
            />
            <Route exact path="/shipping-program/sawn" component={Sawn} />
            <Route
              exact
              path="/shipping-program/assamble"
              component={Assamble}
            />
            <Route exact path="/shipping-program/stoves" component={Stoves} />
            <Route exact path="/format" component={Format1} />
            <Route exact path="/format/forcalftp022" component={Format2} />


            <Route exact path="/settings/type-material" component={TypeMaterial} />
            <Route exact path="/settings/type-wood" component={TypeWood} />


            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
