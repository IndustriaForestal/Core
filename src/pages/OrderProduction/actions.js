import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

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
