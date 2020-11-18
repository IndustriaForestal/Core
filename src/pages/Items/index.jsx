import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { setTitle, setWraper, getAll, deleted } from '../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import './styles.scss'

const Items = props => {
  const { items, setTitle, setWraper } = props

  useEffect(() => {
    const topbar = {
      title: 'Complementos',
      menu: { Complementos: '/items' },
    }
    setTitle(topbar)
    props.getAll('items', 'GET_ITEMS')
    setWraper(true)
    // eslint-disable-next-line
  }, [])

  const tableHeader = [
    'Nombre',
    'Descripción',
    'Largo',
    'Ancho',
    'Alto',
    'Inventario',
    'Acciones',
  ]

  const handleDeleteItem = itemId => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
    }).then(result => {
      if (result.isConfirmed) {
        props.deleted(`items/${itemId}`, 'DELETE_ITEM')
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  return (
    <>
      <Table head={tableHeader}>
        {items ? (
          items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.length}</td>
              <td>{item.width}</td>
              <td>{item.height}</td>
              <td>{item.stock}</td>
              <td>
                <Link to={`items/${item._id}`}>
                  <Button className="btn --warning">
                    <AiOutlineEdit />
                  </Button>
                </Link>
                <Button
                  className="btn --danger"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  <AiOutlineDelete />
                </Button>
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
  setWraper,
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
