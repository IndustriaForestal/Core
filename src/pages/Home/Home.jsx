import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BsCardImage } from 'react-icons/bs'
import Cookies from 'js-cookie'
import { setTitle } from '../../actions/app'
import IconHome from './IconHome/IconHome'
import './Home.scss'

const Home = props => {
  const role = Cookies.get('role')

  useEffect(() => {
    const topbar = {
      title: 'Home',
      menu: { Menu: '/' },
    }
    props.setTitle(topbar)
  })
  switch (role) {
    case 'Administrador':
      return (
        <div className="Home">
          <IconHome icon={<BsCardImage />} url="/orders" text="Pedidos" />
          <IconHome
            icon={<BsCardImage />}
            url="/orderProduction"
            text="Ord. Prod"
          />
          <IconHome icon={<BsCardImage />} url="/stock" text="Inventarios" />
          <IconHome icon={<BsCardImage />} url="/pallets" text="Tarimas" />
          <IconHome icon={<BsCardImage />} url="/customers" text="Clientes" />
          <IconHome icon={<BsCardImage />} url="/nails" text="Clavos" />
          <IconHome icon={<BsCardImage />} url="/material" text="Material" />
          <IconHome icon={<BsCardImage />} url="/processes" text="Procesos" />
          <IconHome
            icon={<BsCardImage />}
            url="/specialProcesses"
            text="Procesos Especiales"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/platforms"
            text="Plataformas"
          />
          <IconHome icon={<BsCardImage />} url="/items" text="Complementos" />
          <IconHome
            icon={<BsCardImage />}
            url="/suppliers"
            text="Proveedores"
          />
          <IconHome icon={<BsCardImage />} url="/qualities" text="Calidades" />
          <IconHome icon={<BsCardImage />} url="/raws" text="Materia Prima" />
          <IconHome icon={<BsCardImage />} url="/users" text="Usuarios" />
          <IconHome icon={<BsCardImage />} url="/calendar" text="Calendario Proyección" />
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
          <IconHome icon={<BsCardImage />} url="/orders" text="Pedidos" />
          <IconHome
            icon={<BsCardImage />}
            url="/orderProduction"
            text="Ord. Prod"
          />
          <IconHome icon={<BsCardImage />} url="/stock" text="Inventarios" />
          <IconHome icon={<BsCardImage />} url="/pallets" text="Tarimas" />
          <IconHome icon={<BsCardImage />} url="/customers" text="Clientes" />
          <IconHome icon={<BsCardImage />} url="/nails" text="Clavos" />
          <IconHome icon={<BsCardImage />} url="/material" text="Material" />
          <IconHome icon={<BsCardImage />} url="/processes" text="Procesos" />
          <IconHome
            icon={<BsCardImage />}
            url="/specialProcesses"
            text="Procesos Especiales"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/platforms"
            text="Plataformas"
          />
          <IconHome icon={<BsCardImage />} url="/items" text="Complementos" />
          <IconHome
            icon={<BsCardImage />}
            url="/suppliers"
            text="Proveedores"
          />
          <IconHome icon={<BsCardImage />} url="/qualities" text="Calidades" />
          <IconHome icon={<BsCardImage />} url="/raws" text="Materia Prima" />
          <IconHome icon={<BsCardImage />} url="/users" text="Usuarios" />
          <IconHome icon={<BsCardImage />} url="/calendar" text="Calendario Proyección" />
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
            text="Ord. Prod"
          />
        </div>
      )
  }
}

const mapDispatchToProps = {
  setTitle,
}

export default connect(null, mapDispatchToProps)(Home)
