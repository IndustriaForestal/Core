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
            <Route exact path="/nails/" component={CreateNail} />
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
