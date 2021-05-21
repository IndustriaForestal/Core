import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../../actions/app'
import Loading from '../../../components/Loading/Loading'
import moment from 'moment'
import MaterialTable from 'material-table'

const StockHistory = props => {
  const {
    stockHistory,
    stockHistoryItems,
    stockHistoryNails,
    stockHistorySawn,
    stockHistoryRaws,
  } = props

  useEffect(() => {
    const topbar = {
      title: 'Inventarios Generales',
      menu: {
        Tarimas: '/stock',
        Complementos: '/stockNails',
        'Madera Habilitada': '/stockItems',
        'Madera Aserrada': '/stockSawn',
        'Materia Prima': '/stockMaterial',
        'Entradas y salidas': '/stockChanges',
        Historial: '/stockHistory',
      },
    }
    setTitle(topbar)
    props
      .getAll('stock/stock_history/pallets', 'GET_SH')
      .then(() => {
        props.getAll('stock/stock_history/items', 'GET_SH_ITEMS')
      })
      .then(() => {
        props.getAll('stock/stock_history/nails', 'GET_SH_NAILS')
      })
      .then(() => {
        props.getAll('stock/stock_history/sawn', 'GET_SH_SAWN')
      })
      .then(() => {
        props.getAll('stock/stock_history/raws', 'GET_SH_RAWS')
      })
    // eslint-disable-next-line
  }, [])

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

  if (
    stockHistory &&
    stockHistoryItems &&
    stockHistorySawn &&
    stockHistoryRaws &&
    stockHistoryNails
  ) {
    console.table(stockHistoryNails)

    let stockHistoryTotal = []

    stockHistory.map(sh => {
      stockHistoryTotal.push({
        id: sh.id,
        zone: 'Tarima',
        name: sh.model,
        amount: sh.amount,
        zone_id: sh.zone_id,
        status:
          sh.order_id !== null
            ? sh.order.paper_number
            : sh.process_id !== null
            ? sh.process_name
            : sh.supplier_id !== null
            ? sh.supplier_name
            : 'Ingresado Manual',
        date: moment(sh.date).format('YYYY-MM-DD HH:mm:ss'),
      })
    })

    stockHistoryItems.map(sh => {
      stockHistoryTotal.push({
        id: sh.id,
        zone: 'Madera Habilitada',
        name: `${sh.height} x ${sh.width} x ${sh.length} - ${sh.wood_name}`,
        amount: sh.amount,
        zone_id: sh.zone_id,
        status:
          sh.order_id !== null
            ? sh.order.paper_number
            : sh.process_id !== null
            ? sh.process_name
            : sh.supplier_id !== null
            ? sh.supplier_name
            : 'Ingresado Manual',
        date: moment(sh.date).format('YYYY-MM-DD HH:mm:ss'),
      })
    })

    stockHistoryNails.map(sh => {
      stockHistoryTotal.push({
        id: sh.id,
        zone: 'Complementos',
        name: sh.nail,
        amount: sh.amount,
        zone_id: 'Almacen de Clavos',
        status:
          sh.order_id !== null
            ? sh.order.paper_number
            : sh.process_id !== null
            ? sh.process_name
            : sh.supplier_id !== null
            ? sh.supplier_name
            : 'Ingresado Manual',
        date: moment(sh.date).format('YYYY-MM-DD HH:mm:ss'),
      })
    })

    stockHistorySawn.map(sh => {
      stockHistoryTotal.push({
        id: sh.id,
        zone: 'Materia Aserrada',
        name: `${sh.height} x ${sh.width} x ${sh.length} - ${sh.wood_name}`,
        amount: sh.amount,
        zone_id: sh.zone_id,
        status:
          sh.order_id !== null
            ? sh.order.paper_number
            : sh.process_id !== null
            ? sh.process_name
            : sh.supplier_id !== null
            ? sh.supplier_name
            : 'Ingresado Manual',
        date: moment(sh.date).format('YYYY-MM-DD HH:mm:ss'),
      })
    })

    stockHistoryRaws.map(sh => {
      stockHistoryTotal.push({
        id: sh.id,
        zone: 'Materia Prima',
        name: sh.id,
        amount: sh.amount,
        zone_id: sh.zone_id,
        status:
          sh.order_id !== null
            ? sh.order.paper_number
            : sh.process_id !== null
            ? sh.process_name
            : sh.supplier_id !== null
            ? sh.supplier_name
            : 'Ingresado Manual',
        date: moment(sh.date).format('YYYY-MM-DD HH:mm:ss'),
      })
    })

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
          title="Madera Habilitada"
        />
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    stockHistory: state.stockHistory,
    stockHistoryItems: state.stockHistoryItems,
    stockHistorySawn: state.stockHistorySawn,
    stockHistoryRaws: state.stockHistoryRaws,
    stockHistoryNails: state.stockHistoryNails,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(StockHistory)
