import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted } from '../../../actions/app'
import MaterialTable from 'material-table'
import moment from 'moment'
const Nails = props => {
  const { ordersHistory } = props

  useEffect(() => {
    props.getAll('orders/history/quality', 'GET_ORDERS_HISTORY')
    // eslint-disable-next-line
  }, [])

  if (ordersHistory) {
    const data = ordersHistory.map(o => {
      const product =
        o.process_id !== 41
          ? o.pname
          : `${o.ilength} x ${o.iwidth} x ${o.iheight} cm`
      return {
        ...o,
        product,
        end: moment(o.end).format('DD-MM-YYYY HH:mm:ss'),
        start: moment(o.start).format('DD-MM-YYYY HH:mm:ss'),
      }
    })

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Orden#', field: 'id' },
            { title: 'Producto', field: 'product' },
            { title: 'Cantidad Requerida', field: 'amount' },
            { title: 'Proceso', field: 'proname' },
            { title: 'Requerimiento', field: 'requeriment' },
            { title: 'Inicio', field: 'start' },
            { title: 'Terminado', field: 'end' },
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
          data={data}
          title="Historial de Producción"
        />
      </>
    )
  } else {
    return <h1>Cargando</h1>
  }
}

const mapStateToProps = state => {
  return {
    ordersHistory: state.reducerOrders.ordersHistory,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
