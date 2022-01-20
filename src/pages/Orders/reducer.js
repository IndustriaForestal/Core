export default function reducer(
  state = {
    order: {
      customer_id: 1,
      date: '2021-10-06T20:32:00.000Z',
      pallets: [
        {
          pallet_id: '13',
          amount: '100',
          user_id: '1',
          check: 0,
          check_type: null,
          check_stage: 0,
          none_stage: 0,
          amount_stock: 0,
          amount_items: [],
          amount_sawn: [],
          amount_stock_supplier: 0,
          amount_items_supplier: [],
          amount_sawn_supplier: [],
          stage1: 0,
          stage1_supplier: 0,
          stage2: 0,
          stage2_supplier: 0,
          stage3: 0,
          stage3_supplier: 0,
          date: '2022-01-31 12:00:00',
          tableData: {
            id: 0,
          },
        },
      ],
    },
  },
  action
) {
  switch (action.type) {
    case 'GET_ORDERS':
      return {
        ...state,
        orders: action.payload.data,
      }
    case 'GET_ORDERS_CUSTOMERS':
      return {
        ...state,
        ordersCustomers: action.payload.data,
      }
    case 'GET_ORDERS_CUSTOMERS_DETAILS':
      return {
        ...state,
        ordersCustomersDetails: action.payload.data,
      }
    case 'GET_ORDERS_WORKSTATIONS':
      return {
        ...state,
        ordersWorkstations: action.payload.data,
      }
    case 'GET_ORDERS_HISTORY':
      return {
        ...state,
        ordersHistory: action.payload.data,
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
    case 'GET_ORDERS_DETAILS':
      return {
        ...state,
        ordersDetails: action.payload.data,
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
            console.log(pallet)
            if (pallet.pallet_id === action.payload.id) {
              return {
                ...pallet,
                [action.payload.stage]: action.payload.check,
                sawnStage: action.payload.sawnStage,
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
