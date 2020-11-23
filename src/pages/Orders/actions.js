import axios from 'axios'
import Cookies from 'js-cookie'

export const searchCapacities = data => async dispatch => {
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}orders/capacities`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'post',
      data,
    })
    dispatch({
      type: 'GET_CAPACITIES',
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const updatePalletsStock = (amount, palletId, type) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/updatePallet/${palletId}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
      data: { amount, type },
    })
    dispatch({
      type: 'UPDATE_PALLET_STOCK',
    })
  } catch (error) {
    console.log(error)
  }
}

export const completeOrder = (orderId) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/completeOrder/${orderId}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
    })
    dispatch({
      type: 'COMPLETE_ORDER',
    })
  } catch (error) {
    console.log(error)
  }
}