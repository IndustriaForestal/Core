import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BsCardImage } from 'react-icons/bs'
import { FaPallet } from 'react-icons/fa'
import { RiDashboardLine } from 'react-icons/ri'
import { setTitle } from '../../actions/app'
import IconHome from './IconHome/IconHome'
import './Home.scss'

const Home = props => {
  const { user, userPathname } = props
  const role = user.role
  const accessScreen = user.accessScreen

  useEffect(() => {
    const topbar = {
      title: 'Home',
      menu: {
        Home: '/',
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
            icon={<RiDashboardLine />}
            url="/dashboard"
            text="Dashboard"
          />
          <IconHome
            icon={<BsCardImage />}
            url="/orders"
            text="Orden de Embarque"
          />
          <IconHome icon={<BsCardImage />} url="/stock" text="Inventarios" />
          <IconHome
            icon={<BsCardImage />}
            url="/stockSuppliers"
            text="Entradas Proveedores"
          />
          <IconHome
            icon={<FaPallet />}
            url="/purchase-orders"
            text="Orden de Compra"
          />
          <IconHome icon={<FaPallet />} url="/pallets" text="Tarimas" />
        </div>
      )

    default:
      return (
        <div className="Home">
          {accessScreen.map(s => (
            <IconHome
              icon={<BsCardImage />}
              url={`/${s.pathname.replace('1', '/')}`}
              text={
                userPathname.find(up => up.pathname === s.pathname) !==
                undefined
                  ? userPathname.find(up => up.pathname === s.pathname).name
                  : 'N/A'
              }
            />
          ))}
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
    userPathname: state.reducerUsers.userPathname,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
