export const createCustomer = payload => ({
  type: 'CREATE_CUSTOMER',
  payload,
})
export const updateCustomer = payload => ({
  type: 'UPDATE_CUSTOMER',
  payload,
})
export const deleteCustomer = payload => ({
  type: 'DELETE_CUSTOMER',
  payload,
})
