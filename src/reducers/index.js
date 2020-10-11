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
        user: action.payload,
      }
    case 'CREATE_CUSTOMER':
      return {
        ...state,
        customers: [...state.customers, action.payload],
      }
    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload),
      }
    default:
      return state
  }
}

export default reducer
