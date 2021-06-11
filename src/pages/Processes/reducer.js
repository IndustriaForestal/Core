export default function reducer(state = {}, action) {
  switch (action.type) {
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
    case 'GET_PROCESSES_PALLETS':
      return {
        ...state,
        processesPallets: action.payload.data,
      }
    case 'GET_PROCESSES_REJECT':
      return {
        ...state,
        processesReject: action.payload.data,
      }
    case 'GET_PROCESSES_ITEMS':
      return {
        ...state,
        processesItems: action.payload.data,
      }
    default:
      return state
  }
}
