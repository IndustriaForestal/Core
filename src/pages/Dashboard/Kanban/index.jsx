import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  setTitle,
  setWraper,
  setModal,
  getAll,
  deleted,
  create,
  update,
} from '../../../actions/app'
import moment from 'moment'
import '../styles.scss'
import Loading from '../../../components/Loading/Loading'

const Dashbaord = props => {
  const {
    user,
    processes,
    orders,
    ordersProduction,
    ordersRequeriment,
    customers,
    pallets,
    qualities,
  } = props
  const role = user.role
  const [orderSelected, setOrderSelected] = useState(0)

  function useQuery() {
    const { search } = useLocation()

    return useMemo(() => new URLSearchParams(search), [search])
  }

  let query = useQuery()

  useEffect(() => {
    const topbar = {
      title: 'Pizarron',
      menu: {
        Pizarron: '/dashboard',
        'Pizarron Proceso': '/dashboard/processes',
        'Pizarron Inventario': '/dashboard/stock',
        'Pizarron Rechazo': '/dashboard/reject',
        'Pizarron Historial': '/dashboard/history',
      },
    }
    props.setTitle(topbar)
    props.setWraper(true)
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

    if (query.get('id') !== null) {
      setOrderSelected(parseInt(query.get('id')))
    }
  }, [])

  if (
    processes &&
    orders &&
    ordersProduction &&
    ordersRequeriment &&
    customers &&
    pallets &&
    qualities
  ) {
    const data =
      orderSelected !== 0
        ? ordersProduction.filter(o => o.order_id === orderSelected)
        : ordersProduction

    switch (role) {
      case 'Administrador':
        return (
          <div className="dashboard">
            <label htmlFor="filter">
              {' '}
              Filtrar por Orden
              <select
                name="filter"
                onChange={e => setOrderSelected(parseInt(e.target.value))}
              >
                <option value="0">Todas</option>
                {orders
                  .filter(o => o.state !== 'Enviado')
                  .map(o => (
                    <option key={o.id} value={o.id}>
                      {o.id}
                    </option>
                  ))}
              </select>
            </label>
            <div
              className="dashboard__header"
              style={{
                gridTemplateColumns: `repeat(${processes.length}, 200px)`,
              }}
            >
              {processes
                .sort((a, b) => a.dashboard_order - b.dashboard_order)
                .map(process => (
                  <div key={process.id}>
                    <div className="dashboard__name">{process.name}</div>
                    <div className="dashboard__production">
                      {data.filter(
                        order =>
                          order.ready === 0 && order.process_id === process.id
                      ).length > 0
                        ? data
                            .filter(
                              order =>
                                order.ready === 0 &&
                                order.process_id === process.id
                            )
                            .sort((a, b) => moment(a.time) - moment(b.time))
                            .map(order => {
                              const id = order.order_id

                              const ordersArray = ordersProduction.filter(
                                o => o.order_id === id
                              )
                              let validation

                              if (
                                parseInt(order.order_number) ===
                                ordersArray.length - 1
                              ) {
                                validation = true
                              } else {
                                const item = ordersArray.find(
                                  o =>
                                    parseInt(o.order_number) ===
                                    parseInt(order.order_number) + 1
                                )

                                if (item !== undefined && item.ready > 2) {
                                  validation = true
                                } else {
                                  validation = false
                                }

                                /*  parseInt(item.ready) > 2
                                  ? (validation = true)
                                  : (validation = false) */
                              }

                              return (
                                <div
                                  className={`dashboard__item ${
                                    moment(order.time).isBefore(moment())
                                      ? '--danger'
                                      : null
                                  } ${validation === true ? '' : '--disabled'}`}
                                  key={order.id}
                                >
                                  <span>Pedido# {order.order_id}</span>
                                  <span>
                                    Cliente:
                                    {customers.find(
                                      c =>
                                        c.id ===
                                        orders.find(
                                          o => o.id === order.order_id
                                        ).customer_id
                                    ) !== undefined
                                      ? customers.find(
                                          c =>
                                            c.id ===
                                            orders.find(
                                              o => o.id === order.order_id
                                            ).customer_id
                                        ).name
                                      : 'N/A'}
                                  </span>
                                  <span>
                                    Calidad:
                                    {qualities.find(
                                      c =>
                                        c.id ===
                                        pallets.find(
                                          o => o.id === order.pallet_id
                                        ).quality_id
                                    ) !== undefined
                                      ? qualities.find(
                                          c =>
                                            c.id ===
                                            pallets.find(
                                              o => o.id === order.pallet_id
                                            ).quality_id
                                        ).name
                                      : 'N/A'}
                                  </span>
                                  <span>Tarima: {order.model}</span>
                                  <span>Cantidad: {order.amount}</span>
                                  <span>
                                    Entrega:{' '}
                                    {moment(order.time).format(
                                      'DD-MM-YYYY HH:mm'
                                    )}
                                  </span>
                                </div>
                              )
                            })
                        : null}
                      {data.filter(
                        order =>
                          order.ready === 1 && order.process_id === process.id
                      ).length > 0
                        ? data
                            .filter(
                              order =>
                                order.ready === 1 &&
                                order.process_id === process.id
                            )
                            .sort((a, b) => moment(a.time) - moment(b.time))
                            .map(order => (
                              <div
                                className="dashboard__item --warning"
                                key={order.id}
                              >
                                <span>Pedido# {order.order_id}</span>
                                <span>
                                  Cliente:
                                  {customers.find(
                                    c =>
                                      c.id ===
                                      orders.find(o => o.id === order.order_id)
                                        .customer_id
                                  ) !== undefined
                                    ? customers.find(
                                        c =>
                                          c.id ===
                                          orders.find(
                                            o => o.id === order.order_id
                                          ).customer_id
                                      ).name
                                    : 'N/A'}
                                </span>
                                <span>
                                  Calidad:
                                  {qualities.find(
                                    c =>
                                      c.id ===
                                      pallets.find(
                                        o => o.id === order.pallet_id
                                      ).quality_id
                                  ) !== undefined
                                    ? qualities.find(
                                        c =>
                                          c.id ===
                                          pallets.find(
                                            o => o.id === order.pallet_id
                                          ).quality_id
                                      ).name
                                    : 'N/A'}
                                </span>
                                <span>Tarima: {order.model}</span>
                                <span>Cantidad: {order.amount}</span>
                                <span>
                                  Entrega:{' '}
                                  {moment(order.time).format(
                                    'DD-MM-YYYY HH:mm'
                                  )}
                                </span>
                              </div>
                            ))
                        : null}
                      {data.filter(
                        order =>
                          order.ready === 2 && order.process_id === process.id
                      ).length > 0
                        ? data
                            .filter(
                              order =>
                                order.ready === 2 &&
                                order.process_id === process.id
                            )
                            .sort((a, b) => moment(a.time) - moment(b.time))
                            .map(order => (
                              <div
                                className="dashboard__item --success"
                                key={order.id}
                              >
                                <span>Pedido# {order.order_id}</span>
                                <span>
                                  Cliente:
                                  {customers.find(
                                    c =>
                                      c.id ===
                                      orders.find(o => o.id === order.order_id)
                                        .customer_id
                                  ) !== undefined
                                    ? customers.find(
                                        c =>
                                          c.id ===
                                          orders.find(
                                            o => o.id === order.order_id
                                          ).customer_id
                                      ).name
                                    : 'N/A'}
                                </span>
                                <span>
                                  Calidad:
                                  {qualities.find(
                                    c =>
                                      c.id ===
                                      pallets.find(
                                        o => o.id === order.pallet_id
                                      ).quality_id
                                  ) !== undefined
                                    ? qualities.find(
                                        c =>
                                          c.id ===
                                          pallets.find(
                                            o => o.id === order.pallet_id
                                          ).quality_id
                                      ).name
                                    : 'N/A'}
                                </span>
                                <span>Tarima: {order.model}</span>
                                <span>Cantidad: {order.amount}</span>
                                <span>
                                  Entrega:{' '}
                                  {moment(order.time).format(
                                    'DD-MM-YYYY HH:mm'
                                  )}
                                </span>
                              </div>
                            ))
                        : null}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )

      default:
        return <div className="dashboard">X</div>
    }
  } else {
    return <Loading />
  }
}

const mapDispatchToProps = {
  setTitle,
  setWraper,
  setModal,
  getAll,
  deleted,
  create,
  update,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbaord)
