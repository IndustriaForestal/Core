export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_SUPPLIERS':
      return {
        ...state,
        suppliers: action.payload.data,
      }
    case 'GET_SUPPLIER':
      return {
        ...state,
        supplier: action.payload,
      }
    case 'CREATE_SUPPLIER':
      return {
        ...state,
      }
    case 'UPDATE_SUPPLIER':
      return {
        ...state,
      }
    case 'DELETE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.filter(
          supplier => supplier.id !== action.payload
        ),
      }
    default:
      return state
  }
}
