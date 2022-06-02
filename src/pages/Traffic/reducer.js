export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_TRAFFIC':
      return {
        ...state,
        traffic: action.payload.data,
      }
    case 'GET_TRAFFIC_BOXES':
      return {
        ...state,
        trafficBoxes: action.payload.data,
      }
    case 'GET_TRAFFIC_DRIVERS':
      return {
        ...state,
        trafficDrivers: action.payload.data,
      }
    case 'GET_TRAFFIC_FUEL':
      return {
        ...state,
        trafficFuel: action.payload.data,
      }
    case 'GET_TRAFFIC_TRUCKS':
      return {
        ...state,
        trafficTrucks: action.payload.data,
      }
    case 'GET_TRAFFIC_TRUCKS_BOXES':
      return {
        ...state,
        trafficTrucksBoxes: action.payload.data,
      }
    case 'GET_TRAFFIC_TYPES':
      return {
        ...state,
        trafficTypes: action.payload.data,
      }

    default:
      return state
  }
}
