import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import { createNotification } from '../../actions/app'

const storedJwt = sessionStorage.getItem('token')

export const searchCapacities = data => async dispatch => {
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}orders/capacities`,
      headers: { Authorization: `Bearer ${storedJwt}` },
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

export const updatePalletsStock =
  (amount, palletId, type) => async dispatch => {
    try {
      await axios({
        url: `${process.env.REACT_APP_API}orders/updatePallet/${palletId}`,
        headers: { Authorization: `Bearer ${storedJwt}` },
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

export const completeOrder = orderId => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/completeOrder/${orderId}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'put',
    })
    dispatch(
      createNotification({
        text: 'Pedido completado',
        typeAction: 'UPDATE_ORDER_PRODUCTION',
        date: moment().format('YYYY-MM-DDTHH:mm:ss') + 'Z',
        link: `/history/orders/${orderId}`,
      })
    )
    dispatch({
      type: 'COMPLETE_ORDER',
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateAmountPalletOrder = (orderId, data) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/updatePalletesOrder/${orderId}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'put',
      data,
    })
    dispatch({
      type: 'COMPLETE_ORDER',
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateDatePalletOrder = (orderId, data) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/updatePalletesOrderDate/${orderId}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'put',
      data,
    })
    dispatch({
      type: 'COMPLETE_ORDER',
    })
  } catch (error) {
    console.log(error)
  }
}
