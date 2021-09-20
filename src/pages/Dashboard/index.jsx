import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  setWraper,
  setModal,
  getAll,
  deleted,
  create,
  update,
} from '../../actions/app'
import moment from 'moment'
import './styles.scss'
import Loading from '../../components/Loading/Loading'

const Dashbaord = props => {
  const { user, processes, ordersProduction, ordersRequeriment } = props
  const [visible, setVisible] = useState(false)
  const role = user.role

  useEffect(() => {
    const topbar = {
      title: 'Dashbaord',
      menu: {
        Dashbaord: '/dashboard',
        'Dashbaord Proceso': '/dashboard/processes',
        'Dashbaord Rechazo': '/dashboard/reject',
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
        props.getAll('items', 'GET_ITEMS')
      })
  }, [])

  if (processes && ordersProduction && ordersRequeriment) {
    switch (role) {
      case 'Administrador':
        return (
          <div className="dashboard">
            <div
              className="dashboard__header"
              style={{
                gridTemplateColumns: `repeat(${processes.length}, 200px)`,
              }}
            >
              {processes.map(process => (
                <div key={process.id}>
                  <div className="dashboard__name">{process.name}</div>
                  <div className="dashboard__production">
                    {ordersProduction.filter(
                      order =>
                        order.ready === 0 && order.process_id === process.id
                    ).length > 0
                      ? ordersProduction
                          .filter(
                            order =>
                              order.ready === 0 &&
                              order.process_id === process.id
                          )
                          .sort((a, b) => moment(a.time) - moment(b.time))
                          .map(order => (
                            <div
                              className={`dashboard__item ${
                                moment(order.time).isBefore(moment())
                                  ? '--danger'
                                  : null
                              }`}
                              key={order.id}
                              onClick={() =>
                                props.setModal({ state: true, order, stage: 0 })
                              }
                            >
                              <span>Pedido# {order.order_id}</span>
                              <span>Tarima: {order.model}</span>
                              <span>
                                Entrega:{' '}
                                {moment(order.time).format('DD-MM-YYYY HH:mm')}
                              </span>
                            </div>
                          ))
                      : null}
                    {ordersProduction.filter(
                      order =>
                        order.ready === 1 && order.process_id === process.id
                    ).length > 0
                      ? ordersProduction
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
                              onClick={() =>
                                props.setModal({ state: true, order, stage: 1 })
                              }
                            >
                              <span>Pedido# {order.order_id}</span>
                              <span>Tarima: {order.model}</span>
                              <span>
                                Entrega:{' '}
                                {moment(order.time).format('DD-MM-YYYY HH:mm')}
                              </span>
                            </div>
                          ))
                      : null}
                    {ordersProduction.filter(
                      order =>
                        order.ready === 2 && order.process_id === process.id
                    ).length > 0
                      ? ordersProduction
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
                              <span>Tarima: {order.model}</span>
                              <span>
                                Entrega:{' '}
                                {moment(order.time).format('DD-MM-YYYY HH:mm')}
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
    ordersProduction: state.reducerOrders.ordersProduction,
    ordersRequeriment: state.reducerOrders.ordersRequeriment,
    items: state.reducerItems.items,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbaord)
