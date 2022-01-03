export default function reducerCustomers(state = {}, action) {
  switch (action.type) {
    case 'GET_PURCHASE_ORDERS':
      return {
        ...state,
        purchaseOrders: action.payload.data,
      }
    case 'GET_PURCHASE_ORDERS_SUPPLIERS':
      return {
        ...state,
        purchaseOrdersSuppliers: action.payload.data,
      }

    default:
      return state
  }
}
