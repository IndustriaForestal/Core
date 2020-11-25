import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineHome, AiOutlineSetting, AiOutlineFileAdd } from 'react-icons/ai'
import { FiBox } from 'react-icons/fi'
import './Aside.scss'
import logo from '../../assets/static/logo.svg'

const Aside = () => {
  const location = useLocation()
  if (location.pathname !== '/login') {
    return (
      <aside className="aside">
        <Link to="/" className="aside__brand">
          <img src={logo} alt="logo" className="aside__brand__logo" />
        </Link>
        <nav className="aside__nav">
          <ul className="aside__nav__menu">
            <li className="aside__nav__item">
              <Link to="/" className="aside__nav__link">
                <AiOutlineHome className="aside__nav__icon" />
                <span className="aside__nav__text">Home</span>
              </Link>
            </li>
            <li className="aside__nav__item">
              <Link to="/orderProduction" className="aside__nav__link">
                <AiOutlineFileAdd className="aside__nav__icon" />
                <span className="aside__nav__text">Ord. Prod</span>
              </Link>
            </li>
            <li className="aside__nav__item">
              <Link to="/stock" className="aside__nav__link">
                <FiBox className="aside__nav__icon" />
                <span className="aside__nav__text">Inventarios</span>
              </Link>
            </li>
            <li className="aside__nav__item">
              <Link to="/users" className="aside__nav__link">
                <AiOutlineSetting className="aside__nav__icon" />
                <span className="aside__nav__text">Usuarios</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    )
  }
  return null
}

export default Aside
