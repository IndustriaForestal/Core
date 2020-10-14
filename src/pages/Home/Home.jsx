import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BsCardImage } from 'react-icons/bs'
import { setTitle } from '../../actions/app'
import IconHome from './IconHome/IconHome'
import './Home.scss'

const Home = props => {
  useEffect(() => {
    const topbar = {
      title: 'Home',
      menu: { Menu: '/' },
    }
    props.setTitle(topbar)
  })
  return (
    <div className="Home">
      <IconHome icon={<BsCardImage />} url="/customers" text="Clientes" />
      <IconHome icon={<BsCardImage />} url="/nails" text="Clavos" />
      <IconHome icon={<BsCardImage />} url="/material" text="Material" />
      <IconHome icon={<BsCardImage />} url="/processes" text="Procesos" />
    </div>
  )
}

const mapDispatchToProps = {
  setTitle,
}

export default connect(null, mapDispatchToProps)(Home)
