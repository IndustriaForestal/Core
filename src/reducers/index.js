const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        topbar: action.payload,
      }
    case 'SET_WRAPER':
      return {
        ...state,
        wraper: action.payload,
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loggedIn: true,
      }
    case 'LOG_OUT':
      return {
        ...state,
        loggedIn: false,
      }
    case 'GET_CUSTOMERS':
      return {
        ...state,
        customers: action.payload.data,
      }
    case 'GET_CUSTOMER':
      return {
        ...state,
        customer: action.payload,
      }
    case 'CREATE_CUSTOMER':
      return {
        ...state,
      }
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
      }
    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer._id !== action.payload
        ),
      }
    case 'GET_NAILS':
      return {
        ...state,
        nails: action.payload.data,
      }
    case 'GET_NAIL':
      return {
        ...state,
        nail: action.payload,
      }
    case 'CREATE_NAILS':
      return {
        ...state,
      }
    case 'UPDATE_NAIL':
      return {
        ...state,
      }
    case 'DELETE_NAIL':
      return {
        ...state,
        nails: state.nails.filter(nail => nail._id !== action.payload),
      }
    case 'GET_MATERIAL':
      return {
        ...state,
        material: action.payload.data,
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
    case 'GET_PROCESSES':
      return {
        ...state,
        processes: action.payload.data,
      }
    case 'GET_PROCESS':
      return {
        ...state,
        process: action.payload,
      }
    case 'CREATE_PROCESS':
      return {
        ...state,
      }
    case 'UPDATE_PROCESS':
      return {
        ...state,
      }
    case 'DELETE_PROCESS':
      return {
        ...state,
        processes: state.processes.filter(
          process => process._id !== action.payload
        ),
      }
    case 'GET_PLATFORMS':
      return {
        ...state,
        platforms: action.payload.data,
      }
    case 'GET_PLATFORM':
      return {
        ...state,
        platform: action.payload,
      }
    case 'CREATE_PLATFORM':
      return {
        ...state,
      }
    case 'UPDATE_PLATFORM':
      return {
        ...state,
      }
    case 'DELETE_PLATFORM':
      return {
        ...state,
        platforms: state.platforms.filter(
          platform => platform._id !== action.payload
        ),
      }
    case 'GET_ITEMS':
      return {
        ...state,
        items: action.payload.data,
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
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      }
    case 'GET_SUPPLIERS':
      return {
        ...state,
        suppliers: action.payload.data,
      }
    case 'GET_SUPPLIER':
      return {
        ...state,
        supplier: action.payload,
      }
    case 'CREATE_SUPPLIER':
      return {
        ...state,
      }
    case 'UPDATE_SUPPLIER':
      return {
        ...state,
      }
    case 'DELETE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.filter(
          supplier => supplier._id !== action.payload
        ),
      }
    case 'GET_QUALITIES':
      return {
        ...state,
        qualities: action.payload.data,
      }
    case 'GET_QUALITY':
      return {
        ...state,
        quality: action.payload,
      }
    case 'CREATE_QUALITY':
      return {
        ...state,
      }
    case 'UPDATE_QUALITY':
      return {
        ...state,
      }
    case 'DELETE_QUALITY':
      return {
        ...state,
        qualities: state.qualities.filter(
          quality => quality._id !== action.payload
        ),
      }
    case 'ADD_PROCESS_QUALITY':
      return {
        ...state,
      }
    // ! Hack para regresar las calidades al state (actions ln 36)
    case 'DELETE_PROCESS_QUALITY':
      return {
        ...state,
      }
    case 'GET_SPECIAL_PROCESSES':
      return {
        ...state,
        specialProcesses: action.payload.data,
      }
    case 'GET_SPECIAL_PROCESS':
      return {
        ...state,
        specialProcess: action.payload,
      }
    case 'CREATE_SPECIAL_PROCESS':
      return {
        ...state,
      }
    case 'UPDATE_SPECIAL_PROCESS':
      return {
        ...state,
      }
    case 'DELETE_SPECIAL_PROCESS':
      return {
        ...state,
        specialProcesses: state.specialProcesses.filter(
          specialProcess => specialProcess._id !== action.payload
        ),
      }
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

    default:
      return state
  }
}

export default reducer