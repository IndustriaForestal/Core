import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../actions/app'
import Table from '../../components/Table/Table'
import AddButton from '../../components/AddButton/AddButton'
import Button from '../../components/Button/Button'
import './styles.scss'

const Nails = props => {
  const { pallets, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Inventarios',
      menu: {
        Tarimas: '/stock',
        Complementos: '/stockItems',
        Clavos: '/stockNails',
        'Materia Prima': '/stockMaterial',
      },
    }
    setTitle(topbar)
    props.getAll('pallets', 'GET_PALLETS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = [
    'Nombre',
    '1 Verdes',
    '1 Secas',
    '2 Verdes',
    '2 Secas',
    'Acciones',
  ]

  return (
    <>
      <Table head={tableHeader}>
        {pallets ? (
          pallets.map(pallet => (
            <tr key={pallet._id}>
              <td>{pallet.model}</td>
              <td>{pallet.stock[0].green}</td>
              <td>{pallet.stock[0].dry}</td>
              <td>{pallet.stock[1].green}</td>
              <td>{pallet.stock[1].dry}</td>
              <td>
                <Link to={`stock/update/${pallet._id}?type=pallet`}>
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
    pallets: state.pallets,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
