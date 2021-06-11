const reducer = (
  state = {
    topbar: { title: 'Demo', menu: { Menu1: '/' } },
    loggedIn: false,
    wraper: false,
    user: {
      user: sessionStorage.getItem('user'),
      name: sessionStorage.getItem('name'),
      id: sessionStorage.getItem('id'),
      role: sessionStorage.getItem('role'),
    },
    units: false,
  },
  action
) => {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        topbar: action.payload,
      }
    case 'SET_WRAPER':
      return {
        ...state,
        wraper: action.payload,
      }
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload,
      }
    case 'SET_UNITS':
      return {
        ...state,
        units: action.payload,
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loggedIn: true,
      }
    case 'LOG_OUT':
      return {
        ...state,
        loggedIn: false,
      }
    default:
      return state
  }
}

export default reducer
