
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BsCardImage } from 'react-icons/bs'
import Cookies from 'js-cookie'
import { setTitle } from '../../actions/app'
import IconHome from './IconHome/IconHome'
import './Home.scss'

const Management = props => {
  const role = Cookies.get('role')

  useEffect(() => {
    const topbar = {
      title: 'Home',
      menu: {
        Ventas: '/',
        Producción: '/home-production',
        Calidad: '/home-quality',
        Gestión: '/home-management',
        Contabilidad: '/home-accounting',
        Administración: '/home-administration',
        Configuración: '/home-settings',
      },
    }
    props.setTitle(topbar)
  })
  switch (role) {
    case 'Administrador':
      return (
        <div className="Home">
          
        </div>
      )
    case 'Vista':
      return (
        <div className="Home">
         
        </div>
      )

    default:
      return (
        <div className="Home">
          <IconHome
            icon={<BsCardImage />}
            url="/orderProduction"
            text="Ordenes de Producción"
          />
        </div>
      )
  }
}

const mapDispatchToProps = {
  setTitle,
}

export default connect(null, mapDispatchToProps)(Management)
