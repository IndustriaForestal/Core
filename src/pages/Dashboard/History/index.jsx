import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted } from '../../../actions/app'
import MaterialTable from 'material-table'
import moment from 'moment'
const Nails = props => {
  const { ordersHistory } = props

  useEffect(() => {
    props.getAll('orders/history', 'GET_ORDERS_HISTORY')
    // eslint-disable-next-line
  }, [])

  if (ordersHistory) {
    const data = ordersHistory.map(o => {
      const product =
        o.type === 'pallet'
          ? o.pname
          : `${o.ilength} x ${o.iwidth} x ${o.iheight} cm`
      return {
        ...o,
        product,
        start: moment(o.start).format('DD-MM-YYYY HH:mm:ss'),
        end: moment(o.end).format('DD-MM-YYYY HH:mm:ss'),
      }
    })

    console.log(ordersHistory)

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Orden#', field: 'id' },
            { title: 'Producto', field: 'product' },
            { title: 'Cantidad Requerida', field: 'amount' },
            { title: 'Cantidad', field: 'amount_final' },
            { title: 'Proceso', field: 'proname' },
           /*  { title: 'Humedad Entrada', field: 'damp_start' },
            { title: 'Humedad Salida', field: 'damp_end' },
            { title: 'Muestra', field: 'sample' },
            { title: 'Rechazo 1', field: 'r1' },
            { title: 'Rechazo 2', field: 'r2' },
            { title: 'Rechazo 3', field: 'r3' }, */
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
