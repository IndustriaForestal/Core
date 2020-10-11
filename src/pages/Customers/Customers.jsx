import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { deleteCustomer } from './actions'
import { setTitle } from '../../actions/app'
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'

const Customers = props => {
  const { customers } = props
  useEffect(() => {
    const topbar = {
      title: 'Clientes',
      menu: { Clientes: '/customers' },
    }
    props.setTitle(topbar)
  })
  const tableHeader = [
    '#',
    'Nombre',
    'Dirección',
    'Email',
    'Teléfono',
    'Embarques Semana',
    'Acciones',
  ]

  const handlerDeleteCustomer = customerID => {
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
        props.deleteCustomer(customerID)
        Swal.fire('Borrado!', 'El cliente fue borrado.', 'success')
      }
    })
  }

  return (
    <>
      <Table head={tableHeader}>
        {customers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.address}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{customer.numberShipments}</td>
            <td>
              <Button className="btn --warning">
                <AiOutlineEdit />
              </Button>
              <Button className="btn --danger" onClick={() => handlerDeleteCustomer(customer.id)}>
                <AiOutlineDelete />
              </Button>
            </td>
          </tr>
        ))}
      </Table>
      <Link to="/customers/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    customers: state.customers,
  }
}

const mapDispatchToProps = {
  deleteCustomer,
  setTitle,
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers)
