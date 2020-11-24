import React from 'react'
import './Layout.scss'
import Aside from '../components/Aside/Aside'
import Topbar from '../components/Topbar/Topbar'
import Wraper from '../components/Wraper/Wraper'

const Layout = ({ children }) => {
  return (
    <>
      <Aside />
      <Topbar />
      <Wraper>{children}</Wraper>
    </>
  )
}

export default Layout
