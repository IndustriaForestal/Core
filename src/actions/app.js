import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import io from 'socket.io-client'

const API_KEY_TOKEN =
  '77a5f9501bfc62140ff0402fdc9bd9cdf60c269fd9c909ee43971b3885a4ac69'

const socket = io(process.env.REACT_APP_WEBSOCKET, {
  transport: ['websocket'],
})

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

    document.cookie = `user=${res.data.user.user}`
    document.cookie = `name=${res.data.user.name}`
    document.cookie = `id=${res.data.user.id}`
    document.cookie = `token=${res.data.token}`
    document.cookie = `role=${res.data.user.role}`
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
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endPoint}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'get',
    })
    dispatch({
      type: typeAction,
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const get = (endPoint, typeAction) => async dispatch => {
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endPoint}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
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
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endPoint}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
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

export const deleted = (endpoint, typeAction) => async dispatch => {
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endpoint}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
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

//Notifications

export const createNotification = data => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}notifications`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'post',
      data: {
        userId: Cookies.get('id'),
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
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}notification/${notificationId}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
      data: {
        userId: Cookies.get('id'),
      },
    })
    socket.emit('notification')
    dispatch({
      type: data.typeAction,
      payload: res.data.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const createNotificationManual = data => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}notifications`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'post',
      data: {
        userId: Cookies.get('id'),
        text: data.text,
        link: data.link,
        date: data.date,
        read: 0,
      },
    })
    socket.emit('notification')
    dispatch({
      type: 'CREATE_NOTIFICATION',
    })
  } catch (error) {
    console.log(error)
  }
}

/* socket.on('notification', () => {
  console.log('From Node Js')
  const algo = async dispatch => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API}notifications`,
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        method: 'get',
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  algo()
}) */
