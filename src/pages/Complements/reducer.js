export default function reducerCustomers(state = {}, action) {
  switch (action.type) {
    case 'GET_COMPLEMENTS':
      return {
        ...state,
        complements: action.payload.data,
      }
    case 'GET_COMPLEMENTS_PALLETS':
      return {
        ...state,
        complementsPallets: action.payload.data,
      }
    case 'GET_COMPLEMENT':
      return {
        ...state,
        complement: action.payload,
      }
    case 'CREATE_COMPLEMENT':
      return {
        ...state,
      }
    case 'UPDATE_COMPLEMENT':
      return {
        ...state,
      }
    
    case 'UPDATE_NEW_PALLET_COMPLEMENTS':
      return {
        ...state,
        complementsList: action.payload,
      }
    case 'DELETE_COMPLEMENT':
      return {
        ...state,
        complements: state.complements.filter(
          complement => complement.id !== action.payload
        ),
      }
    default:
      return state
  }
}
