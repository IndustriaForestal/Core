import Cookies from 'js-cookie'

const initialState = {
  products: [],
  customers: [],
  topbar: { title: 'Demo', menu: { Menu1: '/' } },
  loggedIn: false,
  wraper: false,
  role: Cookies.get('role'),
}

export default initialState
