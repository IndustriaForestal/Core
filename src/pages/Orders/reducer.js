export default function reducer(
  state = {
    order: {},
  },
  action
) {
  switch (action.type) {
    case 'GET_ORDERS':
      return {
        ...state,
        orders: action.payload.data,
      }
    case 'GET_ORDERS_PRODUCTION':
      return {
        ...state,
        ordersProduction: action.payload.data,
      }
    case 'GET_ORDERS_REQUERIMENT':
      return {
        ...state,
        ordersRequeriment: action.payload.data,
      }
    case 'GET_ORDERS_REJECT':
      return {
        ...state,
        ordersReject: action.payload.data,
      }
    case 'GET_ORDER':
      return {
        ...state,
        order: action.payload,
      }
    case 'CREATE_ORDER':
      return {
        ...state,
      }
    case 'UPDATE_ORDER':
      return {
        ...state,
      }
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
      }
    case 'ORDER_SAVE_PALLETS':
      return {
        ...state,
        order: action.payload,
      }
    case 'ORDER_NON_STAGE':
      return {
        ...state,
        order: {
          ...state.order,
          pallets: state.order.pallets.map(pallet => {
            if (pallet.pallet_id === action.payload.id) {
              return {
                ...pallet,
                non_stage: action.payload.stage,
              }
            } else {
              return pallet
            }
          }),
        },
      }
    case 'ORDER_CHECK_PALLETS':
      return {
        ...state,
        order: {
          ...state.order,
          pallets: state.order.pallets.map(pallet => {
            if (pallet.pallet_id === action.payload.id) {
              return {
                ...pallet,
                check: action.payload.check,
                check_type: action.payload.state,
                check_stage: action.payload.stage,
              }
            } else {
              return pallet
            }
          }),
        },
      }
    case 'ORDER_PALLET_STOCK':
      return {
        ...state,
        order: {
          ...state.order,
          pallets: state.order.pallets.map(pallet => {
            if (pallet.pallet_id === action.payload.id) {
              if (action.payload.supplier) {
                return {
                  ...pallet,
                  check: action.payload.check,
                  check_type: action.payload.state,
                  check_stage: action.payload.stage,
                  amount_stock_supplier: action.payload.amount,
                }
              } else {
                return {
                  ...pallet,
                  check: action.payload.check,
                  check_type: action.payload.state,
                  check_stage: action.payload.stage,
                  amount_stock: action.payload.amount,
                }
              }
            } else {
              return pallet
            }
          }),
        },
      }
    case 'ORDER_PALLET_ITEM':
      return {
        ...state,
        order: {
          ...state.order,
          pallets: state.order.pallets.map(pallet => {
            if (pallet.pallet_id === action.payload.id) {
              if (action.payload.supplier) {
                return {
                  ...pallet,
                  check: action.payload.check,
                  check_type: action.payload.state,
                  check_stage: action.payload.stage,
                  amount_items_supplier: [
                    ...pallet.amount_items_supplier,
                    {
                      id: action.payload.itemId,
                      amount: action.payload.amount,
                      check_type: action.payload.state,
                    },
                  ],
                }
              } else {
                return {
                  ...pallet,
                  check: action.payload.check,
                  check_type: action.payload.state,
                  check_stage: action.payload.stage,
                  amount_items: [
                    ...pallet.amount_items,
                    {
                      id: action.payload.itemId,
                      amount: action.payload.amount,
                      check_type: action.payload.state,
                    },
                  ],
                }
              }
            } else {
              return pallet
            }
          }),
        },
      }
    case 'ORDER_PALLET_SAWN':
      return {
        ...state,
        order: {
          ...state.order,
          pallets: state.order.pallets.map(pallet => {
            if (pallet.pallet_id === action.payload.id) {
              return {
                ...pallet,
                amount_sawn: action.payload.amount_sawn,
              }
            } else {
              return pallet
            }
          }),
        },
      }
    case 'ORDER_PALLET_START':
      return {
        ...state,
        order: {
          ...state.order,
          pallets: state.order.pallets.map(pallet => {
            if (pallet.pallet_id === action.payload.id) {
              return {
                ...pallet,
                [action.payload.stage]: action.payload.time,
              }
            } else {
              return pallet
            }
          }),
        },
      }
    case 'ORDER_STAGE_OPTION':
      return {
        ...state,
        order: {
          ...state.order,
          pallets: state.order.pallets.map(pallet => {
            if (pallet.pallet_id === action.payload.id) {
              console.log(action.payload)
              return {
                ...pallet,
                [action.payload.stage]: action.payload.check,
              }
            } else {
              return pallet
            }
          }),
        },
      }

    default:
      return state
  }
}
