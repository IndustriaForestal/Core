import React from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import Aside from '../components/Aside/Aside'
import Topbar from '../components/Topbar/Topbar'
import Wraper from '../components/Wraper/Wraper'
import { getAll, setSocket } from '../actions/app'

const Layout = props => {
  const { children } = props

  return (
    <>
      <Aside />
      <Topbar />
      <Wraper>{children}</Wraper>
    </>
  )
}

const mapDispatchToProps = {
  getAll,
  setSocket,
}

export default connect(null, mapDispatchToProps)(Layout)
