import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import Layout from '../layout'
import Home from '../pages/Home'
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
import Orders from '../pages/Orders'
import OrderProduction from '../pages/Orders/OrderProduction'
import CreateOrder from '../pages/Orders/CreateOrder'
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
import Calendar from '../pages/Calendar'

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
              component={role === 'Administrador' ? Customers : Home}
            />
            <Route
              exact
              path="/customers/create"
              component={role === 'Administrador' ? CreateCustomer : Home}
            />
            <Route
              exact
              path="/customers/:id"
              component={role === 'Administrador' ? EditCustomer : Home}
            />
            <Route
              exact
              path="/nails"
              component={role === 'Administrador' ? Nails : Home}
            />
            <Route
              exact
              path="/nails/create"
              component={role === 'Administrador' ? CreateNail : Home}
            />
            <Route
              exact
              path="/nails/:id"
              component={role === 'Administrador' ? UpdateNail : Home}
            />
            <Route
              exact
              path="/material"
              component={role === 'Administrador' ? Material : Home}
            />
            <Route
              exact
              path="/material/create"
              component={role === 'Administrador' ? CreateMaterial : Home}
            />
            <Route
              exact
              path="/material/:id"
              component={role === 'Administrador' ? UpdateMaterial : Home}
            />
            <Route
              exact
              path="/processes"
              component={role === 'Administrador' ? Processes : Home}
            />
            <Route
              exact
              path="/processes/create"
              component={role === 'Administrador' ? CreateProcess : Home}
            />
            <Route
              exact
              path="/processes/:id"
              component={role === 'Administrador' ? UpdateProcess : Home}
            />
            <Route
              exact
              path="/platforms"
              component={role === 'Administrador' ? Platforms : Home}
            />
            <Route
              exact
              path="/platforms/create"
              component={role === 'Administrador' ? CreatePlatform : Home}
            />
            <Route
              exact
              path="/platforms/:id"
              component={role === 'Administrador' ? UpdatePlatform : Home}
            />
            <Route
              exact
              path="/items"
              component={role === 'Administrador' ? Items : Home}
            />
            <Route
              exact
              path="/items/create"
              component={role === 'Administrador' ? CreateItem : Home}
            />
            <Route
              exact
              path="/items/:id"
              component={role === 'Administrador' ? UpdateItem : Home}
            />
            <Route
              exact
              path="/suppliers"
              component={role === 'Administrador' ? Suppliers : Home}
            />
            <Route
              exact
              path="/suppliers/create"
              component={role === 'Administrador' ? CreateSupplier : Home}
            />
            <Route
              exact
              path="/suppliers/:id"
              component={role === 'Administrador' ? UpdateSupplier : Home}
            />
            <Route
              exact
              path="/qualities"
              component={role === 'Administrador' ? Qualities : Home}
            />
            <Route
              exact
              path="/qualities/create"
              component={role === 'Administrador' ? CreateQuality : Home}
            />
            <Route
              exact
              path="/qualities/add/:id"
              component={role === 'Administrador' ? AddProcess : Home}
            />
            <Route
              exact
              path="/qualities/edit/:qualityId/:processId"
              component={role === 'Administrador' ? EditProcess : Home}
            />
            <Route
              exact
              path="/specialProcesses"
              component={role === 'Administrador' ? SpecialProcesses : Home}
            />
            <Route
              exact
              path="/specialProcesses/create"
              component={role === 'Administrador' ? CreateSpecialProcess : Home}
            />
            <Route
              exact
              path="/specialProcesses/:id"
              component={role === 'Administrador' ? UpdateSpecialProcess : Home}
            />
            <Route
              exact
              path="/pallets"
              component={role === 'Administrador' ? Pallets : Home}
            />
            <Route
              exact
              path="/pallets/create"
              component={role === 'Administrador' ? CreatePallet : Home}
            />
            <Route
              exact
              path="/pallets/:id"
              component={role === 'Administrador' ? UpdatePallet : Home}
            />
            <Route
              exact
              path="/pallets/add/:id"
              component={role === 'Administrador' ? AddNail : Home}
            />
            <Route
              exact
              path="/pallets/item/:id"
              component={role === 'Administrador' ? AddItem : Home}
            />
            <Route
              exact
              path="/pallets/platform/:id"
              component={role === 'Administrador' ? AddPlatform : Home}
            />
            <Route
              exact
              path="/pallets/specialProcess/:id"
              component={role === 'Administrador' ? AddSpecialProcess : Home}
            />
            <Route
              exact
              path="/stock"
              component={role === 'Administrador' ? Stock : Home}
            />
            <Route
              exact
              path="/stockNails"
              component={role === 'Administrador' ? StockNails : Home}
            />
            <Route
              exact
              path="/stockItems"
              component={role === 'Administrador' ? StockItems : Home}
            />
            <Route
              exact
              path="/stockMaterial"
              component={role === 'Administrador' ? StockMaterial : Home}
            />
            <Route
              exact
              path="/stock/update/:id"
              component={role === 'Administrador' ? StockUpdate : Home}
            />
            <Route
              exact
              path="/orders"
              component={role === 'Administrador' ? Orders : Home}
            />
            <Route
              exact
              path="/orders/create"
              component={role === 'Administrador' ? CreateOrder : Home}
            />
            <Route
              exact
              path="/orders/create/:id"
              component={role === 'Administrador' ? OrderProduction : Home}
            />
            <Route
              exact
              path="/orders/intern/:id"
              component={role === 'Administrador' ? OrderIntern : Home}
            />
            <Route
              exact
              path="/orders/details/:id"
              component={role === 'Administrador' ? OrderDetails : Home}
            />
            <Route
              exact
              path="/raws"
              component={role === 'Administrador' ? Raws : Home}
            />
            <Route
              exact
              path="/raws/create"
              component={role === 'Administrador' ? CreateRaw : Home}
            />
            <Route
              exact
              path="/raws/:id"
              component={role === 'Administrador' ? UpdateRaw : Home}
            />
            <Route
              exact
              path="/users"
              component={role === 'Administrador' ? Users : Home}
            />
            <Route
              exact
              path="/users/create"
              component={role === 'Administrador' ? CreateUser : Home}
            />
            <Route
              exact
              path="/users/:id"
              component={role === 'Administrador' ? UpdateUser : Home}
            />
            <Route
              exact
              path="/calendar"
              component={role === 'Administrador' ? Calendar : Home}
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
