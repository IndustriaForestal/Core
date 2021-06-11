export default function reducer(state = {}, action) {
  switch (action.type) {
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
    case 'GET_SPECIAL_PROCESSES_PALLETS':
      return {
        ...state,
        specialProcessesPallets: action.payload.data,
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
    default:
      return state
  }
}
