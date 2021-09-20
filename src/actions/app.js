import axios from 'axios'
import Swal from 'sweetalert2'

const API_KEY_TOKEN =
  '77a5f9501bfc62140ff0402fdc9bd9cdf60c269fd9c909ee43971b3885a4ac69'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      Swal.fire({
        title: 'Sesión Expirada',
        text: 'Su sesión ha expirado',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      }).then(result => {
        if (result.isConfirmed) {
          logOut()
          sessionStorage.clear()
          window.location.href = '/login'
        }
      })
    } else {
      return Promise.reject(error)
    }
  }
)

export const setTitle = payload => ({
  type: 'SET_TITLE',
  payload,
})

export const setWraper = payload => ({
  type: 'SET_WRAPER',
  payload,
})

export const setSocket = payload => ({
  type: 'SET_SOCKET',
  payload,
})

export const addItemList = payload => ({
  type: 'CREATE_ITEMS_LIST',
  payload,
})

export const deleteItemList = payload => ({
  type: 'DELETE_ITEMS_LIST',
  payload,
})

export const createNewPallet = payload => ({
  type: 'CREATE_NEW_PALLET',
  payload,
})

export const cleanNewPallet = payload => ({
  type: 'CLEAN_NEW_PALLET',
  payload,
})

export const setUnits = payload => ({
  type: 'SET_UNITS',
  payload,
})

export const cleanStock = payload => ({
  type: 'CLEAN_STOCK',
  payload,
})

export const setModal = payload => ({
  type: 'SET_MODAL',
  payload,
})
export const setModalReview = payload => ({
  type: 'SET_MODAL_REVIEW',
  payload,
})

export const setUser = (payload, redirectionUrl) => async dispatch => {
  const { user, password } = payload
  try {
    const res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}auth/sing-in`,
      auth: {
        username: user,
        password,
      },
      data: {
        apiKeyToken: API_KEY_TOKEN,
      },
    })

    sessionStorage.setItem('token', res.data.token)
    sessionStorage.setItem('user', res.data.user.user)
    sessionStorage.setItem('name', res.data.user.name)
    sessionStorage.setItem('id', res.data.user.id)
    sessionStorage.setItem('role', res.data.user.role)

    window.location.href = redirectionUrl

    dispatch({
      type: 'LOGIN_REQUEST',
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Usuario o contraseña incorrectos',
    })
  }
}

export const logOut = () => ({
  type: 'LOG_OUT',
})

//CRUD

export const getAll = (endPoint, typeAction) => async dispatch => {
  const storedJwt = sessionStorage.getItem('token')
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endPoint}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'get',
    })
    console.log(res.data)
    dispatch({
      type: typeAction,
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const get = (endPoint, typeAction) => async dispatch => {
  const storedJwt = sessionStorage.getItem('token')
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endPoint}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'get',
    })
    dispatch({
      type: typeAction,
      payload: res.data.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const create = (endPoint, typeAction, data) => async dispatch => {
  const storedJwt = sessionStorage.getItem('token')
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endPoint}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'post',
      data: data,
    })
    dispatch({
      type: typeAction,
      payload: res.data,
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
}

export const update = (endpoint, typeAction, data) => async dispatch => {
  const storedJwt = sessionStorage.getItem('token')

  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endpoint}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'put',
      data: data,
    })
    console.log(res)
    dispatch({
      type: typeAction,
      payload: data,
      patchPayload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleted = (endpoint, typeAction) => async dispatch => {
  const storedJwt = sessionStorage.getItem('token')

  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endpoint}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'delete',
    })
    dispatch({
      type: typeAction,
      payload: res.data.data,
    })
  } catch (error) {
    console.log(error)
  }
}

//CREATE ATTACHMENT

export const createFile = (endPoint, typeAction, data) => async dispatch => {

  const storedJwt = sessionStorage.getItem('token')

  const formData = new FormData()
  Object.keys(data).map(key => {
    if (key === 'pdf' || key === 'logo') {
      return formData.append(key, data[key][0])
    } else {
      return formData.append(key, data[key])
    }
  })

  try {
    await axios({
      url: `${process.env.REACT_APP_API}${endPoint}`,
      headers: {
        Authorization: `Bearer ${storedJwt}`,
        'Content-Type': 'multipart/form-data',
      },
      method: 'post',
      data: formData,
    })

    dispatch({
      type: typeAction,
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
}

//Notifications

export const createNotification = data => async dispatch => {
  const storedJwt = sessionStorage.getItem('token')

  try {
    await axios({
      url: `${process.env.REACT_APP_API}notifications`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'post',
      data: {
        text: data.text,
        link: data.link,
        date: data.date,
        read: 0,
      },
    })
    dispatch({
      type: data.typeAction,
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateNotification = (data, notificationId) => async dispatch => {
  const storedJwt = sessionStorage.getItem('token')

  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}notification/${notificationId}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'put',
      data: {},
    })

    dispatch({
      type: data.typeAction,
      payload: res.data.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const createNotificationManual = data => async dispatch => {
  const storedJwt = sessionStorage.getItem('token')

  try {
    await axios({
      url: `${process.env.REACT_APP_API}notifications`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'post',
      data: {
        text: data.text,
        link: data.link,
        date: data.date,
        read: 0,
      },
    })

    dispatch({
      type: 'CREATE_NOTIFICATION',
    })
  } catch (error) {
    console.log(error)
  }
}
