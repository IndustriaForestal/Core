import React from 'react'
import './Button.scss'

const Button = props => {
  const { children, className = 'btn', type = 'button' } = props
  return (
    <button className={className} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button
