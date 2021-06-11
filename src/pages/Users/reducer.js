export default function reducerProducts(state = [], action) {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload.data,
        user: null,
      }
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'CREATE_USER':
      return {
        ...state,
      }
    case 'UPDATE_USER':
      return {
        ...state,
      }
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
      }
    default:
      return state
  }
}
