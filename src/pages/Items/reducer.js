export default function reducer(state = { itemsList: [] }, action) {
  switch (action.type) {
    case 'GET_ITEMS':
      return {
        ...state,
        items: action.payload.data,
        item: null,
      }
    case 'GET_ITEM':
      return {
        ...state,
        item: action.payload,
      }
    case 'CREATE_ITEM':
      return {
        ...state,
      }
    case 'UPDATE_ITEM':
      return {
        ...state,
      }
    case 'UPDATE_ITEMLIST_ONE':
      return {
        ...state,
      }
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      }

    case 'GET_ITEMS_TYPE':
      return {
        ...state,
        itemsType: action.payload.data,
      }
    case 'GET_ITEMS_LIST':
      return {
        ...state,
        itemsList: action.payload,
      }
    case 'CREATE_ITEMS_LIST':
      return {
        ...state,
        itemsList: [...state.itemsList, action.payload],
      }
    case 'DELETE_ITEMS_LIST':
      return {
        ...state,
        itemsList: state.itemsList.filter(
          (item, index) => index !== action.payload
        ),
      }
    default:
      return state
  }
}
