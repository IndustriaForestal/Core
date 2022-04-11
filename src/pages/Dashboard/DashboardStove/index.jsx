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
  createFile,
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
    orders,
    workstations,
    pallets,
    qualities,
    ordersWorkstations,
    items,
    ordersStoves,
  } = props
  const [processSelected, setProcess] = useState('')
  const [orderSelected, setOrderSelected] = useState(0)
  const role = user.role

  useEffect(() => {
    const topbar = {
      title: 'Pizarron de estufado',
      menu: {
        'Pizarron de estufado': '/dashboard/stoves',
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
      .then(() => {
        props.getAll('orders', 'GET_ORDERS')
      })
      .then(() => {
        props.getAll('orders/stoves', 'GET_ORDERS_STOVES')
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

  const handleFile = async id => {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'aria-label': 'Upload your profile picture',
      },
    })

    if (file) {
      props
        .createFile('orders/stoves/' + id, 'CREATE_ORDER_STOVES', {
          pdf: [file],
        })
        .then(() => {
          props.getAll('orders/stoves', 'GET_ORDERS_STOVES')
        })
    }
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
    ordersStoves
  ) {
    const ordersProductionFiltered =
      orderSelected !== 0
        ? ordersStoves.filter(o => o.order_id === orderSelected)
        : ordersStoves

    const data =
      parseInt(user.workstation_id) === 0
        ? ordersProductionFiltered
        : ordersProductionFiltered.filter(
            o =>
              o.process_id ===
              workstations.find(
                w => w.id === parseInt(user.workstation_id)
              ).process_id
          )

    return (
      <div className="dashboard">
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
            <div className="dashboard__name">Graficas</div>
            <div className="dashboard__production">
              {data.filter(order => order.file === null).length > 0
                ? data
                    .filter(order => order.file === null)
                    .sort(
                      (a, b) => moment(a.created) - moment(b.created)
                    )
                    .map(order => {
                      const item = items.find(
                        i => i.id === order.item_id
                      )
                      return (
                        <div
                          className={`dashboard__item`}
                          key={order.id}
                          onClick={() => handleFile(order.id)}
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
                            {moment(order.time).format(
                              'DD-MM-YYYY HH:mm'
                            )}
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
  createFile,
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
    orders: state.reducerOrders.orders,
    ordersStoves: state.reducerOrders.ordersStoves,
    qualities: state.reducerQualities.qualities,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbaord)
