import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted } from '../../../actions/app'
import MaterialTable from 'material-table'
import Button from '../../../components/Button/Button'
const Nails = props => {
  const { stockHistorySuppliers, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Inventarios Generales',
      menu: {
        'Entrada Proveedores': '/stockSuppliers',
        'Historial Entrada Proveedores': '/stockSuppliersHistory',
      },
    }

    setTitle(topbar)
    props.getAll('stock/stock_history/suppliers', 'GET_SH_SUPPLIERS')
    // eslint-disable-next-line
  }, [])

  if (stockHistorySuppliers) {
    return (
      <>
        <MaterialTable
          columns={[
            { title: 'id', field: 'id' },
            { title: 'Proveedor', field: 'sname' },
            { title: 'Producto', field: 'pname' },
            { title: '# Forestal', field: 'number' },
            { title: 'Ingreso a:', field: 'zone_id' },
            { title: 'Cantidad', field: 'amount' },
            { title: 'Creado Por', field: 'uname' },
            {
              title: 'Archivo',
              field: 'pdf',
              render: rowData => {
                return (
                  <a
                    target="blank"
                    href={`${process.env.REACT_APP_API}docs/suppliers/${rowData.pdf}`}
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
          data={stockHistorySuppliers}
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
    stockHistorySuppliers: state.reducerStock.stockHistorySuppliers,
    role: state.reducerApp.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
