import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { setTitle, getAll, deleted } from '../../../actions/app'
import MaterialTable from 'material-table'

const StockSwan = props => {
  const { stock, setTitle, role } = props

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
    props.getAll('stock/sawn', 'GET_STOCK')
    // eslint-disable-next-line
  }, [])

  if (stock) {
    const stockItems = stock.filter(item => item.item_type_id !== 4)
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
    stock: state.stock,
    role: state.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(StockSwan)
