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
} from '../../../actions/app'
import moment from 'moment'
import './styles.scss'
import Loading from '../../../components/Loading/Loading'

const Dashbaord = props => {
  const { user, processes, ordersReject, ordersRequeriment, processesReject } =
    props
  const [visible, setVisible] = useState(false)
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
        props.getAll('orders/reject', 'GET_ORDERS_REJECT')
      })
      .then(() => {
        props.getAll('processes/reject', 'GET_PROCESSES_REJECT')
      })
      .then(() => {
        props.getAll('items', 'GET_ITEMS')
      })
  }, [])

  if (processes && ordersReject && ordersRequeriment && processesReject) {
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
              {processesReject.map(process => (
                <div key={process.id}>
                  <div className="dashboard__name">{process.name}</div>
                  <div className="dashboard__production">
                    {ordersReject.filter(
                      order =>
                        order.ready === 0 && order.reject_id === process.id
                    ).length > 0
                      ? ordersReject
                          .filter(
                            order =>
                              order.ready === 0 &&
                              order.reject_id === process.id
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
    ordersReject: state.reducerOrders.ordersReject,
    ordersRequeriment: state.reducerOrders.ordersRequeriment,
    processesReject: state.reducerProcesses.processesReject,
    items: state.reducerItems.items,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbaord)
