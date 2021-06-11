import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, cleanStock } from '../../../actions/app'
import './styles.scss'
import MaterialTable from 'material-table'
import { cmToIn } from '../../../utils'

const Nails = props => {
  const { stock, setTitle, role, units } = props

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
    props.getAll('stock/items', 'GET_STOCK')

    // eslint-disable-next-line
  }, [])

  if (stock) {
    const stockItems = stock
      .filter(item => item.item_type_id !== 4)
      .map(item => {
        if (units) {
          return {
            ...item,
            length: `${cmToIn(item.length).toFixed(3)} in`,
            height: `${cmToIn(item.height).toFixed(3)} in`,
            width: `${cmToIn(item.width).toFixed(3)} in`,
          }
        } else {
          return {
            ...item,
            length: `${item.length.toFixed(3)} cm`,
            height: `${item.height.toFixed(3)} cm`,
            width: `${item.width.toFixed(3)} cm`,
          }
        }
      })
    return (
      <>
        <MaterialTable
          columns={[
            { title: 'id', field: 'id' },
            { title: 'Tipo', field: 'item_type_name' },
            { title: 'Especie', field: 'wood_name' },
            { title: 'Alto', field: 'height' },
            { title: 'Largo', field: 'length' },
            { title: 'Ancho', field: 'width' },
            { title: 'Seco', field: 'dry' },
            { title: 'Humeda', field: 'damp' },

            {
              title: 'Total',
              field: 'total',
              render: rowData => rowData.dry + rowData.damp + rowData.repair,
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
          data={stockItems}
          title="Madera Habilitada"
        />
      </>
    )
  } else {
    return <h1>Cargando</h1>
  }
}

const mapStateToProps = state => {
  return {
    stock: state.reducerStock.stock,
    role: state.reducerApp.role,
    units: state.reducerApp.units,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  cleanStock,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
