import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
import CustomersTimes from '../pages/Customers/CustomerTimes'
import Material from '../pages/Material'
import Processes from '../pages/Processes'
import ProcessesPallets from '../pages/Processes/ProcessesPallets'
import ProcessesItems from '../pages/Processes/ProcessesItems'
import ProcessesReject from '../pages/Processes/ProcessesReject'
import Items from '../pages/Items'
import Suppliers from '../pages/Suppliers'
import Qualities from '../pages/Qualities'
import QualitiesProcesses from '../pages/Qualities/QualitiesProcesses'
import CreateQuality from '../pages/Qualities/CreateQuality'
import AddProcess from '../pages/Qualities/AddProcess'
import SpecialProcesses from '../pages/SpecialProcesses'
import Pallets from '../pages/Pallets'
import Stock from '../pages/Stock'
import StockItems from '../pages/Stock/StockItems'
import StockMaterial from '../pages/Stock/StockMaterial'
import StockNails from '../pages/Stock/StockNails'
import StockUpdate from '../pages/Stock/StockUpdate'
import StockChanges from '../pages/Stock/StockChanges'
import StockHistory from '../pages/Stock/StockHistory'
import StockSawn from '../pages/Stock/StockSawn'
import Orders from '../pages/Orders'
import OrdersStock from '../pages/Orders/OrderStock'
import OrdersStockItems from '../pages/Orders/OrderStockItems'
import OrdersStockSawn from '../pages/Orders/OrderStockSawn'
import OrderEstimated from '../pages/Orders/OrderEstimated'
import OrderPreview from '../pages/Orders/OrderPreview'

import CreateOrder from '../pages/Orders/CreateOrder'
import Raws from '../pages/Raws'
import CreateRaw from '../pages/Raws/CreateRaw'
import UpdateRaw from '../pages/Raws/UpdateRaw'
import Users from '../pages/Users'
import CreateUser from '../pages/Users/CreateUser'
import UpdateUser from '../pages/Users/UpdateUser'

import SettingsHome from '../pages/Home/Settings'
import ItemType from '../pages/Items/ItemType'
import Wood from '../pages/Wood'
import Zones from '../pages/Zones'
import CreatePlant from '../pages/Zones/CreatePlant'
import CreateSubzone from '../pages/Zones/CreateSubzone'
import CreateZone from '../pages/Zones/CreateZone'
import CreateWorkStation from '../pages/Zones/CreateWorkStation'
import Complements from '../pages/Complements'

const App = ({ loggedIn }) => {
  if (loggedIn) {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/customers" component={Customers} />
            <Route exact path="/customers-times" component={CustomersTimes} />

            <Route exact path="/complements" component={Complements} />

            <Route exact path="/material" component={Material} />

            <Route exact path="/processes" component={Processes} />
            <Route
              exact
              path="/processes/pallets"
              component={ProcessesPallets}
            />
            <Route exact path="/processes/items" component={ProcessesItems} />
            <Route exact path="/processes/reject" component={ProcessesReject} />

            <Route exact path="/items" component={Items} />

            <Route exact path="/suppliers" component={Suppliers} />

            <Route exact path="/qualities" component={Qualities} />
            <Route
              exact
              path="/qualities/processes"
              component={QualitiesProcesses}
            />
            <Route exact path="/qualities/create" component={CreateQuality} />
            <Route exact path="/qualities/add/:id" component={AddProcess} />

            <Route
              exact
              path="/specialProcesses"
              component={SpecialProcesses}
            />

            <Route exact path="/pallets" component={Pallets} />

            <Route exact path="/stock" component={Stock} />
            <Route exact path="/stockNails" component={StockNails} />
            <Route exact path="/stockItems" component={StockItems} />
            <Route exact path="/stockMaterial" component={StockMaterial} />
            <Route exact path="/stockSawn" component={StockSawn} />
            <Route exact path="/stock/update/:id" component={StockUpdate} />
            <Route exact path="/stockChanges" component={StockChanges} />
            <Route exact path="/stockHistory" component={StockHistory} />

            <Route exact path="/orders" component={Orders} />
            <Route exact path="/orders/create" component={CreateOrder} />
            <Route exact path="/orders/stock" component={OrdersStock} />
            <Route
              exact
              path="/orders/stock-items"
              component={OrdersStockItems}
            />
            <Route
              exact
              path="/orders/stock-sawn"
              component={OrdersStockSawn}
            />
            <Route exact path="/orders/estimated" component={OrderEstimated} />
            <Route exact path="/orders/preview" component={OrderPreview} />

            {/* <Route exact path="/orders/main/:id" component={MainOrder} />
            <Route exact path="/orders/update/:id" component={UpdateOrder} />
            <Route
              exact
              path="/orders/create/:id"
              component={OrderProduction}
            />
            <Route exact path="/orders/intern/:id" component={OrderIntern} />
            <Route exact path="/orders/details/:id" component={OrderDetails} />
            <Route
              exact
              path="/orders/shipments/:id"
              component={OrderShipments}
            /> */}

            <Route exact path="/raws" component={Raws} />
            <Route exact path="/raws/create" component={CreateRaw} />
            <Route exact path="/raws/:id" component={UpdateRaw} />

            <Route exact path="/users" component={Users} />
            <Route exact path="/users/create" component={CreateUser} />
            <Route exact path="/users/:id" component={UpdateUser} />

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

            <Route exact path="/items/type" component={ItemType} />
            <Route exact path="/wood" component={Wood} />
            <Route exact path="/zones" component={Zones} />
            <Route exact path="/zones/createzone" component={CreateZone} />
            <Route
              exact
              path="/zones/createsubzone"
              component={CreateSubzone}
            />
            <Route exact path="/zones/createplant" component={CreatePlant} />
            <Route
              exact
              path="/zones/workstation"
              component={CreateWorkStation}
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
