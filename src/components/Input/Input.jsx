import React from 'react'
import './Input.scss'

const Input = ({
  title,
  name,
  type,
  placeholder,
  value,
  onChange,
  passRef,
  step,
  helper,
  helperClassName,
  className,
}) => {
  return (
    <div className={`inputGroup ${className}`}>
      <label htmlFor={name}>
        {/* <span>{title}</span> */}
        <input
          name={name}
          type={type}
          onChange={onChange}
          placeholder={title}
          defaultValue={value}
          ref={passRef}
          step={step}
        />
        <span className={`inputGroup__helper ${helperClassName}`}>
          {helper}
        </span>
      </label>
    </div>
  )
}

export default Input
