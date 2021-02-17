import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BsCardImage } from 'react-icons/bs'
import Cookies from 'js-cookie'
import { setTitle } from '../../actions/app'
import IconHome from './IconHome/IconHome'
import './Home.scss'

const Production = props => {
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
            url="/orderProduction"
            text="Ordenes de Producción"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/stock"
            text="Inventarios Generales"
          />

          <IconHome
            icon={<BsCardImage />}
            url="/material"
            text="Materia Prima"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/processes"
            text="Procesos de IFISA"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/specialProcesses"
            text="Procesos Especiales de IFISA"
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

          <IconHome
            icon={<BsCardImage />}
            url="/calendar-production"
            text="Calendario Producción"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/calendar-shipments"
            text="Calendario Embarques"
          />
        </div>
      )
    case 'Vista':
      return (
        <div className="Home">
          <IconHome
            icon={<BsCardImage />}
            url="/orderProduction"
            text="Ordenes de Producción"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/stock"
            text="Inventarios Generales"
          />

          <IconHome
            icon={<BsCardImage />}
            url="/material"
            text="Materia Prima"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/processes"
            text="Procesos de IFISA"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/specialProcesses"
            text="Procesos Especiales de IFISA"
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

          <IconHome
            icon={<BsCardImage />}
            url="/calendar-production"
            text="Calendario Producción"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/calendar-shipments"
            text="Calendario Embarques"
          />
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

export default connect(null, mapDispatchToProps)(Production)
