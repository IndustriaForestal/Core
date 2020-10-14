import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

const API_KEY_TOKEN =
  '370f3f01fbebd2269599f25237ff9fedb923acf081de39f470b3afaa9cadb7dd'

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
    console.log(res.config)
    dispatch({
      type: typeAction,
      data: res.config.data,
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
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endpoint}`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      method: 'put',
      data: data,
    })
    dispatch({
      type: typeAction,
      payload: res.data.data,
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
    Swal.fire('Borrado!', 'Borrado con exito.', 'success')
  } catch (error) {
    console.log(error)
  }
}
