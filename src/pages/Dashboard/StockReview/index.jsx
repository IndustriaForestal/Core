import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  setModalReview,
  setWraper,
  getAll,
  deleted,
  create,
  update,
} from '../../../actions/app'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'

const Review = props => {
  const {
    processes,
    ordersProduction,
    ordersRequeriment,
    items,
    workstations,
    qualityRequest,
    specialProcesses,
    processesReject,
    plants,
    zones,
    subzones,
    ordersWorkstations,
  } = props
  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    data.zone_id = subzoneSelected
    props.create(`orders/movement/${id}`, 'CREATE_HISTORY', data).then(() => {
      props.history.goBack()
    })
  }

  const { id } = useParams()
  const [plantSelected, setPlant] = useState(null)
  const [zoneSelected, setZone] = useState(null)
  const [subzoneSelected, setSubzone] = useState(null)

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
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('zones/zones', 'GET_ZONES')
      })
      .then(() => {
        props.getAll('zones/subzones', 'GET_SUBZONES')
      })
      .then(() => {
        props.getAll(
          'specialProcesses/pallets',
          'GET_SPECIAL_PROCESSES_PALLETS'
        )
      })
      .then(() => {
        props.getAll('orders/workstations', 'GET_ORDERS_WORKSTATIONS')
      })
  }, [])

  if (
    processes &&
    ordersProduction &&
    ordersRequeriment &&
    items &&
    workstations &&
    qualityRequest &&
    specialProcesses &&
    processesReject &&
    ordersWorkstations &&
    plants &&
    zones &&
    subzones
  ) {
    const order =
      ordersProduction.find(o => o.id === parseInt(id)) !== undefined
        ? ordersProduction.find(o => o.id === parseInt(id))
        : 0

    const process =
      processes.find(process => process.id === order.process_id) || {}

    return (
      <Card title="Movimiento de madera">
        <form onSubmit={handleSubmit(onSubmit)} className="review">
          <div className="review__section">
            <h1>Movimiento: {process.name}</h1>
            <h2>
              {ordersWorkstations.filter(o => o.id === order.id) !== undefined
                ? ordersWorkstations
                    .filter(o => o.id === order.id)
                    .map(o => o.workstation)
                : 'N/A'}{' '}
              a {order.next === 0 ? 'Siguiente Proceso' : 'Inventario'}
            </h2>
            <h3>Tarima: {order.model}</h3>
          </div>
          <div className="review__section">
            <input
              type="text"
              placeholder="Cant."
              ref={register}
              name="amount"
            />
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>Planta:</span>
                <select
                  name="processId"
                  onChange={e => setPlant(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  {plants.map(plant => (
                    <option key={plant.id} value={plant.id}>
                      {plant.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {plantSelected !== null ? (
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Zona:</span>
                  <select
                    name="processId"
                    onChange={e => setZone(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {zones
                      .filter(zone => zone.plant_id === plantSelected)
                      .map(zone => (
                        <option key={zone.id} value={zone.id}>
                          {zone.name}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
            ) : null}

            {zoneSelected !== null ? (
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>SubZona:</span>
                  <select
                    name="zone_id"
                    onChange={e => setSubzone(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {subzones
                      .filter(
                        subzone =>
                          parseInt(subzone.zone_id) === parseInt(zoneSelected)
                      )
                      .map(subzone => (
                        <option key={subzone.id} value={subzone.id}>
                          {subzone.id}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
            ) : null}
            <input ref={register} type="hidden" name="process_id" value={process.id} />
            <div>
              <Button type="submit">Enviar</Button>
            </div>
          </div>
        </form>
      </Card>
    )
  } else {
    return <div></div>
  }
}

const mapDispatchToProps = {
  setTitle,
  setModalReview,
  setWraper,
  getAll,
  deleted,
  create,
  update,
}

const mapStateToProps = state => {
  return {
    user: state.reducerApp.user,
    modalReview: state.reducerApp.modalReview,
    processes: state.reducerProcesses.processes,
    ordersProduction: state.reducerOrders.ordersProduction,
    ordersRequeriment: state.reducerOrders.ordersRequeriment,
    workstations: state.reducerZones.workstations,
    items: state.reducerItems.items,
    qualityRequest: state.reducerSpecialProcesses.specialProcessesPallets,
    specialProcesses: state.reducerSpecialProcesses.specialProcesses,
    processesReject: state.reducerProcesses.processesReject,
    ordersWorkstations: state.reducerOrders.ordersWorkstations,
    plants: state.reducerZones.plants,
    zones: state.reducerZones.zones,
    subzones: state.reducerZones.subzones,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
