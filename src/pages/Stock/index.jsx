import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { setTitle, setWraper, getAll, deleted } from '../../actions/app'
import './styles.scss'

import MaterialTable from 'material-table'

const Nails = props => {
  const { stock, setTitle, role } = props

  useEffect(() => {
    let topbar
    role === 'Administrador'
      ? (topbar = {
          title: 'Inventarios Generales',
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
          title: 'Inventarios Generales',
          menu: {
            Tarimas: '/stock',
            Complementos: '/stockItems',
            Clavos: '/stockNails',
            'Materia Prima': '/stockMaterial',
            Historial: '/stockHistory',
          },
        })

    setTitle(topbar)
    setWraper(true)
    props.getAll('stock', 'GET_STOCK')
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <MaterialTable
        columns={[
          { title: 'id', field: 'id' },
          { title: 'Model', field: 'model' },
          { title: 'Seco', field: 'dry' },
          { title: 'Humeda', field: 'damp' },
          { title: 'Reaparación', field: 'repair' },
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
        data={stock}
        title="Inventario Tarimas"
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    stock: state.stock,
    role: state.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  setWraper,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
