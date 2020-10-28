import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { getAll } from '../../actions/app'

export const addObjectPallet = (endpoint, typeAction, data) => async dispatch => {
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
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    })
    Toast.fire({
      icon: 'success',
      title: 'Se guardo correctamente',
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteObjectPallet = (
  endpoint,
  typeAction
) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}${endpoint}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'delete',
    })
    dispatch(getAll('pallets', 'GET_PALLETS'))
  } catch (error) {
    console.log(error)
  }
}