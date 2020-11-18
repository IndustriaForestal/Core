import React from 'react'
import './Title.scss'

const Title = ({ children, className }) => (
  <h1 className={className}>{children}</h1>
)

export default Title
