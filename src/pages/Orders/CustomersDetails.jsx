import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { updatePalletsStock, completeOrder } from './actions'
import { setTitle, getAll, deleted, create } from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import Button from '../../components/Button/Button'
import MaterialTable from 'material-table'
import Swal from 'sweetalert2'
import './styles.scss'
import moment from 'moment'

const Orders = props => {
  const { setTitle, pallets, orders, ordersCustomersDetails } = props
  const { id } = useParams()
  useEffect(() => {
    const topbar = {
      title: 'Pedidos de Clientes',
      menu: { 'Pedidos de Clientes': '/orders-customers', Calendario: '/calendar' },
    }
    setTitle(topbar)
    props
      .getAll(`orders/customers/${id}`, 'GET_ORDERS_CUSTOMERS_DETAILS')
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
      .then(() => {
        props.getAll('orders', 'GET_ORDERS')
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

  if (ordersCustomersDetails && pallets) {
    const lookupPallets = {}
    pallets.map(m => (lookupPallets[m.id] = m.model))

    const data = ordersCustomersDetails.map(o => {

      // const delivered = orders.filter(x => parseInt(x.order_id) === parseInt(o.id) && x.state !== 'Enviado').map(y => y)

      return {
        ...o,
        delivery: moment(o.delivery).format('DD-MM-YYYY HH:mm:SS'),
      }
    })

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'Tarima', field: 'pallet_id', lookup: lookupPallets },
            { title: 'Cantidad', field: 'amount' },
            { title: 'Solicitadas', field: 'ready' },
            { title: 'Entregadas', field: 'ready' },
            { title: 'Fecha Limite', field: 'delivery' },
            {
              title: 'Acciones',
              field: 'state',
              render: rowData =>
                rowData.state !== 'Cancelada' ? (
                  <>
                    <Link to={`/orders/create/${id}`}>
                      <Button className="btn --success">Embarque</Button>{' '}
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
          data={data}
          title="Pedidos"
        />
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    ordersCustomers: state.reducerOrders.ordersCustomers,
    ordersCustomersDetails: state.reducerOrders.ordersCustomersDetails,
    pallets: state.reducerPallets.pallets,
    orders: state.reducerOrders.orders,
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
