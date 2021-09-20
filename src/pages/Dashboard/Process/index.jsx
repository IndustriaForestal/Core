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
import Review from '../Review'

const Dashbaord = props => {
  const { user, processes, ordersProduction, ordersRequeriment, workstations } =
    props
  const [processSelected, setProcess] = useState('')
  const role = user.role

  useEffect(() => {
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
  }, [])

  const handleEnd = orderId => {
    props.update(`orders/end/${orderId}`, 'START_ORDER', {}).then(() => {
      props.getAll('orders/production', 'GET_ORDERS_PRODUCTION')
    })
  }

  if (processes && ordersProduction && ordersRequeriment && workstations) {
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
        ) : null}
        <div
          className="dashboard__header"
          style={{
            gridTemplateColumns: `repeat(${processes.length}, 200px)`,
          }}
        >
          <div>
            <div className="dashboard__name">En Espera</div>
            <div className="dashboard__production">
              {ordersProduction.filter(
                order =>
                  parseInt(order.process_id) === parseInt(processSelected) &&
                  parseInt(order.ready) === 0
              ).length > 0
                ? ordersProduction
                    .filter(
                      order =>
                        parseInt(order.process_id) ===
                          parseInt(processSelected) &&
                        parseInt(order.ready) === 0
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
                        onClick={() => props.setModal({ state: true, order })}
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
          <div>
            <div className="dashboard__name">En Proceso</div>
            <div className="dashboard__production">
              {ordersProduction.filter(
                order =>
                  parseInt(order.process_id) === parseInt(processSelected) &&
                  parseInt(order.ready) === 1
              ).length > 0
                ? ordersProduction
                    .filter(
                      order =>
                        parseInt(order.process_id) ===
                          parseInt(processSelected) &&
                        parseInt(order.ready) === 1
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
                        onClick={() => handleEnd(order.id)}
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
          <div>
            <div className="dashboard__name">En Revisión</div>
            <div className="dashboard__production">
              {ordersProduction.filter(
                order =>
                  parseInt(order.process_id) === parseInt(processSelected) &&
                  parseInt(order.ready) === 2
              ).length > 0
                ? ordersProduction
                    .filter(
                      order =>
                        parseInt(order.process_id) ===
                          parseInt(processSelected) &&
                        parseInt(order.ready) === 2
                    )
                    .sort((a, b) => moment(a.time) - moment(b.time))
                    .map(order => (
                      <div
                        className={`dashboard__item`}
                        key={order.id}
                        onClick={() =>
                          props.setModalReview({ state: true, order })
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
        </div>
        <Production />
        <Review />
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
    ordersProduction: state.reducerOrders.ordersProduction,
    ordersRequeriment: state.reducerOrders.ordersRequeriment,
    workstations: state.reducerZones.workstations,
    items: state.reducerItems.items,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbaord)
