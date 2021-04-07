import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { getAll } from '../../actions/app'

export const addObjectPallet = (
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

export const deleteObjectPallet = (endpoint, typeAction) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}${endpoint}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'delete',
    })
    dispatch({
      type: typeAction,
    })
    dispatch(getAll('pallets', 'GET_PALLETS'))
  } catch (error) {
    console.log(error)
  }
}

export const functionNewPallet = (data, itemsList) => async dispatch => {
  const formData = new FormData()
  Object.keys(data).map(key => {
    if (key === 'image' || key === 'pdf') {
      console.log('algo')
      return formData.append(key, data[key][0])
    } else {
      return formData.append(key, data[key])
    }
  })
  console.log(formData, itemsList)
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}pallets/new`,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'multipart/form-data',
      },
      method: 'post',
      data: formData,
    })
    const id = res.data.data
    await axios({
      url: `${process.env.REACT_APP_API}pallets/new/items`,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      method: 'post',
      data: { itemsList, id },
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
    Swal.fire({
      title: 'Error!',
      text: 'Ah ocurrido un error',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    })
  }

  // try {
  //   const res = await axios({
  //     url: `${process.env.REACT_APP_API}pallets/new/items`,
  //     headers: { Authorization: `Bearer ${Cookies.get('token')}` },
  //     method: 'post',
  //     data: itemsList,
  //   })
  //   console.log(res)
  // } catch (error) {
  //   console.log(error)
  // }
}
