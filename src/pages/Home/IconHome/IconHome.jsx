import React from 'react'
import { Link } from 'react-router-dom'
import './IconHome.scss'

const IconHome = ({ icon, text, url }) => {
  return (
    <div className="iconHome">
      <Link to={url}>
        <div>{icon}</div>
        <div>{text}</div>
      </Link>
    </div>
  )
}

export default IconHome
