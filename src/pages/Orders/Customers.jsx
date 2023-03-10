import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updatePalletsStock, completeOrder } from './actions'
import { BsPlus } from 'react-icons/bs'
import {
  setTitle,
  getAll,
  deleted,
  create,
  update,
} from '../../actions/app'
import AddButton from '../../components/AddButton/AddButton'
import Loading from '../../components/Loading/Loading'
import Button from '../../components/Button/Button'
import MaterialTable from 'material-table'
import moment from 'moment'
import Swal from 'sweetalert2'
import './styles.scss'

const Orders = props => {
  const {
    setTitle,
    ordersCustomers,
    customers,
    orders,
    ordersProduction,
  } = props
  useEffect(() => {
    const topbar = {
      title: 'Pedidos de Clientes',
      menu: {
        'Pedidos de Clientes': '/orders-customers',
        Calendario: '/calendar',
      },
    }
    setTitle(topbar)
    props
      .getAll('orders/customers', 'GET_ORDERS_CUSTOMERS')
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
      .then(() => {
        props.getAll('orders', 'GET_ORDERS')
      })
      .then(() => {
        props.getAll('customers', 'GET_CUSTOMERS')
      })
      .then(() => {
        props.getAll('orders/production', 'GET_ORDERS_PRODUCTION')
      })
    // eslint-disable-next-line
  }, [])

  const handleCancel = id => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      input: 'select',
      inputOptions: {
        Cancelar: 'Cancelar',
      },
      inputPlaceholder: 'Seleccione un motivo',
      showCancelButton: true,
      confirmButtonText: 'Si, cancelar',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputValidator: value => {
        if (!value) {
          return 'La descripción es requerida'
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result.isConfirmed) {
        const desc = result.value
        props
          .create(`orders/cancel/${id}`, 'CANCEL', {
            id,
            desc,
            status: 'Cancelada',
          })
          .then(() => {
            props.getAll('orders', 'GET_ORDERS_CUSTOMERS')
          })
          .then(() => {
            props.getAll('orders/customers', 'GET_ORDERS_CUSTOMERS')
          })
      }
    })
  }

  const handleDate = id => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      input: 'text',
      inputPlaceholder: 'AAAA-MM-DD HH:MM:SS',
      showCancelButton: true,
      confirmButtonText: 'Si, cancelar',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputValidator: value => {
        if (!value) {
          return 'Nueva fecha es requerida'
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result.isConfirmed) {
        const desc = result.value
        props
          .update(`orders/reschedule/${id}`, 'RESCHEDULE', {
            id,
            delivery: desc,
            state: 'Reprogramada',
          })
          .then(() => {
            props.getAll('orders', 'GET_ORDERS_CUSTOMERS')
          })
          .then(() => {
            props.getAll('orders', 'GET_ORDERS')
          })
          .then(() => {
            props.getAll('orders/customers', 'GET_ORDERS_CUSTOMERS')
          })
      }
    })
  }

  const handleComplete = id => {
    props
      .update(`orders/completed/${id}`, 'Completed', { id })
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
      .then(() => {
        props.getAll('orders', 'GET_ORDERS')
      })
      .then(() => {
        props.getAll('customers', 'GET_CUSTOMERS')
      })
      .then(() => {
        props.getAll('orders/production', 'GET_ORDERS_PRODUCTION')
      })
  }

  if (ordersCustomers && customers && orders && ordersProduction) {
    const lookupCustomers = {}
    customers.map(m => (lookupCustomers[m.id] = m.name))
    return (
      <>
        <MaterialTable
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'Orden Compra', field: 'op' },
            { title: 'Estado', field: 'state' },
            {
              title: 'Cliente',
              field: 'customer_id',
              lookup: lookupCustomers,
            },
            { title: 'Fecha Limite', field: 'delivery' },
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
          detailPanel={rowData => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <th># Embarque</th>
                      <th>Estado Actual</th>
                      <th colSpan={2}>Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.filter(
                      o =>
                        parseInt(o.order_id) === parseInt(rowData.id)
                    ).length > 0 ? (
                      orders
                        .filter(
                          o =>
                            parseInt(o.order_id) ===
                            parseInt(rowData.id)
                        )
                        .map(o => (
                          <tr>
                            <td>{o.id}</td>
                            <td>{o.state}</td>
                            <td>
                              {o.state === 'Completado' ? (
                                'Completado'
                              ) : ordersProduction
                                  .filter(p => p.order_id === o.id)
                                  .find(x => x.order_number === 0) !==
                                undefined ? (
                                ordersProduction
                                  .filter(p => p.order_id === o.id)
                                  .find(x => x.order_number === 0)
                                  .ready > 2 ? (
                                  <Button
                                    className="btn --success"
                                    onClick={() =>
                                      handleComplete(o.id)
                                    }
                                  >
                                    Completar
                                  </Button>
                                ) : (
                                  <>
                                    <Button
                                      className="btn --danger"
                                      onClick={() => {
                                        handleCancel(o.id)
                                      }}
                                    >
                                      Cancelar
                                    </Button>
                                    <Button
                                      className="btn --info"
                                      onClick={() => {
                                        handleDate(o.id)
                                      }}
                                    >
                                      Reprogramar
                                    </Button>
                                    <Button
                                      className="btn --info"
                                      onClick={() => {
                                        props.history.push(
                                          '/orders-details/' + o.id
                                        )
                                      }}
                                    >
                                      Detalles
                                    </Button>
                                  </>
                                )
                              ) : (
                                o.description
                              )}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <div>
                        <h3>Sin Embarques Programados</h3>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            )
          }}
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
          data={ordersCustomers.map(o => {
            return {
              ...o,
              delivery: moment(o.delivery).format(
                'DD-MM-YYYY HH:mm:SS'
              ),
            }
          })}
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
    ordersProduction: state.reducerOrders.ordersProduction,
    user: state.reducerApp.user,
    orders: state.reducerOrders.orders,
  }
}

const mapDispatchToProps = {
  setTitle,
  updatePalletsStock,
  completeOrder,
  getAll,
  update,
  deleted,
  create,
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
