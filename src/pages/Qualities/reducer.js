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
          quality => quality.id !== action.payload
        ),
      }
    case 'GET_QUALITIES_PROCESSES':
      return {
        ...state,
        qualitiesProcesses: action.payload.data,
      }
    case 'CREATE_QUALITY_PROCESS':
      return {
        ...state,
      }
    case 'UPDATE_QUALITY_PROCESS':
      return {
        ...state,
      }
    case 'DELETE_QUALITY_PROCESS':
      return {
        ...state,
        qualitiesProcesses: state.qualitiesProcesses.filter(
          quality => quality.id !== action.payload
        ),
      }
    default:
      return state
  }
}
