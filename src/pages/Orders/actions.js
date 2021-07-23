import axios from 'axios'
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

export const orderSavePallets = payload => ({
  type: 'ORDER_SAVE_PALLETS',
  payload,
})

export const checkPallets = payload => ({
  type: 'ORDER_CHECK_PALLETS',
  payload,
})

export const orderNonStage = payload => ({
  type: 'ORDER_NON_STAGE',
  payload,
})

export const orderPalletStock = payload => ({
  type: 'ORDER_PALLET_STOCK',
  payload,
})

export const orderStageOption = payload => ({
  type: 'ORDER_STAGE_OPTION',
  payload,
})
export const orderPalletItem = payload => ({
  type: 'ORDER_PALLET_ITEM',
  payload,
})
export const orderPalletSawn = payload => ({
  type: 'ORDER_PALLET_SAWN',
  payload,
})
export const orderPalletStart = payload => ({
  type: 'ORDER_PALLET_START',
  payload,
})
