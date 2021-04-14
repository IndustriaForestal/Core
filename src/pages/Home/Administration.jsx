import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BsCardImage } from 'react-icons/bs'
import Cookies from 'js-cookie'
import { setTitle } from '../../actions/app'
import IconHome from './IconHome/IconHome'
import './Home.scss'

const Administration = props => {
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
          <IconHome
            icon={<BsCardImage />}
            url="/stock"
            text="Inventarios Generales"
          />

          <IconHome
            icon={<BsCardImage />}
            url="/nails"
            text="Inventario de Clavos"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/platforms"
            text="Plataformas jaulas y tractos"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/items"
            text="Inventario de Complementos"
          />

          <IconHome
            icon={<BsCardImage />}
            url="/raws"
            text="Inventario Trozo y Cuarton"
          />
          <IconHome icon={<BsCardImage />} url="/users" text="Usuarios" />
        </div>
      )
    case 'Vista':
      return (
        <div className="Home">
           <IconHome
            icon={<BsCardImage />}
            url="/stock"
            text="Inventarios Generales"
          />

          <IconHome
            icon={<BsCardImage />}
            url="/nails"
            text="Inventario de Clavos"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/platforms"
            text="Plataformas jaulas y tractos"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/items"
            text="Inventario de Complementos"
          />

          <IconHome
            icon={<BsCardImage />}
            url="/raws"
            text="Inventario Trozo y Cuarton"
          />
          <IconHome icon={<BsCardImage />} url="/users" text="Usuarios" />
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

export default connect(null, mapDispatchToProps)(Administration)
