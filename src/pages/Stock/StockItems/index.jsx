import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { BsPlus } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { setTitle, getAll, deleted } from '../../../actions/app'
import Table from '../../../components/Table/Table'
import AddButton from '../../../components/AddButton/AddButton'
import Button from '../../../components/Button/Button'
import './styles.scss'

const Nails = props => {
  const { items, setTitle } = props

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
    props.getAll('items', 'GET_ITEMS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = ['Nombre', 'Stock', 'Acciones']

  return (
    <>
      <Table head={tableHeader}>
        {items ? (
          items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>
                <Link to={`stock/update/${item._id}?type=item`}>
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
    items: state.items,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
