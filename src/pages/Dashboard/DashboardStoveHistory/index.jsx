import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted } from '../../../actions/app'
import MaterialTable from 'material-table'
import Button from '../../../components/Button/Button'
import moment from 'moment'
const Nails = props => {
  const { ordersStoves, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Historial de estufado',
      menu: {
        'Pizarron de estufado': '/dashboard/stoves',
        'Historial de estufado': '/dashboard/stoves/history',
      },
    }

    setTitle(topbar)
    props.getAll('orders/stoves', 'GET_ORDERS_STOVES')
    // eslint-disable-next-line
  }, [])

  if (ordersStoves) {
    const data = ordersStoves
      .sort((a, b) => b.id - a.id)
      .map(item => {
        console.log(item)
        const product =
          item.type === 'pallets'
            ? item.pname
            : item.type === 'items'
            ? `${item.ilength} x ${item.iwidth} x ${item.iheight} cm`
            : item.type === 'complements'
            ? item.cname
            : item.type === 'sawns'
            ? `${item.slength} x ${item.swidth} x ${item.sheight} cm`
            : item.type === 'warehouse'
            ? `Almacen: ${item.wname}`
            : `${item.m3} m3`
        return {
          ...item,
          product,
          created: moment(item.created).format('DD-MM-YYYY HH:mm:ss'),
        }
      })

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Orden Trabajo', field: 'id' },
            { title: 'Tarima', field: 'model' },
            { title: 'Fecha', field: 'created' },
            {
              title: 'Archivo',
              field: 'pdf',
              render: rowData => {
                return (
                  <a
                    target="blank"
                    href={`${process.env.REACT_APP_API}docs/stoves/${rowData.file}`}
                  >
                    <Button>Archivo</Button>
                  </a>
                )
              },
            },
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
          title="Historial Estufado"
        />
      </>
    )
  } else {
    return <h1>Cargando</h1>
  }
}

const mapStateToProps = state => {
  return {
    ordersStoves: state.reducerOrders.ordersStoves,
    role: state.reducerApp.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
