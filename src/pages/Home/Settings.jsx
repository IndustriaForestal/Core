import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BsCardImage } from 'react-icons/bs'
import { FaPallet } from 'react-icons/fa'
import Cookies from 'js-cookie'
import { setTitle } from '../../actions/app'
import IconHome from './IconHome/IconHome'
import './Home.scss'

const Settings = props => {
  const role = Cookies.get('role')

  useEffect(() => {
    const topbar = {
      title: 'Home',
      menu: {
        Home: '/',
        /* Producción: '/home-production',
        Calidad: '/home-quality',
        Gestión: '/home-management',
        Contabilidad: '/home-accounting',
        Administración: '/home-administration', */
        Configuración: '/home-settings',
      },
    }
    props.setTitle(topbar)
  })
  switch (role) {
    case 'Administrador':
      return (
        <div className="Home">
          <IconHome
            icon={<BsCardImage />}
            url="/settings/type-material"
            text="Tipo de material"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/settings/type-wood"
            text="Tipo de madera"
          />
          <IconHome icon={<BsCardImage />} url="/qualities" text="Calidades" />
          <IconHome icon={<BsCardImage />} url="/specialProcesses" text="Requerimientos Calidad" />
          <IconHome icon={<BsCardImage />} url="/zones" text="Zonas" />

          <IconHome icon={<FaPallet />} url="/users" text="Usuarios" />
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

export default connect(null, mapDispatchToProps)(Settings)
