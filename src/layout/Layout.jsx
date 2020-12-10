import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import Swal from 'sweetalert2'
import './Layout.scss'
import Aside from '../components/Aside/Aside'
import Topbar from '../components/Topbar/Topbar'
import Wraper from '../components/Wraper/Wraper'
import { getAll, setSocket } from '../actions/app'

const Layout = props => {
  const { children } = props

  useEffect(() => {
    const socket = io(process.env.REACT_APP_WEBSOCKET, {
      transport: ['websocket'],
      upgrade: false,
    })
    socket.on('notification', () => {
      props.getAll('notifications', 'GET_NOTIFICATIONS')

      // console.log('search notifications')
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
      })

      Toast.fire({
        icon: 'info',
        title: 'Nueva Notificación',
      })
    })

    socket.on('disconnect', () => {
      socket.disconnect()
    })

    props.setSocket(socket)
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Aside />
      <Topbar />
      <Wraper>{children}</Wraper>
    </>
  )
}

const mapDispatchToProps = {
  getAll,
  setSocket,
}

export default connect(null, mapDispatchToProps)(Layout)
