import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../actions/app'
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import './styles.scss'

const Customers = props => {
  const { customers, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Clientes',
      menu: { Clientes: '/customers' },
    }
    setTitle(topbar)
    props.getAll('customers', 'GET_CUSTOMERS')
    // eslint-disable-next-line
  }, [])

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
    props.deleted(`customers/${customerID}`, 'DELETE_CUSTOMER')
  }

  return (
    <>
      <Table head={tableHeader}>
        {customers.length > 0 ? (
          customers.map(customer => (
            <tr key={customer._id}>
              <td>{customer._id}</td>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.shipment}</td>
              <td>
                <Link to={`customers/${customer._id}`}>
                  <Button className="btn --warning">
                    <AiOutlineEdit />
                  </Button>
                </Link>
                <Button
                  className="btn --danger"
                  onClick={() => handlerDeleteCustomer(customer._id)}
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
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers)
