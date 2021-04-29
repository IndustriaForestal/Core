import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { setTitle, getAll, deleted } from '../../../actions/app'
import './styles.scss'
import MaterialTable from 'material-table'

const Nails = props => {
  const { stock, setTitle, role } = props

  useEffect(() => {
    let topbar
    role === 'Administrador'
      ? (topbar = {
          title: 'Inventarios',
          menu: {
            Tarimas: '/stock',
            Complementos: '/stockItems',
            Clavos: '/stockNails',
            'Materia Prima': '/stockMaterial',
            'Entradas y salidas': '/stockChanges',
            Historial: '/stockHistory',
          },
        })
      : (topbar = {
          title: 'Inventarios',
          menu: {
            Tarimas: '/stock',
            Complementos: '/stockItems',
            Clavos: '/stockNails',
            'Materia Prima': '/stockMaterial',
            Historial: '/stockHistory',
          },
        })

    setTitle(topbar)
    props.getAll('stock/items', 'GET_STOCK')
    // eslint-disable-next-line
  }, [])

  if (stock) {
    const stockItems = stock.filter(item => item.item_type_id === 4)
    return (
      <>
        <MaterialTable
          columns={[
            { title: 'id', field: 'id' },
            { title: 'Nombre', field: 'nail' },
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
          title="Inventario Clavos"
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

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
