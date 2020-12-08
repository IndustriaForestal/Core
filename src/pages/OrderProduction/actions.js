import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import { createNotification } from '../../actions/app'

export const updateOrderProduction = (
  endpoint,
  typeAction,
  data
) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}${endpoint}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
      data: data,
    })
    dispatch({
      type: typeAction,
      payload: data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateItemList = (data, index, orderId) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/updateItems/${orderId}/${index}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
      data: data,
    })

    dispatch({
      type: 'UPDATE_ITEMLIST',
      payload: data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateRawStock = (volumen, rawId) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/updateRaw/${rawId}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
      data: {
        0: volumen,
      },
    })

    dispatch({
      type: 'UPDATE_RAW_STOCK',
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateNailsStock = (amount, nailId) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/updateNail/${nailId}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
      data: { amount },
    })
    dispatch({
      type: 'UPDATE_NAIL_STOCK',
    })
  } catch (error) {
    console.log(error)
  }
}
export const updatePalletsStock = (
  amount,
  palletId,
  type
) => async dispatch => {
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
export const updateItemsStock = (
  amount,
  itemId,
  observations
) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/updateItems/${itemId}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
      data: { amount, observations },
    })
    dispatch({
      type: 'UPDATE_ITEM_STOCK',
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateItemListOne = (index, orderId) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/updateItemListOne/${orderId}/${index}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
    })

    dispatch({
      type: 'UPDATE_ITEMLIST_ONE',
    })
  } catch (error) {
    console.log(error)
  }
}
export const updateItemListReady = (
  index,
  orderId,
  amount
) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/updateItemListReady/${orderId}/${index}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
      data: {
        amount,
      },
    })
    dispatch({
      type: 'UPDATE_ITEMLIST_ONE',
    })
  } catch (error) {
    console.log(error)
  }
}
export const completeOrderProduction = (
  arrayIndexHack,
  orderId
) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/completeOrderProduction/${orderId}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
      data: arrayIndexHack,
    })
    dispatch(
      createNotification({
        text: 'Orden de Producción Completada',
        typeAction: 'UPDATE_ORDER_PRODUCTION',
        date: moment().format('YYYY-MM-DDThh:mm:ss') + 'Z',
      })
    )
    dispatch({
      type: 'UPDATE_ORDER_PRODUCTION',
    })
  } catch (error) {
    console.log(error)
  }
}

export const addReadyToOrderProduction = (
  index,
  orderId,
  amount
) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/addReadyToOrderProduction/${orderId}/${index}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
      data: { amount },
    })
    dispatch(
      createNotification({
        text: 'Orden de Producción Completada',
        typeAction: 'UPDATE_ORDER_PRODUCTION',
      })
    )
    dispatch({
      type: 'UPDATE_ORDER_PRODUCTION',
    })
  } catch (error) {
    console.log(error)
  }
}

// ? Completa una orden de producción con el id del embarque y el index de orderProductions

export const completeOrderProductionSingle = (
  index,
  shipmentId
) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/completeOrderProduction/${shipmentId}/${index}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
    })
    dispatch(
      createNotification({
        text: 'Orden de Producción Completada',
        typeAction: 'UPDATE_ORDER_PRODUCTION',
        date: moment().format('YYYY-MM-DDThh:mm:ss') + 'Z',
      })
    )
    dispatch({
      type: 'UPDATE_ORDER_PRODUCTION',
    })
  } catch (error) {
    console.log(error)
  }
}

// ? Completa el embarque shipment con su ID

export const completeShipment = shipmentId => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}orders/completeShipment/${shipmentId}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
    })
    dispatch(
      createNotification({
        text: 'Embarque Completado',
        typeAction: 'UPDATE_ORDER_PRODUCTION',
        date: moment().format('YYYY-MM-DDThh:mm:ss') + 'Z',
      })
    )
    dispatch({
      type: 'UPDATE_ORDER_PRODUCTION',
    })
  } catch (error) {
    console.log(error)
  }
}
