const reducer = (
  state = {
    topbar: { title: '', menu: { Regresar: '/' } },
    loggedIn: false,
    wraper: false,
    user: {
      user: sessionStorage.getItem('user'),
      name: sessionStorage.getItem('name'),
      id: sessionStorage.getItem('id'),
      role: sessionStorage.getItem('role'),
      accessScreen: JSON.parse(sessionStorage.getItem('accessScreen')),
      workstation_id: sessionStorage.getItem('workstation_id'),
    },
    units: false,
    modal: { state: false },
    modalReview: { state: false },
  },
  action
) => {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        topbar: action.payload,
      }
    case 'SET_MODAL':
      return {
        ...state,
        modal: action.payload,
      }
    case 'SET_MODAL_REVIEW':
      return {
        ...state,
        modalReview: action.payload,
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
