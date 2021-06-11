export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_QUALITIES':
      return {
        ...state,
        qualities: action.payload.data,
      }
    case 'GET_QUALITY':
      return {
        ...state,
        quality: action.payload,
      }
    case 'CREATE_QUALITY':
      return {
        ...state,
      }
    case 'UPDATE_QUALITY':
      return {
        ...state,
      }
    case 'DELETE_QUALITY':
      return {
        ...state,
        qualities: state.qualities.filter(
          quality => quality._id !== action.payload
        ),
      }
    case 'ADD_PROCESS_QUALITY':
      return {
        ...state,
      }
    // ! Hack para regresar las calidades al state (actions ln 36)
    case 'DELETE_PROCESS_QUALITY':
      return {
        ...state,
      }
    default:
      return state
  }
}
