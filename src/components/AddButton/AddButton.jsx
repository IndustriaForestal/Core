import React from 'react'
import Cookies from 'js-cookie'
import './AddButton.scss'

const AddButton = ({ children, onClick }) => {
  const role = Cookies.get('role')
  return (
    <button
      type="button"
      className={role === 'Vista' ? 'addButton --hidden' : 'addButton'}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default AddButton
