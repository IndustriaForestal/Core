export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_RAWS':
      return {
        ...state,
        raws: action.payload.data,
      }
    case 'GET_RAW':
      return {
        ...state,
        raw: action.payload,
      }
    case 'CREATE_RAW':
      return {
        ...state,
      }
    case 'UPDATE_RAW':
      return {
        ...state,
      }
    case 'DELETE_RAW':
      return {
        ...state,
        raws: state.raws.filter(raw => raw._id !== action.payload),
      }
    default:
      return state
  }
}
