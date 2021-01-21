import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { BsPlus } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { setTitle, getAll, deleted } from '../../../actions/app'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import AddButton from '../../../components/AddButton/AddButton'
import './styles.scss'

const Nails = props => {
  const { nails, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Inventarios',
      menu: {
        Tarimas: '/stock',
        Complementos: '/stockItems',
        Clavos: '/stockNails',
        'Materia Prima': '/stockMaterial',
        'Entradas y salidas': '/stockChanges',
        'Historial': '/stockHistory',
      },
    }
    setTitle(topbar)
    props.getAll('nails', 'GET_NAILS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = ['Nombre', 'Stock', 'Acciones']

  return (
    <>
      <Table head={tableHeader}>
        {nails ? (
          nails.map(nail => (
            <tr key={nail._id}>
              <td>{nail.name}</td>
              <td>{nail.stock}</td>
              <td>
                <Link to={`stock/update/${nail._id}?type=nail`}>
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
      <Link to="/nails/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    nails: state.nails,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
