export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_PLANTS':
      return {
        ...state,
        plants: action.payload.data,
      }
    case 'GET_ZONES':
      return {
        ...state,
        zones: action.payload.data,
      }
    case 'GET_SUBZONES':
      return {
        ...state,
        subzones: action.payload.data,
      }
    case 'GET_WORKSTATIONS':
      return {
        ...state,
        workstations: action.payload.data,
      }
    
    default:
      return state
  }
}
