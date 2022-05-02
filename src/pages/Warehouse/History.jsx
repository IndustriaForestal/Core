import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { cmToFbm, cmToIn } from '../../utils'
import { setTitle, getAll, deleted } from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import moment from 'moment'
import MaterialTable from 'material-table'

moment.locale('mx')

const StockHistory = props => {
  const { warehouseHistory, units } = props

  useEffect(() => {
    const topbar = {
      title: 'Historial Almacen',
      menu: {
        Almacen: '/warehouse',
        'Historial Almacen': '/warehouse/history',
      },
    }
    setTitle(topbar)
    props.getAll('warehouse/history', 'GET_WAREHOUSE_HISTORY')

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

  if (warehouseHistory) {
    let stockHistoryTotal = []

    warehouseHistory.map(sh =>
      stockHistoryTotal.push({
        id: sh.id,
        zone: 'Almacen',
        name: sh.name,
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
    )

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
          title="Historial Inventario"
          options={{
            exportButton: true,
          }}
        />
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    warehouseHistory: state.reducerWarehouse.warehouseHistory,
    units: state.reducerApp.units,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockHistory)
