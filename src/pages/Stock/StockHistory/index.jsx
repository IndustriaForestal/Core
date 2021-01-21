import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { BsPlus } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { setTitle, getAll, deleted } from '../../../actions/app'
import Table from '../../../components/Table/Table'
import AddButton from '../../../components/AddButton/AddButton'
import Button from '../../../components/Button/Button'

const StockHistory = props => {
  const { stockLog, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Inventarios',
      menu: {
        Tarimas: '/stock',
        Complementos: '/stockItems',
        Clavos: '/stockNails',
        'Materia Prima': '/stockMaterial',
        'Entradas y salidas': '/stockChanges',
        Historial: '/stockHistory',
      },
    }
    setTitle(topbar)
    props.getAll('stock', 'GET_STOCKLOG')
    props.getAll('pallets', 'GET_PALLETS')
    props.getAll('raws', 'GET_RAWS')
    props.getAll('nails', 'GET_NAILS')
    props.getAll('items', 'GET_ITEMS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = [
    'Tipo',
    'Inventario',
    'Cantidad',
    'Usurio',
    'Fecha',
    'Planta',
    'Tipo Tarima',
  ]

  return (
    <>
      <Table head={tableHeader}>
        {stockLog ? (
          stockLog.map(item => (
            <tr key={item._id}>
              <td>{item.inOut}</td>
              <td>
                {item.collection === 'pallets' ? 'Tarima' : null}
                {item.collection === 'items' ? 'Complementos' : null}
                {item.collection === 'nails' ? 'Clavos' : null}
                {item.collection === 'raws' ? 'Materia Prima' : null}
              </td>
              <td>{item.amount}</td>
              <td>{item.user}</td>
              <td>{new Date(item.date).toLocaleString()}</td>
              <td>
                {item.sucursal === 0 ? 'IFISA 1' : null}
                {item.sucursal === 1 ? 'IFISA 2' : null}
                {item.sucursal !== 0 && item.sucursal !== 1 ? 'N/A' : null}
              </td>
              <td>
                {item.state === 0 ? 'Verdes' : null}
                {item.state === 1 ? 'Secas' : null}
                {item.state === 2 ? 'Reaparación' : null}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No hay registros</td>
          </tr>
        )}
      </Table>
      <Link to="/items/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    stockLog: state.stockLog,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(StockHistory)
