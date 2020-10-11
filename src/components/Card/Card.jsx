import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { HiOutlinePencil } from 'react-icons/hi'
import './Card.scss'

const Card = ({
  title,
  children,
  editClick,
  deleteClick,
  closeClick,
  tools,
  className = 'card',
}) => {
  return (
    <div className={className}>
      <div className="card__head">
        {title}
        {tools ? (
          <div>
            <HiOutlinePencil onClick={editClick} />
            <AiOutlineDelete onClick={deleteClick} />
          </div>
        ) : null}
      </div>
      <div className="card__body">{children}</div>
    </div>
  )
}
export default Card
