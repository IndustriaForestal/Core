import axios from 'axios'
import Swal from 'sweetalert2'
import { getAll } from '../../actions/app'

const storedJwt = sessionStorage.getItem('token')

export const addProcessQuality =
  (endpoint, typeAction, data) => async dispatch => {
    try {
      await axios({
        url: `${process.env.REACT_APP_API}${endpoint}`,
        headers: { Authorization: `Bearer ${storedJwt}` },
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

export const updateProcessQuality =
  (endpoint, typeAction, data) => async dispatch => {
    try {
      await axios({
        url: `${process.env.REACT_APP_API}${endpoint}`,
        headers: { Authorization: `Bearer ${storedJwt}` },
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

export const deleteProcessQuality =
  (endpoint, typeAction) => async dispatch => {
    try {
      await axios({
        url: `${process.env.REACT_APP_API}${endpoint}`,
        headers: { Authorization: `Bearer ${storedJwt}` },
        method: 'delete',
      })
      dispatch(getAll('qualities', 'GET_QUALITIES'))
    } catch (error) {
      console.log(error)
    }
  }
