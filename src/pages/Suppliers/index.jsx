import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import './styles.scss'

const Suppliers = props => {
  const { suppliers, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Proveedores',
      menu: { Proveedores: '/suppliers' },
    }
    setTitle(topbar)
    props.getAll('suppliers', 'GET_SUPPLIERS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = ['Nombre', 'Capacidad', 'Material', 'Acciones']

  const handleDeleteSupplier = supplierId => {
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
        props.deleted(`suppliers/${supplierId}`, 'DELETE_SUPPLIER')
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  return (
    <>
      <Table head={tableHeader}>
        {suppliers ? (
          suppliers.map(supplier => (
            <tr key={supplier._id}>
              <td>{supplier.name}</td>
              <td>{supplier.capacity}</td>
              <td>{supplier.material.map(materialOne => materialOne.name)}</td>
              <td>
                <Link to={`suppliers/${supplier._id}`}>
                  <Button className="btn --warning">
                    <AiOutlineEdit />
                  </Button>
                </Link>
                <Button
                  className="btn --danger"
                  onClick={() => handleDeleteSupplier(supplier._id)}
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
      <Link to="/suppliers/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    suppliers: state.suppliers,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers)
