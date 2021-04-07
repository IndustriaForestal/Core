import Cookies from 'js-cookie'

const initialState = {
  products: [],
  customers: [],
  topbar: { title: 'Demo', menu: { Menu1: '/' } },
  loggedIn: false,
  wraper: false,
  role: Cookies.get('role'),
  wood: [
    {
      id: 1,
      name: 'pino',
    },
  ],
  itemsType: [
    {
      id: 1,
      name: 'Tabla',
    },
    {
      id: 2,
      name: 'Taquete',
    },
    {
      id: 3,
      name: 'Polin',
    },
    {
      id: 4,
      name: 'Clavo',
    },
  ],
  itemsList: [],
  newPallet: [],
}

export default initialState
