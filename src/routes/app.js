import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from '../layout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Customers from '../pages/Customers'
import CreateCustomer from '../pages/Customers/CreateCustomer'

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/customers" component={Customers} />
        <Route exact path="/customers/create" component={CreateCustomer} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
)

export default App
