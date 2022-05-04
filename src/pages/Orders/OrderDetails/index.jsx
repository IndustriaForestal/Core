import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import {
  searchCapacities,
  completeOrder,
  updatePalletsStock,
} from '../actions'
import {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  update,
  setSocket,
} from '../../../actions/app'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading/Loading'
import MaterialTable from 'material-table'
import './styles.scss'

const OrderDetails = props => {
  const {
    setTitle,
    user,
    processes,
    orders,
    ordersProduction,
    ordersRequeriment,
    customers,
    pallets,
    qualities,
    ordersCustomers,
    ordersWork,
    ordersWorkstations,
    workstations,
    ordersStoves,
  } = props
  const { id } = useParams()

  useEffect(() => {
    const topbar = {
      title: 'Detalle de Orden de Embarque',
      menu: {
        'Detalle de Orden de Embarque': '/orders-details/' + id,
        'Pedidos Clientes': '/orders-customers',
        Calendario: '/calendar',
      },
    }
    setTitle(topbar)
    props
      .getAll('processes', 'GET_PROCESSES')
      .then(() => {
        props.getAll('orders/production', 'GET_ORDERS_PRODUCTION')
      })
      .then(() => {
        props.getAll('orders/requeriment', 'GET_ORDERS_REQUERIMENT')
      })
      .then(() => {
        props.getAll('orders', 'GET_ORDERS')
      })
      .then(() => {
        props.getAll('customers', 'GET_CUSTOMERS')
      })
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
      .then(() => {
        props.getAll('qualities', 'GET_QUALITIES')
      })
      .then(() => {
        props.getAll('orders/customers', 'GET_ORDERS_CUSTOMERS')
      })
      .then(() => {
        props.getAll('orders/work', 'GET_ORDERS_WORK')
      })
      .then(() => {
        props.getAll('orders/workstations', 'GET_ORDERS_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('zones/workstations', 'GET_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('orders/stoves', 'GET_ORDERS_STOVES')
      })
    // eslint-disable-next-line
  }, [])

  if (
    processes &&
    orders &&
    ordersProduction &&
    ordersRequeriment &&
    customers &&
    pallets &&
    qualities &&
    ordersCustomers &&
    ordersWork &&
    ordersWorkstations &&
    workstations &&
    ordersStoves
  ) {
    const order = orders.find(
      order => parseInt(order.id) === parseInt(id)
    )

    const orderCustomer = ordersCustomers.find(
      o => parseInt(o.id) === parseInt(order.order_id)
    )

    const orderProduction = ordersProduction
      .filter(o => o.order_id === order.id)
      .sort((a, b) => a.order_number - b.order_number)
      .map(o => {
        return {
          ...o,
          order_number: o.order_number + 1,
          process: processes.find(p => p.id === o.process_id).name,
          state:
            o.start === null
              ? moment().isAfter(moment(o.time))
                ? 'Retrazado'
                : 'Pendiente'
              : 'Completado',
          time: moment(o.time).format('DD/MM/YYYY HH:mm'),
        }
      })

    /* const data = ordersStoves
      .filter()
      .sort((a, b) => b.id - a.id)
      .map(item => {
        const product =
          item.type === 'pallets'
            ? item.pname
            : item.type === 'items'
            ? `${item.ilength} x ${item.iwidth} x ${item.iheight} cm`
            : item.type === 'complements'
            ? item.cname
            : item.type === 'sawns'
            ? `${item.slength} x ${item.swidth} x ${item.sheight} cm`
            : item.type === 'warehouse'
            ? `Almacen: ${item.wname}`
            : `${item.m3} m3`
        return {
          ...item,
          product,
          created: moment(item.created).format('DD-MM-YYYY HH:mm:ss'),
        }
      })
 */

    const orderWork = ordersWork.filter(
      o => parseInt(o.order_id) === parseInt(id)
    )

    const orderStove = []

    orderWork.map(o => {
      const stove = ordersStoves.find(s => s.order_id === o.id)

      if (stove) {
        orderStove.push(stove)
      }
    })

    return (
      <>
        <Card title="Pedido">
          <div>OP: {orderCustomer.op}</div>
          <div>Estado: {orderCustomer.state}</div>
          <div>
            Cliente:{' '}
            {
              customers.find(c => c.id === orderCustomer.customer_id)
                ?.name
            }
          </div>
          <div>
            Creado:{' '}
            {moment(orderCustomer.created).format(
              'DD-MM-YYYY HH:mm:ss'
            )}
          </div>
          <div>
            Fecha Limite:{' '}
            {moment(orderCustomer.delivery).format(
              'DD-MM-YYYY HH:mm:ss'
            )}
          </div>
        </Card>
        <Card title="Orden de embarque">
          <div>Estado: {order.state}</div>
          <div>
            Creado:{' '}
            {moment(order.created).format('DD-MM-YYYY HH:mm:ss')}
          </div>
          <div>
            Fecha Limite:{' '}
            {moment(order.delivery).format('DD-MM-YYYY HH:mm:ss')}
          </div>
        </Card>
        <MaterialTable
          columns={[
            { title: '#', field: 'order_number' },
            { title: 'Tarima', field: 'model' },
            { title: 'Proceso', field: 'process' },
            { title: 'Estado', field: 'state' },
            { title: 'Inicia', field: 'time' },
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
          data={orderProduction}
          title="Ordenes de Producción"
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
                <table style={{ width: '90%' }}>
                  <thead>
                    <tr>
                      <th>Estado</th>
                      <th>Cantidad</th>
                      <th>Inicio</th>
                      <th>Finalizado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersWork.filter(
                      o => parseInt(o.op_id) === parseInt(rowData.id)
                    ).length > 0 ? (
                      ordersWork
                        .filter(
                          o =>
                            parseInt(o.op_id) === parseInt(rowData.id)
                        )
                        .map(o => (
                          <tr>
                            <td>
                              {o.ready === 0
                                ? 'Pendiente'
                                : o.ready === 1
                                ? 'En proceso'
                                : o.ready === 2
                                ? 'Revisión'
                                : 'Completada'}
                            </td>
                            <td>{o.amount}</td>
                            <td>
                              {moment(o.start).format(
                                'DD/MM/YY HH:mm'
                              )}
                            </td>
                            <td>
                              {moment(o.end).format('DD/MM/YY HH:mm')}
                            </td>
                            <td>
                              {moment(o.end).format('DD/MM/YY HH:mm')}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <div style={{ textAlign: 'center' }}>
                        <h3>Sin Ordenes de trabajo</h3>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            )
          }}
        />
        <MaterialTable
          columns={[
            { title: 'Orden Trabajo', field: 'id' },
            { title: 'Fecha', field: 'created' },
            {
              title: 'Archivo',
              field: 'pdf',
              render: rowData => {
                return (
                  <a
                    target="blank"
                    href={`${process.env.REACT_APP_API}docs/stoves/${rowData.file}`}
                  >
                    <Button>Archivo</Button>
                  </a>
                )
              },
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
          }}
          data={orderStove.map(o => {
            return {
              ...o,
              created: moment(o.created).format('DD/MM/YY HH:mm'),
            }
          })}
          title="Graficas de estufado"
        />
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    user: state.reducerApp.user,
    modal: state.reducerApp.modal,
    processes: state.reducerProcesses.processes,
    orders: state.reducerOrders.orders,
    ordersProduction: state.reducerOrders.ordersProduction,
    ordersRequeriment: state.reducerOrders.ordersRequeriment,
    items: state.reducerItems.items,
    customers: state.reducerCustomers.customers,
    pallets: state.reducerPallets.pallets,
    qualities: state.reducerQualities.qualities,
    ordersCustomers: state.reducerOrders.ordersCustomers,
    ordersWork: state.reducerOrders.ordersWork,
    ordersWorkstations: state.reducerOrders.ordersWorkstations,
    workstations: state.reducerZones.workstations,
    ordersStoves: state.reducerOrders.ordersStoves,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  get,
  searchCapacities,
  completeOrder,
  updatePalletsStock,
  create,
  update,
  setSocket,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails)
