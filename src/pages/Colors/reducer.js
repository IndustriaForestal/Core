export default function reducer(state = {}, action) {
    switch (action.type) {
      case 'GET_COLORS':
        return {
          ...state,
          colors: action.payload.data,
        }
  
      default:
        return state
    }
  }
  