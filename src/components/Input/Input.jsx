import React from 'react'
import './Input.scss'

const Input = ({ title, name, type, placeholder, value, onChange, passRef, step }) => {
  return (
    <div className="inputGroup">
      <label htmlFor={name}>
        <span>{title}</span>
        <input
          name={name}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          defaultValue={value}
          ref={passRef}
          step={step}
        />
      </label>
    </div>
  )
}

export default Input
