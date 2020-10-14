const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        topbar: action.payload,
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
    case 'GET_CUSTOMERS':
      return {
        ...state,
        customers: action.payload.data,
      }
    case 'GET_CUSTOMER':
      return {
        ...state,
        customer: action.payload,
      }
    case 'CREATE_CUSTOMER':
      return {
        ...state,
        customers: [...state.customers, action.payload],
      }
    case 'UPDATE_CUSTOMER':
      return {
        ...state
      }
    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer._id !== action.payload
        ),
      }

    default:
      return state
  }
}

export default reducer
