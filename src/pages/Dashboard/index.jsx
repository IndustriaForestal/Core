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
  const {
    user,
    processes,
    orders,
    ordersProduction,
    ordersRequeriment,
    customers,
    pallets,
    qualities,
    workstations,
    ordersWorkstations,
    zones,
    plants,
  } = props
  const role = user.role
  const [workstation, setWorkstation] = useState(0)
  const [plant, setPlant] = useState(0)
  const [zone, setZone] = useState(0)

  useEffect(() => {
    const topbar = {
      title: 'Dashbaord',
      menu: {
        Dashbaord: '/dashboard',
        'Dashbaord Inventario': '/dashboard/stock',
        /*  'Dashbaord Proceso': '/dashboard/processes',
        'Dashbaord Rechazo': '/dashboard/reject',
        'Dashbaord Historial': '/dashboard/history', */
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
      .then(() => {
        props.getAll('zones/workstations', 'GET_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('orders/workstations', 'GET_ORDERS_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('zones/zones', 'GET_ZONES')
      })
  }, [])

  if (
    processes &&
    orders &&
    ordersProduction &&
    ordersRequeriment &&
    customers &&
    pallets &&
    qualities &&
    workstations &&
    ordersWorkstations &&
    zones &&
    plants
  ) {
    const data =
      workstation !== 0
        ? workstations.filter(o => o.id === workstation)
        : zone !== 0
        ? workstations.filter(o => o.zone_id === zone)
        : workstations

    switch (role) {
      case 'Administrador':
        return (
          <div className="dashboard">
            <label htmlFor="filter">
              Filtrar Planta
              <select
                name="filter"
                onChange={e => setPlant(parseInt(e.target.value))}
              >
                <option value="0">Todas</option>
                {plants.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="filter">
              Filtrar Zona
              <select
                name="filter"
                onChange={e => setZone(parseInt(e.target.value))}
              >
                <option value="0">Todas</option>
                {zones
                  .filter(o =>
                    plant !== 0 ? parseInt(o.plant_id) === parseInt(plant) : o
                  )
                  .map(o => (
                    <option key={o.id} value={o.id}>
                      {
                        plants.find(
                          p => parseInt(p.id) === parseInt(o.plant_id)
                        ).name
                      }{' '}
                      {o.name}
                    </option>
                  ))}
              </select>
            </label>
            <label htmlFor="filter">
              Filtrar Zona de trabajo
              <select
                name="filter"
                onChange={e => setWorkstation(parseInt(e.target.value))}
              >
                <option value="0">Todas</option>
                {workstations
                  .filter(o =>
                    zone !== 0 ? parseInt(o.zone_id) === parseInt(zone) : o
                  )
                  .map(o => (
                    <option key={o.id} value={o.id}>
                      {console.log(o, zone)}
                      {o.workstation}
                    </option>
                  ))}
              </select>
            </label>

            <div
              className="dashboard__header"
              style={{
                gridTemplateColumns: `repeat(${data.length}, 200px)`,
              }}
            >
              {data.map(workstation => (
                <div key={workstation.id}>
                  <div className="dashboard__name">
                    {workstation.workstation}
                  </div>
                  <div className="dashboard__production">
                    {ordersWorkstations.filter(
                      order => order.workstation_id === workstation.id
                    ).length > 0
                      ? ordersWorkstations
                          .filter(
                            order => order.workstation_id === workstation.id
                          )
                          .map(x => {
                            const order = ordersProduction.find(
                              o =>
                                parseInt(o.ready) === 1 &&
                                parseInt(o.id) === parseInt(x.id)
                            )

                            if (order !== undefined) {
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
                            } else {
                              return null
                            }
                          })
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
    ordersWorkstations: state.reducerOrders.ordersWorkstations,
    items: state.reducerItems.items,
    customers: state.reducerCustomers.customers,
    pallets: state.reducerPallets.pallets,
    qualities: state.reducerQualities.qualities,
    workstations: state.reducerZones.workstations,
    zones: state.reducerZones.zones,
    plants: state.reducerZones.plants,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbaord)
