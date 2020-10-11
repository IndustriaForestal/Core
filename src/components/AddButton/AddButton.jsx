import React from 'react'
import './AddButton.scss'

const AddButton = ({ children, onClick }) => {
  return (
    <button type="button" className="addButton" onClick={onClick}>
      {children}
    </button>
  )
}

export default AddButton
