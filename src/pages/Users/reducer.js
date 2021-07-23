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
        roles: state.roles.filter(rol => rol.id !== action.payload),
      }
    case 'GET_ROLES':
      return {
        ...state,
        roles: action.payload.data,
        rol: null,
      }
    case 'GET_ROL':
      return {
        ...state,
        rol: action.payload,
      }
    case 'CREATE_ROL':
      return {
        ...state,
      }
    case 'UPDATE_ROL':
      return {
        ...state,
      }
    case 'DELETE_ROL':
      return {
        ...state,
        roles: state.roles.filter(rol => rol.id !== action.payload),
      }
    default:
      return state
  }
}
