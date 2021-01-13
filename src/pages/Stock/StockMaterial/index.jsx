import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { BsPlus } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { setTitle, getAll, deleted } from '../../../actions/app'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import AddButton from '../../../components/AddButton/AddButton'
import './styles.scss'

const Nails = props => {
  const { raws, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Inventarios',
      menu: {
        Tarimas: '/stock',
        Complementos: '/stockItems',
        Clavos: '/stockNails',
        'Materia Prima': '/stockMaterial',
        'Entradas y salidas': '/stockChanges',
      },
    }
    setTitle(topbar)
    props.getAll('raws', 'GET_RAWS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = ['Nombre', 'Stock', 'Acciones']

  return (
    <>
      <Table head={tableHeader}>
        {raws ? (
          raws.map(row => (
            <tr key={row._id}>
              <td>{row.name}</td>
              <td>{row.stock}</td>
              <td>
                <Link to={`stock/update/${row._id}?type=raw`}>
                  <Button className="btn --warning">
                    <AiOutlineEdit />
                  </Button>
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No hay registros</td>
          </tr>
        )}
      </Table>
      <Link to="/raws/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    raws: state.raws,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
