import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  AiOutlineBell,
  AiOutlineExclamationCircle,
  AiOutlineClose,
} from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import moment from 'moment'
import { getAll, update, setSocket } from '../../actions/app'
import './styles.scss'

const Notifications = props => {
  const { notifications, user, notificationsRoles, roles } = props
  const [toggle, setToggle] = useState(false)
  const history = useHistory()
  useEffect(() => {
    props
      .getAll('notifications', 'GET_NOTIFICATIONS')
      .then(() => {
        props.getAll('users/notifications', 'GET_NOTIFICATIONS_ROLES')
      })
      .then(() => props.getAll('users/roles', 'GET_ROLES'))
    // eslint-disable-next-line
  }, [])

  const handleRead = (link, id) => {
    const data = {
      read: 1,
    }
    props
      .update(`notifications/${id}`, 'UPDATE_NOTIFICATION', data)
      .then(() => history.push(link))
      .then(() => props.getAll('notifications', 'GET_NOTIFICATIONS'))
  }

  if (notifications && user && notificationsRoles && roles) {
    const roleId = roles.find(role => role.name === user.role)
    const filterForNotification = notificationsRoles.filter(
      notification => notification.rol_id === roleId.id
    )

    let data = []

    if (user.role === 'Administrador') {
      data = notifications
    } else {
      filterForNotification.map(n => {
        notifications
          .filter(notification => notification.rol === n.notification)
          .map(n => data.push(n))
      })
    }

    return (
      <>
        <AiOutlineBell
          className={`notifications__toggle ${
            data.filter(notification => notification.readed === 0).length > 0
              ? '--active'
              : ''
          }`}
          onClick={() => setToggle(!toggle)}
        />
        <ul className={`notifications ${toggle ? '--show' : ''}`}>
          <li
            className="notifications__close"
            onClick={() => setToggle(!toggle)}
          >
            <AiOutlineClose />
          </li>
          {notifications.filter(notification => notification.readed === 0)
            .length > 0 ? (
            data
              .filter(notification => notification.readed === 0)
              .map(notification => {
                return (
                  <li
                    key={notification.id}
                    className="notifications__item"
                    onClick={() =>
                      handleRead(notification.link, notification.id)
                    }
                  >
                    <div className="box">
                      <AiOutlineExclamationCircle />
                      {notification.text}
                    </div>
                    <span className="notifications__date">
                      {moment(notification.date).utc().format('l LT')}
                    </span>
                  </li>
                )
              })
          ) : (
            <li className="notifications__empty">No hay notificaciones</li>
          )}
        </ul>
      </>
    )
  } else {
    return <FaSpinner className="notifications__loading" />
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.reducerApp.notifications,
    notificationsRoles: state.reducerUsers.notificationsRoles,
    user: state.reducerApp.user,
    roles: state.reducerUsers.roles,
  }
}

const mapDispatchToProps = {
  getAll,
  update,
  setSocket,
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
