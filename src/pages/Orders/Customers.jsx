import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updatePalletsStock, completeOrder } from './actions'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted, create } from '../../actions/app'
import AddButton from '../../components/AddButton/AddButton'
import Loading from '../../components/Loading/Loading'
import Button from '../../components/Button/Button'
import MaterialTable from 'material-table'
import Swal from 'sweetalert2'
import './styles.scss'

const Orders = props => {
  const { setTitle, ordersCustomers, customers } = props
  useEffect(() => {
    const topbar = {
      title: 'Pedidos de Clientes',
      menu: { 'Pedidos de Clientes': '/orders', Calendario: '/calendar' },
    }
    setTitle(topbar)
    props
      .getAll('orders/customers', 'GET_ORDERS_CUSTOMERS')
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
      .then(() => {
        props.getAll('customers', 'GET_CUSTOMERS')
      })
    // eslint-disable-next-line
  }, [])

  const handleCancel = id => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        props.create(`orders/cancel/${id}`, 'CANCEL', { id }).then(() => {
          props.getAll('orders', 'GET_ORDERS_CUSTOMERS')
        })
      }
    })
  }

  if (ordersCustomers && customers) {
    const lookupCustomers = {}
    customers.map(m => (lookupCustomers[m.id] = m.name))
    return (
      <>
        <MaterialTable
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'Estado', field: 'state' },
            { title: 'Cliente', field: 'customer_id', lookup: lookupCustomers },
            {
              title: 'Acciones',
              field: 'state',
              render: rowData =>
                rowData.state !== 'Cancelada' ? (
                  <>
                    <Link to={`/orders-customers/${rowData.id}`}>
                      <Button className="btn">Detalle</Button>{' '}
                    </Link>
                  </>
                ) : null,
            },
          ]}
          localization={{
            pagination: {
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'Filas',
              firstAriaLabel: 'Primera',
              firstTooltip: 'Primera',
              previousAriaLabel: 'Anterior',
              previousTooltip: 'Anterior',
              nextAriaLabel: 'Siguiente',
              nextTooltip: 'Siguiente',
              lastAriaLabel: 'Ultimo',
              lastTooltip: 'Ultimo',
            },
            toolbar: {
              searchTooltip: 'Buscar',
              searchPlaceholder: 'Buscar',
            },
            header: {
              actions: 'Acciones',
            },
            body: {
              editRow: {
                deleteText: '¿Eliminar?',
                saveTooltip: 'Ok',
                cancelTooltip: 'Cancelar',
              },
              editTooltip: 'Editar',
              deleteTooltip: 'Eliminar',
              addTooltip: 'Agregar',
            },
          }}
          data={ordersCustomers}
          title="Pedidos"
        />

        <Link to="/orders-customers/create">
          <AddButton>
            <BsPlus />
          </AddButton>
        </Link>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    ordersCustomers: state.reducerOrders.ordersCustomers,
    customers: state.reducerCustomers.customers,
    user: state.reducerApp.user,
  }
}

const mapDispatchToProps = {
  setTitle,
  updatePalletsStock,
  completeOrder,
  getAll,
  deleted,
  create,
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
