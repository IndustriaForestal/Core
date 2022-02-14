export default function reducerProducts(
  state = {
    userPathname: [
      {
        pathname: 'stock',
        name: 'Inventario Tarima',
      },
      {
        pathname: 'stockNails',
        name: 'Inventario Complementos',
      },
      {
        pathname: 'stockItems',
        name: 'Inventario Madera Habilitada',
      },
      {
        pathname: 'stockMaterial',
        name: 'Inventario Trozo',
      },
      {
        pathname: 'stockChanges',
        name: 'Inventario Entradas y Salidas',
      },
      {
        pathname: 'stockSuppliers',
        name: 'Inventario Entradas y Salidas Proveedores ',
      },
      {
        pathname: 'stockSuppliersHistory',
        name: 'Inventarios Proveedores Historial',
      },
      {
        pathname: 'stockHistory',
        name: 'Inventarios Historial',
      },
      {
        pathname: 'dashboard1processes',
        name: 'Dashboard de procesos',
      },
      {
        pathname: 'dashboard/review-home',
        name: 'Dashboard de Calidad',
      },
      {
        pathname: 'dashboard/stock',
        name: 'Dashboard de Inventario',
      },
      {
        pathname: 'orders-customers',
        name: 'Pedidos de Clientes',
      },
      {
        pathname: 'purchase-orders',
        name: 'Orden de Compra',
      },
    ],
    notificationsUsers: {
      complemento: 'complemento',
      clientes: 'clientes',
      pedidos: 'pedidos',
      tarimas: 'tarimas',
    },
  },
  action
) {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload.data,
        user: null,
      }
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'GET_NOTIFICATIONS_ROLES':
      return {
        ...state,
        notificationsRoles: action.payload.data,
      }
    case 'GET_ROLES':
      return {
        ...state,
        roles: action.payload.data,
      }
    case 'GET_SCREENS':
      return {
        ...state,
        screens: action.payload.data,
      }
    case 'CREATE_USER':
      return {
        ...state,
      }
    case 'UPDATE_USER':
      return {
        ...state,
      }
    case 'DELETE_USER':
      return {
        ...state,
        roles: state.roles.filter(rol => rol.id !== action.payload),
      }
    case 'GET_ROLES':
      return {
        ...state,
        roles: action.payload.data,
        rol: null,
      }
    case 'GET_ROL':
      return {
        ...state,
        rol: action.payload,
      }
    case 'CREATE_ROL':
      return {
        ...state,
      }
    case 'UPDATE_ROL':
      return {
        ...state,
      }
    case 'DELETE_ROL':
      return {
        ...state,
        roles: state.roles.filter(rol => rol.id !== action.payload),
      }
    default:
      return state
  }
}
