export default function reducer(
  state = {
    reportsParams: [],
  },
  action
) {
  switch (action.type) {
    case 'GET_REPORTS':
      return {
        ...state,
        reports: action.payload.data,
      }
    case 'GET_REPORTS_PARAMS':
      return {
        ...state,
        reportsParams: action.payload.data,
      }
    case 'GENERATE_REPORT':
      return {
        ...state,
        reportsData: action.payload.data,
      }
    case 'CLEAR_REPORT':
      return {
        ...state,
        reportsData: [],
      }

    default:
      return state
  }
}
