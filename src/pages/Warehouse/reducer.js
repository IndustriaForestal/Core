export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_WAREHOUSE_ITEMS':
      return {
        ...state,
        warehouseItems: action.payload.data,
      }
    case 'GET_WAREHOUSE_STOCK':
      return {
        ...state,
        warehouseStock: action.payload.data,
      }
    case 'GET_WAREHOUSE_HISTORY':
      return {
        ...state,
        warehouseHistory: action.payload.data,
      }
    case 'GET_WAREHOUSE_STOCK_ZONE':
      return {
        ...state,
        warehouseStockZone: action.payload.data,
      }

    default:
      return state
  }
}
