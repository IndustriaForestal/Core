import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BsCardImage } from 'react-icons/bs'
import { FaPallet } from 'react-icons/fa'
import { RiDashboardLine } from 'react-icons/ri'
import { setTitle } from '../../actions/app'
import IconHome from './IconHome/IconHome'
import './Home.scss'

const Home = props => {
  const { user } = props
  const role = user.role

  useEffect(() => {
    const topbar = {
      title: 'Home',
      menu: {
        Home: '/',
        /*  Producción: '/home-production',
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
          <IconHome icon={<RiDashboardLine />} url="/dashboard" text="Dashboard" />
          <IconHome icon={<BsCardImage />} url="/orders" text="Orden de Producción" />
          <IconHome icon={<BsCardImage />} url="/stock" text="Inventarios" />
          <IconHome icon={<BsCardImage />} url="/stockSuppliers" text="Entradas Proveedores" />

          <IconHome icon={<FaPallet />} url="/pallets" text="Tarimas" />
        </div>
      )
    case 'Vista':
      return (
        <div className="Home">
          {/*    <IconHome
            icon={<BsCardImage />}
            url="/orders"
            text="Pedidos de Clientes"
          />

          <IconHome icon={<BsCardImage />} url="/customers" text="Clientes" />
          <IconHome
            icon={<BsCardImage />}
            url="/platforms"
            text="Plataformas jaulas y tractos"
          />
          <IconHome icon={<BsCardImage />} url="/users" text="Usuarios" />
          <IconHome
            icon={<BsCardImage />}
            url="/calendar"
            text="Calendario de Proyección de embarques"
          />

          <IconHome
            icon={<BsCardImage />}
            url="/calendar-shipments"
            text="Calendario Embarques"
          /> */}
          {/* <IconHome
            icon={<BsCardImage />}
            url="/orders"
            text="Pedidos de Clientes"
          />
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
            url="/pallets"
            text="Fichas tecnicas de Tarimas"
          />
          <IconHome icon={<BsCardImage />} url="/customers" text="Clientes" />
          <IconHome
            icon={<BsCardImage />}
            url="/nails"
            text="Inventario de Clavos"
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
            url="/suppliers"
            text="Proveedores"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/qualities"
            text="Capacidad de Producción por Calidades"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/raws"
            text="Inventario Trozo y Cuarton"
          />
          <IconHome icon={<BsCardImage />} url="/users" text="Usuarios" />
          <IconHome
            icon={<BsCardImage />}
            url="/calendar"
            text="Calendario de Proyección de embarques"
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
          <IconHome
            icon={<BsCardImage />}
            url="/users"
            text="Usuarios"
          /> */}
        </div>
      )

    default:
      return (
        <div className="Home">
          {/*  <IconHome
            icon={<BsCardImage />}
            url="/orderProduction"
            text="Ordenes de Producción"
          /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
