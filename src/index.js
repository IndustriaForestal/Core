import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router'
import Cookies from 'js-cookie'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import App from './routes/app'
import initialState from './initialState'

const middleware = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)
const history = createBrowserHistory()

if (Cookies.get('id') && Cookies.get('token')) {
  initialState.loggedIn = true
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App loggedIn={initialState.loggedIn} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
