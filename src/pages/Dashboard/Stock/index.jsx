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
import Swal from 'sweetalert2'
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
    ordersWorkstations,
  } = props
  const [processSelected, setProcess] = useState('')
  const role = user.role

  useEffect(() => {
    const topbar = {
      title: 'Dashboard de Inventario',
      menu: {
        'Dashboard de Inventario': '/dashboard/stock',
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

  if (
    processes &&
    ordersProduction &&
    ordersRequeriment &&
    workstations &&
    pallets &&
    qualities &&
    ordersWorkstations
  ) {
    const data =
      parseInt(user.workstation_id) > 0
        ? ordersProduction.filter(
            o =>
              o.process_id ===
              workstations.find(w => w.id === parseInt(user.workstation_id))
                .process_id
          )
        : ordersProduction

    const delivered = id => {
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Esta acción no se puede revertir',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        cancelButtonAriaLabel: 'Cancelar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then(result => {
        if (result.isConfirmed) {
          props
            .create(`orders/movement-stock/${id}`, 'CREATE_HISTORY', id)
            .then(() => {
              props.getAll('orders/production', 'GET_ORDERS_PRODUCTION')
            })
        }
      })
    }

    return (
      <div className="dashboard">
        <div
          className="dashboard__header"
          style={{
            gridTemplateColumns: `repeat(${processes.length}, 200px)`,
          }}
        >
          <div>
            <div className="dashboard__name">A proceso</div>
            <div className="dashboard__production">
              {data.filter(
                order =>
                  parseInt(order.ready) === 1 &&
                  parseInt(order.next) === 0 &&
                  parseInt(order.delivered) !== 1
              ).length > 0
                ? data
                    .filter(
                      order =>
                        parseInt(order.ready) === 1 &&
                        parseInt(order.next) === 0 &&
                        parseInt(order.delivered) !== 1
                    )
                    .sort((a, b) => moment(a.time) - moment(b.time))
                    .map(order => (
                      <div
                        className={`dashboard__item`}
                        key={order.id}
                        onClick={() => delivered(order.id)}
                      >
                        <span>Pedido# {order.order_id}</span>
                        <span>Tarima: {order.model}</span>
                        <span>
                          Entrega:{' '}
                          {moment(order.time).format('DD-MM-YYYY HH:mm')}
                        </span>
                        <span>
                          Mover a{' '}
                          {ordersWorkstations.filter(o => o.id === order.id) !==
                          undefined
                            ? ordersWorkstations
                                .filter(o => o.id === order.id)
                                .map(o => o.workstation)
                            : 'N/A'}
                        </span>
                      </div>
                    ))
                : null}
            </div>
          </div>
          <div>
            <div className="dashboard__name">A Inventario</div>
            <div className="dashboard__production">
              {data.filter(
                order =>
                  parseInt(order.ready) === 3 &&
                  parseInt(order.next) === 1 &&
                  parseInt(order.delivered) !== 1
              ).length > 0
                ? data
                    .filter(
                      order =>
                        parseInt(order.ready) === 3 &&
                        parseInt(order.next) === 1 &&
                        parseInt(order.delivered) !== 1
                    )
                    .sort((a, b) => moment(a.time) - moment(b.time))
                    .map(order => (
                      <div
                        className={`dashboard__item`}
                        key={order.id}
                        onClick={() =>
                          props.history.push(
                            `/dashboard/stock-review/${order.id}`
                          )
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
    ordersWorkstations: state.reducerOrders.ordersWorkstations,
    ordersRequeriment: state.reducerOrders.ordersRequeriment,
    workstations: state.reducerZones.workstations,
    items: state.reducerItems.items,
    pallets: state.reducerPallets.pallets,
    qualities: state.reducerQualities.qualities,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbaord)
