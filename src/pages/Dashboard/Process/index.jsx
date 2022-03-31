import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  setWraper,
  setModal,
  setModalReview,
  getAll,
  deleted,
  create,
  update,
} from '../../../actions/app'
import moment from 'moment'
import './styles.scss'
import Loading from '../../../components/Loading/Loading'
import Production from '../DashboardProduction'

const Dashbaord = props => {
  const {
    user,
    processes,
    ordersProduction,
    ordersRequeriment,
    workstations,
    pallets,
    qualities,
    orders,
    ordersWorkstations,
    items,
    itemsType,
  } = props
  const [processSelected, setProcess] = useState('')
  const [orderSelected, setOrderSelected] = useState(0)
  const role = user.role

  useEffect(() => {
    const topbar = {
      title: 'Orden de producción',
      menu: {
        'Orden de producción': '/dashboard/processes',
        'Orden de producción rechazo': '/dashboard/reject',
        'Orden de producción historial': '/dashboard/history',
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
        props.getAll('orders/workstations', 'GET_ORDERS_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('orders/requeriment', 'GET_ORDERS_REQUERIMENT')
      })
      .then(() => {
        props.getAll('items', 'GET_ITEMS')
      })
      .then(() => {
        props.getAll('items/type', 'GET_ITEMS_TYPE')
      })
      .then(() => {
        props.getAll('zones/workstations', 'GET_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('specialProcesses', 'GET_SPECIAL_PROCESSES')
      })
      .then(() => {
        props.getAll('processes/reject', 'GET_PROCESSES_REJECT')
      })
      .then(() => {
        props.getAll(
          'specialProcesses/pallets',
          'GET_SPECIAL_PROCESSES_PALLETS'
        )
      })
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
      .then(() => {
        props.getAll('qualities', 'GET_QUALITIES')
      })
      .then(() => {
        props.getAll('orders', 'GET_ORDERS')
      })
  }, [])

  useEffect(() => {
    if (workstations) {
      if (parseInt(user.workstation_id) > 0) {
        const process = workstations.find(
          w => w.id === parseInt(user.workstation_id)
        ).process_id

        setProcess(process)
      }
    }
  }, [workstations])

  const handleEnd = orderId => {
    const orderProcess = ordersProduction.find(o => o.id === orderId).process_id

    orderProcess === 36
      ? props.update(`orders/end/${orderId}`, 'START_ORDER', {}).then(() => {
          props.getAll('orders/production', 'GET_ORDERS_PRODUCTION')
        })
      : props.history.push(`/dashboard/production/${orderId}`)
  }

  if (
    processes &&
    ordersProduction &&
    ordersRequeriment &&
    workstations &&
    pallets &&
    qualities &&
    ordersWorkstations &&
    orders &&
    items &&
    itemsType
  ) {
    const ordersProductionFiltered =
      orderSelected !== 0
        ? ordersProduction.filter(o => o.order_id === orderSelected)
        : ordersProduction

    const data =
      parseInt(user.workstation_id) > 0
        ? ordersProductionFiltered.filter(
            o =>
              o.process_id ===
              workstations.find(w => w.id === parseInt(user.workstation_id))
                .process_id
          )
        : ordersProductionFiltered

    return (
      <div className="dashboard">
        {role === 'Administrador' ? (
          <select name="Process" onChange={e => setProcess(e.target.value)}>
            <option value="">Seleccionar</option>
            {processes.map(process => (
              <option key={process.id} value={process.id}>
                {process.name}
              </option>
            ))}
          </select>
        ) : (
          <div>
            <h1>
              Proceso:{' '}
              {
                processes.find(
                  p =>
                    p.id ===
                    workstations.find(
                      w => w.id === parseInt(user.workstation_id)
                    ).process_id
                ).name
              }
            </h1>
          </div>
        )}
        <label htmlFor="filter">
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
          <div>
            <div className="dashboard__name">En Espera</div>
            <div className="dashboard__production">
              {data.filter(
                order =>
                  parseInt(order.process_id) === parseInt(processSelected) &&
                  parseInt(order.ready) === 0
              ).length > 0
                ? data
                    .filter(
                      order =>
                        parseInt(order.process_id) ===
                          parseInt(processSelected) &&
                        parseInt(order.ready) === 0
                    )
                    .sort((a, b) => moment(a.time) - moment(b.time))
                    .map(order => {
                      const id = order.order_id

                      const ordersArray = ordersProduction
                        .filter(o => o.order_id === id)
                        .sort(
                          (a, b) =>
                            moment(a.order_number) - moment(b.order_number)
                        )

                      function removeDuplicates(originalArray, prop) {
                        const newArray = []
                        const lookupObject = {}

                        for (const i in originalArray) {
                          lookupObject[originalArray[i][prop]] =
                            originalArray[i]
                        }

                        for (const i in lookupObject) {
                          newArray.push(lookupObject[i])
                        }
                        return newArray
                      }

                      const uniqueArray = removeDuplicates(
                        ordersArray,
                        'order_number'
                      )

                      let validation

                      if (
                        parseInt(order.order_number) ===
                        uniqueArray.length - 1
                      ) {
                        validation = true
                      } else {
                        const item = uniqueArray.find(
                          o =>
                            parseInt(o.order_number) ===
                            parseInt(order.order_number) + 1
                        )

                        item !== undefined && parseInt(item.ready) > 2
                          ? (validation = true)
                          : (validation = false)
                      }

                      const item = items.find(i => i.id === order.item_id)

                      if (validation === true) {
                        return (
                          <div
                            className={`dashboard__item ${
                              moment(order.time).isBefore(moment())
                                ? '--danger'
                                : null
                            }`}
                            key={order.id}
                            onClick={() =>
                              props.setModal({ state: true, order })
                            }
                          >
                            <span>Pedido# {order.order_id}</span>
                            <span>
                              Calidad:
                              {qualities.find(
                                c =>
                                  c.id ===
                                  pallets.find(o => o.id === order.pallet_id)
                                    .quality_id
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
                            {order.item_id !== null ? (
                              <span>
                                Complemento:{' '}
                                {item !== undefined
                                  ? `${item.length} x ${item.width} x ${item.height}`
                                  : 'N/A'}
                              </span>
                            ) : null}
                            <span>
                              Cantidad: {order.amount}{' '}
                              {order.item_id !== null
                                ? itemsType.find(
                                    i => i.id === item.item_type_id
                                  ) !== undefined
                                  ? itemsType.find(
                                      i => i.id === item.item_type_id
                                    ).name
                                  : 'Error Material'
                                : null}
                            </span>
                            <span>
                              Entrega:{' '}
                              {moment(order.time).format('DD-MM-YYYY HH:mm')}
                            </span>
                          </div>
                        )
                      } else {
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
                            <span>Tarima: {order.model}</span>
                            {order.item_id !== null ? (
                              <span>
                                Complemento:{' '}
                                {item !== undefined
                                  ? `${item.length} x ${item.width} x ${item.height}`
                                  : 'N/A'}
                              </span>
                            ) : null}
                            <span>
                              Entrega:{' '}
                              {moment(order.time).format('DD-MM-YYYY HH:mm')}
                            </span>
                          </div>
                        )
                      }
                    })
                : null}
            </div>
          </div>
          <div>
            <div className="dashboard__name">En Proceso</div>
            <div className="dashboard__production">
              {data.filter(
                order =>
                  parseInt(order.process_id) === parseInt(processSelected) &&
                  parseInt(order.ready) === 1
              ).length > 0
                ? data
                    .filter(
                      order =>
                        parseInt(order.process_id) ===
                          parseInt(processSelected) &&
                        parseInt(order.ready) === 1
                    )
                    .sort((a, b) => moment(a.time) - moment(b.time))
                    .map(order => {
                      const item = items.find(i => i.id === order.item_id)
                      return (
                        <div
                          className={`dashboard__item ${
                            moment(order.time).isBefore(moment())
                              ? '--danger'
                              : null
                          }`}
                          key={order.id}
                          onClick={
                            order.delivered === 1
                              ? () => handleEnd(order.id)
                              : null
                          }
                        >
                          <span>
                            {console.log(order)}
                            {order.require_stock === 1
                              ? 'Esperar madera de inventario'
                              : null}
                          </span>
                          <span>
                            {order.delivered === 0
                              ? 'Esperar entrega de madera'
                              : null}
                          </span>
                          <span>Pedido# {order.order_id}</span>
                          <span>
                            Calidad:
                            {qualities.find(
                              c =>
                                c.id ===
                                pallets.find(o => o.id === order.pallet_id)
                                  .quality_id
                            ) !== undefined
                              ? qualities.find(
                                  c =>
                                    c.id ===
                                    pallets.find(o => o.id === order.pallet_id)
                                      .quality_id
                                ).name
                              : 'N/A'}
                          </span>
                          <span>Tarima: {order.model}</span>
                          {order.item_id !== null ? (
                            <span>
                              Complemento:{' '}
                              {item !== undefined
                                ? `${item.length} x ${item.width} x ${item.height}`
                                : 'N/A'}
                            </span>
                          ) : null}
                          <span>
                            Cantidad: {order.amount}{' '}
                            {order.item_id !== null
                              ? itemsType.find(
                                  i => i.id === item.item_type_id
                                ) !== undefined
                                ? itemsType.find(
                                    i => i.id === item.item_type_id
                                  ).name
                                : 'Error Material'
                              : null}
                          </span>
                          <span>
                            Zona de trabajo:{' '}
                            {ordersWorkstations.filter(
                              o => o.id === order.id
                            ) !== undefined
                              ? ordersWorkstations
                                  .filter(o => o.id === order.id)
                                  .map(o => o.workstation)
                              : 'N/A'}
                          </span>
                          <span>
                            Entrega:{' '}
                            {moment(order.time).format('DD-MM-YYYY HH:mm')}
                          </span>
                        </div>
                      )
                    })
                : null}
            </div>
          </div>
          <div>
            <div className="dashboard__name">En Revisión</div>
            <div className="dashboard__production">
              {data.filter(
                order =>
                  parseInt(order.process_id) === parseInt(processSelected) &&
                  parseInt(order.ready) === 2
              ).length > 0
                ? data
                    .filter(
                      order =>
                        parseInt(order.process_id) ===
                          parseInt(processSelected) &&
                        parseInt(order.ready) === 2
                    )
                    .sort((a, b) => moment(a.time) - moment(b.time))
                    .map(order => {
                      const item = items.find(i => i.id === order.item_id)
                      return (
                        <div
                          className={`dashboard__item`}
                          key={order.id}
                          /*  onClick={() =>
                            props.history.push(`/dashboard/processes/${order.id}`)
                          } */
                        >
                          <span>Pedido# {order.order_id}</span>
                          <span>Tarima: {order.model}</span>
                          {order.item_id !== null ? (
                            <span>
                              Complemento:{' '}
                              {item !== undefined
                                ? `${item.length} x ${item.width} x ${item.height}`
                                : 'N/A'}
                            </span>
                          ) : null}
                          <span>
                            Entrega:{' '}
                            {moment(order.time).format('DD-MM-YYYY HH:mm')}
                          </span>
                        </div>
                      )
                    })
                : null}
            </div>
          </div>
        </div>
        <Production />
      </div>
    )
  } else {
    return <Loading />
  }
}

const mapDispatchToProps = {
  setTitle,
  setWraper,
  setModal,
  setModalReview,
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
    ordersWorkstations: state.reducerOrders.ordersWorkstations,
    ordersRequeriment: state.reducerOrders.ordersRequeriment,
    workstations: state.reducerZones.workstations,
    items: state.reducerItems.items,
    pallets: state.reducerPallets.pallets,
    qualities: state.reducerQualities.qualities,
    itemsType: state.reducerItems.itemsType,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbaord)
