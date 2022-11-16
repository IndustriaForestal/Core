import React from 'react'
import './Table.scss'

const Table = ({
  children,
  head = ['Default'],
  id,
  footer = false,
  footerChildren,
}) => {
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
      {footer ? (
        <tfoot className="table__head">{footerChildren}</tfoot>
      ) : null}
    </table>
  )
}

export default Table
