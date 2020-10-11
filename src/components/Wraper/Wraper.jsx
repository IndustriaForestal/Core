import React from 'react'
import './Wraper.scss'

const Wraper = ({ children }) => (
  <div className="wraper">
    <div className="container">{children}</div>
  </div>
)

export default Wraper
