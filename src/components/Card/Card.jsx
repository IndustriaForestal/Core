import React from 'react'
import './Card.scss'

const Card = ({
  title,
  children,
  tools,
  className = 'card',
  style
}) => {
  return (
    <div className={className} style={style}>
      <div className="card__head">
        {title}
        {tools ? tools : null}
      </div>
      <div className="card__body">{children}</div>
    </div>
  )
}
export default Card

