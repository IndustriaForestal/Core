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
import OrdersCustomers from '../pages/Orders/Customers'
import OrdersCustomersDetails from '../pages/Orders/CustomersDetails'
import OrdersCustomersCreate from '../pages/Orders/CustomersCreate'
import OrdersStock from '../pages/Orders/OrderStock'
import OrdersStockItems from '../pages/Orders/OrderStockItems'
import OrdersStockSawn from '../pages/Orders/OrderStockSawn'
import OrderEstimated from '../pages/Orders/OrderEstimated'
import OrderPreview from '../pages/Orders/OrderPreview'
import OrderDetails from '../pages/Orders/OrderDetails'

import CreateOrder from '../pages/Orders/CreateOrder'
import CreateOrderNew from '../pages/Orders/CreateOrderNew'
import Raws from '../pages/Raws'
import CreateRaw from '../pages/Raws/CreateRaw'
import UpdateRaw from '../pages/Raws/UpdateRaw'

import Users from '../pages/Users'
import CreateUser from '../pages/Users/CreateUser'
import UpdateUser from '../pages/Users/UpdateUser'
import UserRoles from '../pages/Users/Roles'
import UserScreens from '../pages/Users/Screens'
import UserNotifications from '../pages/Users/Notifications'

import SettingsHome from '../pages/Home/Settings'
import ItemType from '../pages/Items/ItemType'
import Wood from '../pages/Wood'
import Zones from '../pages/Zones'
import CreatePlant from '../pages/Zones/CreatePlant'
import CreateSubzone from '../pages/Zones/CreateSubzone'
import CreateZone from '../pages/Zones/CreateZone'
import CreateWorkStation from '../pages/Zones/CreateWorkStation'
import Complements from '../pages/Complements'
import Calendar from '../pages/Calendar'
import Dashboard from '../pages/Dashboard'
import DashboardProcess from '../pages/Dashboard/Process'
import DashboardStock from '../pages/Dashboard/Stock'
import DashboardStockDetaills from '../pages/Dashboard/StockDetaills'
import DashboardStockReview from '../pages/Dashboard/StockReview'
import DashboardReject from '../pages/Dashboard/Reject'
import DashboardRejectProduction from '../pages/Dashboard/Reject/Production'
import DashboardReview from '../pages/Dashboard/Review'
import DashboardReviewProduction from '../pages/Dashboard/ReviewProduction'
import DashboardHistory from '../pages/Dashboard/History'
import DashboardKanban from '../pages/Dashboard/Kanban'
import DashboardReviewHome from '../pages/Dashboard/DashboardReview'
import DashboardReviewHomeHistory from '../pages/Dashboard/HistoryQuality'
import DashboardHistoryQualityProduction from '../pages/Dashboard/HistoryQualityProduction'

import DashboardStoves from '../pages/Dashboard/DashboardStove'
import DashboardStovesHistory from '../pages/Dashboard/DashboardStoveHistory'

import StockSuppliers from '../pages/Stock/StockSuppliers'
import StockSuppliersHistory from '../pages/Stock/StockSuppliersHistory'

import PurchaseOrder from '../pages/PurchaseOrder'

import Schedule from '../pages/Schedule'
import Colors from '../pages/Colors'

import Samples from '../pages/Samples'
import SamplesNew from '../pages/Samples/New'
import CreateSamples from '../pages/Samples/Samples'
import ColumnsSamples from '../pages/Samples/Columns'

import Reports from '../pages/Reports'
import ReportsNew from '../pages/Reports/New'
import CreateReports from '../pages/Reports/Reports'
import ColumnsReports from '../pages/Reports/Columns'

import Warehouse from '../pages/Warehouse'
import WarehouseAdd from '../pages/Warehouse/Add'
import WarehouseHistory from '../pages/Warehouse/History'
import WarehouseChanges from '../pages/Warehouse/Changes'

import Traffic from '../pages/Traffic'
import TrafficBoxes from '../pages/Traffic/Boxes'
import TrafficDrivers from '../pages/Traffic/Drivers'
import TrafficFuel from '../pages/Traffic/Fuel'
import TrafficTrucks from '../pages/Traffic/Trucks'
import TrafficTrucksBoxes from '../pages/Traffic/TrucksBoxes'
import TrafficTypes from '../pages/Traffic/Types'


import StockReport from '../pages/Stock/StockReports'
import StockReportItems from '../pages/Stock/StockReports/Items'
import StockReportPallets from '../pages/Stock/StockReports/Pallets'
import StockReportRaws from '../pages/Stock/StockReports/Raws'
import StockReportFirewood from '../pages/Stock/StockReports/Firewood'

const App = ({ loggedIn }) => {
  if (loggedIn) {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />


            <Route exact path="/traffic" component={Traffic} />
            <Route exact path="/traffic-boxes" component={TrafficBoxes} />
            <Route exact path="/traffic-drivers" component={TrafficDrivers} />
            <Route exact path="/traffic-fuel" component={TrafficFuel} />
            <Route exact path="/traffic-trucks" component={TrafficTrucks} />
            <Route exact path="/traffic-trucks-boxes" component={TrafficTrucksBoxes} />
            <Route exact path="/traffic-types" component={TrafficTypes} />
            
            <Route exact path="/colors" component={Colors} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route
              exact
              path="/dashboard/processes"
              component={DashboardProcess}
            />
            <Route
              exact
              path="/dashboard/stoves"
              component={DashboardStoves}
            />
            <Route
              exact
              path="/dashboard/stoves/history"
              component={DashboardStovesHistory}
            />
            <Route
              exact
              path="/dashboard/processes/:id"
              component={DashboardReview}
            />
            <Route
              exact
              path="/dashboard/production/:id"
              component={DashboardReviewProduction}
            />
            <Route
              exact
              path="/dashboard/stock"
              component={DashboardStock}
            />
            <Route
              exact
              path="/dashboard/stock-review/:id"
              component={DashboardStockReview}
            />
            <Route
              exact
              path="/dashboard/stock/:id"
              component={DashboardStockDetaills}
            />
            <Route
              exact
              path="/dashboard/reject"
              component={DashboardReject}
            />
            <Route
              exact
              path="/dashboard/reject/:id"
              component={DashboardRejectProduction}
            />
            <Route
              exact
              path="/dashboard/history"
              component={DashboardHistory}
            />
            <Route
              exact
              path="/dashboard/history/production"
              component={DashboardHistoryQualityProduction}
            />
            <Route
              exact
              path="/dashboard/kanban"
              component={DashboardKanban}
            />
            <Route
              exact
              path="/dashboard/review-home"
              component={DashboardReviewHome}
            />
            <Route
              exact
              path="/dashboard/review-home/history"
              component={DashboardReviewHomeHistory}
            />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/customers" component={Customers} />
            <Route
              exact
              path="/customers-times"
              component={CustomersTimes}
            />

            <Route
              exact
              path="/complements"
              component={Complements}
            />

            <Route exact path="/material" component={Material} />

            <Route exact path="/processes" component={Processes} />
            <Route
              exact
              path="/processes/pallets"
              component={ProcessesPallets}
            />
            <Route
              exact
              path="/processes/items"
              component={ProcessesItems}
            />
            <Route
              exact
              path="/processes/reject"
              component={ProcessesReject}
            />

            <Route exact path="/items" component={Items} />

            <Route exact path="/suppliers" component={Suppliers} />

            <Route exact path="/qualities" component={Qualities} />
            <Route
              exact
              path="/qualities/processes"
              component={QualitiesProcesses}
            />
            <Route
              exact
              path="/qualities/create"
              component={CreateQuality}
            />
            <Route
              exact
              path="/qualities/add/:id"
              component={AddProcess}
            />

            <Route
              exact
              path="/specialProcesses"
              component={SpecialProcesses}
            />

            <Route exact path="/pallets" component={Pallets} />

            <Route exact path="/stock" component={Stock} />
            <Route exact path="/stock/report" component={StockReport} />
            <Route exact path="/stock/report/items" component={StockReportItems} />
            <Route exact path="/stock/report/pallets" component={StockReportPallets} />
            <Route exact path="/stock/report/raws" component={StockReportRaws} />
            <Route exact path="/stock/report/firewood" component={StockReportFirewood} />
            <Route exact path="/stockNails" component={StockNails} />
            <Route exact path="/stockItems" component={StockItems} />
            <Route
              exact
              path="/stockMaterial"
              component={StockMaterial}
            />
            <Route exact path="/stockSawn" component={StockSawn} />
            <Route
              exact
              path="/stock/update/:id"
              component={StockUpdate}
            />
            <Route
              exact
              path="/stockChanges"
              component={StockChanges}
            />
            <Route
              exact
              path="/stockSuppliers"
              component={StockSuppliers}
            />
            <Route
              exact
              path="/stockSuppliersHistory"
              component={StockSuppliersHistory}
            />
            <Route
              exact
              path="/stockHistory"
              component={StockHistory}
            />

            <Route
              exact
              path="/orders-customers"
              component={OrdersCustomers}
            />
            <Route
              exact
              path="/orders-customers/create"
              component={OrdersCustomersCreate}
            />
            <Route
              exact
              path="/orders-customers/:id"
              component={OrdersCustomersDetails}
            />
            <Route exact path="/orders" component={Orders} />
            <Route
              exact
              path="/orders/create"
              component={CreateOrder}
            />
            <Route
              exact
              path="/orders/create/:id"
              component={CreateOrderNew}
            />
            <Route
              exact
              path="/orders/stock"
              component={OrdersStock}
            />
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
            <Route
              exact
              path="/orders/estimated"
              component={OrderEstimated}
            />
            <Route
              exact
              path="/orders/preview"
              component={OrderPreview}
            />
            <Route
              exact
              path="/orders-details/:id"
              component={OrderDetails}
            />

            <Route exact path="/raws" component={Raws} />
            <Route exact path="/raws/create" component={CreateRaw} />
            <Route exact path="/raws/:id" component={UpdateRaw} />

            <Route exact path="/users" component={Users} />
            <Route
              exact
              path="/users/create"
              component={CreateUser}
            />
            <Route exact path="/users/roles" component={UserRoles} />
            <Route
              exact
              path="/users/screens"
              component={UserScreens}
            />
            <Route
              exact
              path="/users/notifications"
              component={UserNotifications}
            />
            <Route exact path="/users/:id" component={UpdateUser} />

            <Route
              exact
              path="/home-quality"
              component={HomeQuality}
            />
            <Route
              exact
              path="/home-accounting"
              component={HomeAccounting}
            />
            <Route
              exact
              path="/home-administration"
              component={HomeAdministration}
            />
            <Route
              exact
              path="/home-management"
              component={HomeManagement}
            />
            <Route
              exact
              path="/home-production"
              component={HomeProduction}
            />
            <Route
              exact
              path="/home-settings"
              component={SettingsHome}
            />

            <Route exact path="/items/type" component={ItemType} />
            <Route exact path="/wood" component={Wood} />
            <Route exact path="/zones" component={Zones} />
            <Route
              exact
              path="/zones/createzone"
              component={CreateZone}
            />
            <Route
              exact
              path="/zones/createsubzone"
              component={CreateSubzone}
            />
            <Route
              exact
              path="/zones/createplant"
              component={CreatePlant}
            />
            <Route
              exact
              path="/zones/workstation"
              component={CreateWorkStation}
            />
            <Route
              exact
              path="/purchase-orders"
              component={PurchaseOrder}
            />
            <Route exact path="/samples" component={Samples} />
            <Route exact path="/samples/:id" component={SamplesNew} />
            <Route
              exact
              path="/samples-config"
              component={CreateSamples}
            />
            <Route
              exact
              path="/samples-columns"
              component={ColumnsSamples}
            />
            <Route exact path="/reports" component={Reports} />
            <Route exact path="/reports/:id" component={ReportsNew} />
            <Route
              exact
              path="/reports-config"
              component={CreateReports}
            />
            <Route
              exact
              path="/reports-columns"
              component={ColumnsReports}
            />
            <Route exact path="/warehouse" component={Warehouse} />
            <Route
              exact
              path="/warehouse/add"
              component={WarehouseAdd}
            />
            <Route
              exact
              path="/warehouse/history"
              component={WarehouseHistory}
            />
            <Route
              exact
              path="/warehouse/changes"
              component={WarehouseChanges}
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
