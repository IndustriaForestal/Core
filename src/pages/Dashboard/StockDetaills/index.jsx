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
import MaterialTable from 'material-table'
import moment from 'moment'

import './styles.scss'

const Review = props => {
  const {
    processes,
    ordersProduction,
    ordersRequeriment,
    workstations,
    qualityRequest,
    specialProcesses,
    processesReject,
    pallets,
    items,
    plants,
    zones,
    subzones,
    wood,
    sawn,
    stockHistory,
    stockHistoryItems,
    stockHistorySawn,
    stockHistoryRaws,
  } = props
  const { register, handleSubmit } = useForm()
  const onSubmit = data => {
    props.create('orders/history', 'CREATE_HISTORY', data).then(() => {
      props.history.goBack()
    })
  }
  const { id } = useParams()
  const [next, setNext] = useState(false)

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
      .then(() => {
        props.getAll('stock/stock_history/pallets', 'GET_SH')
      })
      .then(() => {
        props.getAll('stock/stock_history/items', 'GET_SH_ITEMS')
      })
      .then(() => {
        props.getAll('stock/stock_history/sawn', 'GET_SH_SAWN')
      })
      .then(() => {
        props.getAll('stock/stock_history/raws', 'GET_SH_RAWS')
      })
  }, [])

  if (
    processes &&
    ordersProduction &&
    ordersRequeriment &&
    stockHistory &&
    stockHistoryItems &&
    stockHistorySawn &&
    stockHistoryRaws
  ) {
    const order =
      ordersProduction.find(o => o.id === parseInt(id)) !== undefined
        ? ordersProduction.find(o => o.id === parseInt(id))
        : 0

    const process =
      processes.find(process => process.id === order.process_id) || {}

    console.log(process)

    function compare(a, b) {
      const orderA = a.date
      const orderB = b.date

      let comparison = 0
      if (orderA < orderB) {
        comparison = 1
      } else if (orderA > orderB) {
        comparison = -1
      }
      return comparison
    }

    let stockHistoryTotal = []
    if (process.material_in === 1) {
      stockHistory
        .filter(sh => {
          console.log(sh)
          return parseInt(sh.order_id) === order.order_id
        })
        .map(sh => {
          return stockHistoryTotal.push({
            id: sh.id,
            zone: 'Tarima',
            name: sh.model,
            amount: sh.amount,
            zone_id: sh.zone_id,
            user_id: sh.user_id,
            status:
              sh.order_id !== null
                ? 'sh.order.paper_number'
                : sh.process_id !== null
                ? sh.process_name
                : sh.supplier_id !== null
                ? `Ingreso proveedor: ${sh.supplier_name}`
                : 'Ingresado Manual',
            date: moment(sh.date).format('DD-MM-YYYY HH:mm:ss'),
          })
        })
    }
    if (process.material_in === 2) {
      stockHistoryItems
        .filter(sh => {
          return parseInt(sh.order_id) === order.order_id
        })
        .map(sh =>
          stockHistoryTotal.push({
            id: sh.id,
            zone: 'Madera Habilitada',
            name: `${sh.height} x ${sh.width} x ${sh.length} - ${sh.wood_name}`,
            amount: sh.amount,
            zone_id: sh.zone_id,
            user_id: sh.user_id,
            status:
              sh.order_id !== null
                ? 'sh.order.paper_number'
                : sh.process_id !== null
                ? sh.process_name
                : sh.supplier_id !== null
                ? sh.supplier_name
                : 'Ingresado Manual',
            date: moment(sh.date).format('DD-MM-YYYY HH:mm:ss'),
          })
        )
    }
    if (process.material_in === 3) {
      stockHistorySawn
        .filter(sh => {
          return parseInt(sh.order_id) === order.order_id
        })
        .map(sh =>
          stockHistoryTotal.push({
            id: sh.id,
            zone: 'Materia Aserrada',
            name: `${sh.height} x ${sh.width} x ${sh.length} - ${sh.wood_name}`,
            amount: sh.amount,
            zone_id: sh.zone_id,
            user_id: sh.user_id,
            status:
              sh.order_id !== null
                ? 'sh.order.paper_number'
                : sh.process_id !== null
                ? sh.process_name
                : sh.supplier_id !== null
                ? sh.supplier_name
                : 'Ingresado Manual',
            date: moment(sh.date).format('DD-MM-YYYY HH:mm:ss'),
          })
        )
    }
    if (process.material_in === 4) {
      stockHistoryRaws
        .filter(sh => {
          return parseInt(sh.order_id) === order.order_id
        })
        .map(sh =>
          stockHistoryTotal.push({
            id: sh.id,
            zone: 'Materia Prima',
            name: sh.id,
            amount: sh.amount,
            zone_id: sh.zone_id,
            user_id: sh.user_id,
            status:
              sh.order_id !== null
                ? 'sh.order.paper_number'
                : sh.process_id !== null
                ? sh.process_name
                : sh.supplier_id !== null
                ? sh.supplier_name
                : 'Ingresado Manual',
            date: moment(sh.date).format('DD-MM-YYYY HH:mm:ss'),
          })
        )
    }

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Tipo', field: 'zone' },
            { title: 'Modelo / Nombre', field: 'name' },
            { title: 'Cantidad', field: 'amount' },
            { title: 'Sub Zona', field: 'zone_id' },
            {
              title: 'Estatus',
              field: 'status',
            },
            { title: 'Fecha', field: 'date' },
            { title: 'Usuario', field: 'user_id' },
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
          data={stockHistoryTotal.sort(compare)}
          title="Entrega de material"
          options={{
            exportButton: true,
          }}
        />
        <Button>Entregado</Button>
      </>
    )
  } else {
    return <div>Cargando</div>
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
    pallets: state.reducerPallets.pallets,
    items: state.reducerItems.items,
    complements: state.reducerComplements.complements,
    sawn: state.reducerStock.stock,
    plants: state.reducerZones.plants,
    zones: state.reducerZones.zones,
    subzones: state.reducerZones.subzones,
    wood: state.reducerWood.wood,
    units: state.reducerApp.units,
    stockHistory: state.reducerStock.stockHistory,
    stockHistoryItems: state.reducerStock.stockHistoryItems,
    stockHistorySawn: state.reducerStock.stockHistorySawn,
    stockHistoryRaws: state.reducerStock.stockHistoryRaws,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
