import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BsCardImage } from 'react-icons/bs'
import { FaPallet } from 'react-icons/fa'
import { setTitle } from '../../actions/app'
import IconHome from './IconHome/IconHome'
import './Home.scss'

const Settings = props => {
  const { user } = props
  const role = user.role

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
          <IconHome icon={<BsCardImage />} url="/processes" text="Procesos" />
          <IconHome icon={<BsCardImage />} url="/qualities" text="Calidades" />
          <IconHome icon={<BsCardImage />} url="/wood" text="Tipo de madera" />
          <IconHome
            icon={<BsCardImage />}
            url="/items/type"
            text="Tipo de material"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/complements"
            text="Complementos"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/specialProcesses"
            text="Requerimientos Calidad"
          />
          <IconHome icon={<BsCardImage />} url="/colors" text="Colores" />
          <IconHome icon={<BsCardImage />} url="/suppliers" text="Proveedores" />
          <IconHome icon={<BsCardImage />} url="/customers" text="Clientes" />
          <IconHome icon={<BsCardImage />} url="/zones" text="Zonas" />
          <IconHome icon={<BsCardImage />} url="/schedule" text="Horarios" />
          <IconHome icon={<FaPallet />} url="/reports-config" text="Reportes" />
          <IconHome icon={<FaPallet />} url="/samples-config" text="Muestreos" />
          <IconHome icon={<FaPallet />} url="/warehouse/add" text="Almacen" />
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

const mapStateToProps = state => {
  return {
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
