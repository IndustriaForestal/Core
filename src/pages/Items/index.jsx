import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { setTitle, setWraper, getAll, deleted } from '../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import SearchBar from '../../components/SearchBar/SearchBar'

const Items = props => {
  const { items, setTitle, setWraper, role } = props
  const [filter, setFilter] = useState([])

  useEffect(() => {
    const topbar = {
      title: 'Complementos',
      menu: {
        Tarimas: '/pallets',
        Complementos: '/items',
        Clavos: '/nails',
        Calidades: '/qualities',
      },
    }
    setTitle(topbar)
    props.getAll('items', 'GET_ITEMS')
    setWraper(true)
    // eslint-disable-next-line
  }, [])

  let tableHeader
  role === 'Administrador'
    ? (tableHeader = [
        'Nombre',
        'Descripción',
        'Largo',
        'Ancho',
        'Alto',
        'Inventario',
        'Acciones',
      ])
    : (tableHeader = [
        'Nombre',
        'Descripción',
        'Largo',
        'Ancho',
        'Alto',
        'Inventario',
      ])

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

  const handleSearch = e => {
    const searchWord = e.target.value.toLowerCase()
    const filterPallets = items.filter(item =>
      item.name.toLowerCase().includes(searchWord)
    )
    setFilter(filterPallets)
  }

  let tableData
  if (filter.length > 0) {
    tableData = filter
  } else {
    tableData = items
  }

  return (
    <>
      <SearchBar onChange={handleSearch} />
      <Table head={tableHeader}>
        {items ? (
          tableData.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.length}</td>
              <td>{item.width}</td>
              <td>{item.height}</td>
              <td>{item.stock}</td>
              {role === 'Administrador' ? (
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
              ) : null}
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
    items: state.reducerItems.items,
    role: state.reducerApp.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  setWraper,
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
