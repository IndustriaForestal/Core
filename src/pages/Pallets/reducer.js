export default function reducer(state = { newPallet: [] }, action) {
  switch (action.type) {
    case 'GET_PALLETS':
      return {
        ...state,
        pallets: action.payload.data,
      }
    case 'GET_PALLET':
      return {
        ...state,
        pallet: action.payload,
      }
    case 'CREATE_PALLET':
      return {
        ...state,
      }
    case 'UPDATE_PALLET':
      return {
        ...state,
      }
    case 'DELETE_PALLET':
      return {
        ...state,
        pallets: state.pallets.filter(pallet => pallet._id !== action.payload),
      }
    case 'ADD_NAIL_PALLET':
      return {
        ...state,
      }
    case 'ADD_ITEM_PALLET':
      return {
        ...state,
      }
    case 'ADD_PLATFORM_PALLET':
      return {
        ...state,
      }
    case 'DELETE_PLATFORM_PALLET':
      return {
        ...state,
        pallets: [],
      }

    case 'CREATE_NEW_PALLET':
      return {
        ...state,
        newPallet: action.payload,
      }
    case 'CLEAN_NEW_PALLET':
      return {
        ...state,
        newPallet: {},
        itemsList: [],
      }
    case 'UPDATE_NEW_PALLET':
      return {
        ...state,
        newPallet: action.payload[0],
      }
   
    default:
      return state
  }
}
