import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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

const App = ({ loggedIn }) => {
  if (loggedIn) {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/customers" component={Customers} />
            <Route exact path="/customers/create" component={CreateCustomer} />
            <Route exact path="/customers/:id" component={EditCustomer} />
            <Route exact path="/nails" component={Nails} />
            <Route exact path="/nails/create" component={CreateNail} />
            <Route exact path="/nails/:id" component={UpdateNail} />
            <Route exact path="/material" component={Material} />
            <Route exact path="/material/create" component={CreateMaterial} />
            <Route exact path="/material/:id" component={UpdateMaterial} />
            <Route exact path="/processes" component={Processes} />
            <Route exact path="/processes/create" component={CreateProcess} />
            <Route exact path="/processes/:id" component={UpdateProcess} />
            <Route exact path="/platforms" component={Platforms} />
            <Route exact path="/platforms/create" component={CreatePlatform} />
            <Route exact path="/platforms/:id" component={UpdatePlatform} />
            <Route exact path="/items" component={Items} />
            <Route exact path="/items/create" component={CreateItem} />
            <Route exact path="/items/:id" component={UpdateItem} />
            <Route exact path="/suppliers" component={Suppliers} />
            <Route exact path="/suppliers/create" component={CreateSupplier} />
            <Route exact path="/suppliers/:id" component={UpdateSupplier} />
            <Route exact path="/qualities" component={Qualities} />
            <Route exact path="/qualities/create" component={CreateQuality} />
            <Route exact path="/qualities/add/:id" component={AddProcess} />
            <Route exact path="/qualities/edit/:qualityId/:processId" component={EditProcess} />
            <Route exact path="/specialProcesses" component={SpecialProcesses} />
            <Route exact path="/specialProcesses/create" component={CreateSpecialProcess} />
            <Route exact path="/specialProcesses/:id" component={UpdateSpecialProcess} />
            <Route exact path="/pallets" component={Pallets} />
            <Route exact path="/pallets/create" component={CreatePallet} />
            <Route exact path="/pallets/:id" component={UpdatePallet} />
            <Route exact path="/pallets/add/:id" component={AddNail} />
            <Route exact path="/pallets/item/:id" component={AddItem} />
            <Route exact path="/pallets/platform/:id" component={AddPlatform} />
            <Route exact path="/pallets/specialProcess/:id" component={AddSpecialProcess} />

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
