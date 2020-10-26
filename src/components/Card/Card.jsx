import React from 'react'
import './Card.scss'

const Card = ({
  title,
  children,
  tools,
  className = 'card',
}) => {
  return (
    <div className={className}>
      <div className="card__head">
        {title}
        {tools ? tools : null}
      </div>
      <div className="card__body">{children}</div>
    </div>
  )
}
export default Card
