export default function reducerCustomers(state = {}, action) {
  switch (action.type) {
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
      }
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
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
