export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_WOOD':
      return {
        ...state,
        wood: action.payload.data,
      }

    default:
      return state
  }
}
