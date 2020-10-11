import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineMail, AiOutlineBell, AiOutlineUser } from 'react-icons/ai'
import { BiLogInCircle } from 'react-icons/bi'
import Title from '../Title/Title'
import './Topbar.scss'

const Topbar = props => {
  const { topbar, user } = props
  const location = useLocation()
  if (location.pathname !== '/login') {
    return (
      <div className="topbar">
        <div className="topbar__top">
          <div className="topbar__left">
            <Title>{topbar.title}</Title>
          </div>
          <div className="topbar__right">
            <AiOutlineMail />
            <AiOutlineBell />
            <Link to="/login">
              <AiOutlineUser />
            </Link>
            <div className="topbar__user">
              <p>{user.user}</p>
              <p>{user.position}</p>
            </div>
          </div>
        </div>
        <div className="topbar__bot">
          <ul className="topbar__menu">
            {Object.entries(topbar.menu).map(([li, url]) => {
              return (
                <li key={url} className="topbar__item">
                  <Link
                    to={url}
                    className={url === location.pathname ? 'topbar__link --active' : 'topbar__link'}
                  >
                    <BiLogInCircle />
                    {li}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
  return null
}

const mapStateToProps = state => {
  return {
    topbar: state.topbar,
    user: state.user,
  }
}

export default connect(mapStateToProps, null)(Topbar)
