import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import App from './routes/app'

const middleware = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
)
const history = createBrowserHistory()

if (sessionStorage.getItem('token')) {
  store.getState().reducerApp.loggedIn = true
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App loggedIn={store.getState().reducerApp.loggedIn} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
