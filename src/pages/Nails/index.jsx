import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import SearchBar from '../../components/SearchBar/SearchBar'
import './styles.scss'

const Nails = props => {
  const { nails, setTitle } = props
  const [filter, setFilter] = useState([])

  useEffect(() => {
    const topbar = {
      title: 'Clavos',
      menu: { Tarimas: '/pallets', Complementos: '/items', Clavos: '/nails', Calidades: '/qualities' },

    }
    setTitle(topbar)
    props.getAll('nails', 'GET_NAILS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = ['Nombre', 'Stock', 'Acciones']

  const handleDeleteNail = nailId => {
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
        props.deleted(`nails/${nailId}`, 'DELETE_NAIL')
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  const handleSearch = e => {
    const searchWord = e.target.value.toLowerCase()
    const filterPallets = nails.filter(nail =>
      nail.name.toLowerCase().includes(searchWord)
    )
    setFilter(filterPallets)
  }

  let tableData
  if (filter.length > 0) {
    tableData = filter
  } else {
    tableData = nails
  }

  return (
    <>
      <SearchBar onChange={handleSearch} />
      <Table head={tableHeader}>
        {nails ? (
          tableData.map(nail => (
            <tr key={nail._id}>
              <td>{nail.name}</td>
              <td>{nail.stock}</td>
              <td>
                <Link to={`nails/${nail._id}`}>
                  <Button className="btn --warning">
                    <AiOutlineEdit />
                  </Button>
                </Link>
                <Button
                  className="btn --danger"
                  onClick={() => handleDeleteNail(nail._id)}
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
