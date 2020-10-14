import React from 'react'

const Select = () => {
  return (
    <div className="inputGroup">
      <label htmlFor="">
        <span>Inicia su proceso en:</span>
        <select name="processId">
          {processes.map(process => {
            return (
              <option key={process._id} value={process._id}>
                {process.name}
              </option>
            )
          })}
        </select>
      </label>
    </div>
  )
}

export default Select
