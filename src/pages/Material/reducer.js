export default function reducerCustomers(state = {}, action) {
  switch (action.type) {
    case 'GET_MATERIAL':
      return {
        ...state,
        material: action.payload.data,
      }
    case 'GET_MATERIAL_STATE':
      return {
        ...state,
        materialState: action.payload.data,
      }
    case 'GET_MATERIAL_ONE':
      return {
        ...state,
        materialOne: action.payload,
      }
    case 'CREATE_MATERIAL':
      return {
        ...state,
      }
    case 'UPDATE_MATERIAL':
      return {
        ...state,
      }
    case 'DELETE_MATERIAL':
      return {
        ...state,
        material: state.material.filter(
          materialOne => materialOne._id !== action.payload
        ),
      }
    default:
      return state
  }
}
