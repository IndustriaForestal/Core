export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'GET_STOCK':
      return {
        ...state,
        stock: action.payload.data,
      }
    case 'CLEAN_STOCK':
      return {
        ...state,
        stock: [],
      }
    case 'GET_STOCK_2':
      return {
        ...state,
        stock2: action.payload.data,
      }
    case 'GET_SZ':
      return {
        ...state,
        stockZone: action.payload.data,
      }
    case 'GET_SZ_ITEMS':
      return {
        ...state,
        stockZoneItems: action.payload.data,
      }
    case 'GET_SZ_COMPLEMENTS':
      return {
        ...state,
        stockZoneComplements: action.payload.data,
      }
    case 'GET_SZ_SAWN':
      return {
        ...state,
        stockZoneSawn: action.payload.data,
      }
    case 'GET_SZ_RAWS':
      return {
        ...state,
        stockZoneRaws: action.payload.data,
      }
    case 'GET_SH':
      return {
        ...state,
        stockHistory: action.payload.data,
      }
    case 'GET_SH_ITEMS':
      return {
        ...state,
        stockHistoryItems: action.payload.data,
      }
    case 'GET_SH_NAILS':
      return {
        ...state,
        stockHistoryNails: action.payload.data,
      }
    case 'GET_SH_SAWN':
      return {
        ...state,
        stockHistorySawn: action.payload.data,
      }
    case 'GET_SH_RAWS':
      return {
        ...state,
        stockHistoryRaws: action.payload.data,
      }
    case 'GET_SH_SUPPLIERS':
      return {
        ...state,
        stockHistorySuppliers: action.payload.data,
      }
    default:
      return state
  }
}
