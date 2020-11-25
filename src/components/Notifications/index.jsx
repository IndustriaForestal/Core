import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  AiOutlineBell,
  AiOutlineExclamationCircle,
  AiOutlineClose,
} from 'react-icons/ai'
import io from 'socket.io-client'
import { FaSpinner } from 'react-icons/fa'
import moment from 'moment'
import { getAll, update } from '../../actions/app'
import './styles.scss'

const Notifications = props => {
  const { notifications } = props
  const [toggle, setToggle] = useState(false)
  const history = useHistory()
  useEffect(() => {
    props.getAll('notifications', 'GET_NOTIFICATIONS')
    
    const socket = io(process.env.REACT_APP_WEBSOCKET, {
      transport: ['websocket'],
    })

    socket.on('notification', () => {
      props.getAll('notifications', 'GET_NOTIFICATIONS')
      console.log('From Node Js')
    })

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

  if (notifications) {
    return (
      <>
        <AiOutlineBell
          className={`notifications__toggle ${
            notifications.filter(notification => notification.read === 0)
              .length > 0
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
          {notifications.filter(notification => notification.read === 0)
            .length > 0 ? (
            notifications
              .filter(notification => notification.read === 0)
              .map(notification => {
                return (
                  <li
                    key={notification._id}
                    className="notifications__item"
                    onClick={() =>
                      handleRead(notification.link, notification._id)
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
    notifications: state.notifications,
  }
}

const mapDispatchToProps = {
  getAll,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
