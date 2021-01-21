import React from 'react'
import './Table.scss'

const Table = ({ children, head, id }) => {
  return (
    <table className="table" id={id}>
      <thead className="table__head">
        <tr>
          {head.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody className="table__body">{children}</tbody>
    </table>
  )
}

export default Table
