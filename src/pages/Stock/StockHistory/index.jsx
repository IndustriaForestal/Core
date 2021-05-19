import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../../actions/app'
import Loading from '../../../components/Loading/Loading'
import MaterialTable from 'material-table'

const StockHistory = props => {
  const { stockHistory, stockHistoryItems } = props

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
    props.getAll('stock/stock_history/pallets', 'GET_SH').then(() => {
      props.getAll('stock/stock_history/items', 'GET_SH_ITEMS')
    })
    // eslint-disable-next-line
  }, [])

  if (stockHistory && stockHistoryItems) {

    console.table(stockHistory)
    console.table(stockHistoryItems)

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'id', field: 'id' },
            { title: 'Modelo', field: 'model' },
            { title: 'Cantidad', field: 'amount' },
            { title: 'Sub Zona', field: 'subzone_id' },
            {
              title: 'Estatus',
              field: 'subzone_id',
              render: rowData =>
                rowData.order_id !== null
                  ? rowData.order.paper_number
                  : rowData.process_id !== null
                  ? rowData.process_name
                  : rowData.supplier_id !== null
                  ? rowData.supplier_name
                  : 'Ingresado Manual',
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
          data={stockHistory}
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
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(StockHistory)
