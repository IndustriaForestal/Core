export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_SCHEDULE':
      return {
        ...state,
        schedule: action.payload.data,
      }
    case 'GET_SCHEDULE_CONFIG':
      return {
        ...state,
        scheduleConfig: action.payload.data,
      }
    case 'GET_SCHEDULE_HOLIDAYS':
      return {
        ...state,
        scheduleHolidays: action.payload.data,
      }
    case 'UPDATE_SCHEDULE':
      return {
        ...state,
        process: action.payload,
      }
    case 'CREATE_HOLIDAY':
      return {
        ...state,
      }

    default:
      return state
  }
}
