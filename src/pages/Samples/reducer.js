export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_SAMPLES':
      return {
        ...state,
        samples: action.payload.data,
      }
    case 'GET_SAMPLES_COLUMNS':
      return {
        ...state,
        samplesColumns: action.payload.data,
      }
    case 'GET_SAMPLES_DATA':
      return {
        ...state,
        samplesData: action.payload.data,
      }

    default:
      return state
  }
}
