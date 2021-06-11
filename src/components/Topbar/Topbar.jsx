import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineMail } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { BiLogInCircle } from 'react-icons/bi'
import Cookies from 'js-cookie'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { logOut, setUnits } from '../../actions/app'
import Title from '../Title/Title'
import Notifications from '../Notifications'
import './Topbar.scss'

const Topbar = props => {
  const { topbar, setUnits, units } = props
  const location = useLocation()
  const handleLogOut = () => {
    sessionStorage.clear()
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
            <FormControlLabel
              control={
                <Switch
                  value="checkedA"
                  inputProps={{ 'aria-label': 'cm / in' }}
                  color="primary"
                  onChange={() => setUnits(!units)}
                />
              }
              label="cm / in"
            />
            <AiOutlineMail />
            <Notifications />
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

const mapStateToProps = state => {
  return {
    topbar: state.reducerApp.topbar,
    units: state.reducerApp.units,
  }
}

const mapDispatchToProps = {
  logOut,
  setUnits,
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
