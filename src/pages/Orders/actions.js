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
