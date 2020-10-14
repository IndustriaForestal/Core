import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineMail, AiOutlineBell } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { BiLogInCircle } from 'react-icons/bi'
import Cookies from 'js-cookie'
import { logOut } from '../../actions/app'
import Title from '../Title/Title'
import './Topbar.scss'

const Topbar = props => {
  const { topbar } = props
  const location = useLocation()
  const handleLogOut = () => {
    document.cookie = `user=`
    document.cookie = `name=`
    document.cookie = `id=`
    document.cookie = `token=`
    props.logOut({})
    window.location.href = '/login'
  }
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
            <FiLogOut onClick={handleLogOut} />
            <div className="topbar__user">
              <p>{Cookies.get('user')}</p>
              <p>{Cookies.get('name')}</p>
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
                    className={
                      url === location.pathname
                        ? 'topbar__link --active'
                        : 'topbar__link'
                    }
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

const mapStateToProps = (state) => {
  return {
    topbar: state.topbar,
  }
}

const mapDispatchToProps = {
  logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
