import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  getAll,
  deleted,
  create,
  update,
} from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import MaterialTable from 'material-table'

const TypeMaterial = props => {
  const { warehouseStock, warehouseStockZone, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Almacen',
      menu: {
        Almacen: '/warehouse',
        'Historial Almacen': '/warehouse/history',
        'Entradas Almacen': '/warehouse/changes',
      },
    }
    setTitle(topbar)
    props
      .getAll('warehouse/stock', 'GET_WAREHOUSE_STOCK')
      .then(() => {
        props.getAll(
          'warehouse/stock_zones',
          'GET_WAREHOUSE_STOCK_ZONE'
        )
      })
    // eslint-disable-next-line
  }, [])

  if (warehouseStock && warehouseStockZone) {
    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Inventario', field: 'stock' },
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
            header: {
              actions: 'Acciones',
            },
            body: {
              editRow: {
                deleteText: '¿Eliminar?',
                saveTooltip: 'Ok',
                cancelTooltip: 'Cancelar',
              },
              editTooltip: 'Editar',
              deleteTooltip: 'Eliminar',
              addTooltip: 'Agregar',
            },
          }}
          data={warehouseStock}
          title="Productos en Almacen"
          detailPanel={rowData => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Zona</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warehouseStockZone.filter(
                      o =>
                        parseInt(o.warehouse_id) ===
                        parseInt(rowData.id)
                    ).length > 0 ? (
                      warehouseStockZone
                        .filter(
                          o =>
                            parseInt(o.warehouse_id) ===
                            parseInt(rowData.id)
                        )
                        .map(o => (
                          <tr>
                            <td>{o.zone_id}</td>
                            <td>{o.amount}</td>
                          </tr>
                        ))
                    ) : (
                      <div>
                        <h3>Sin Existencias</h3>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            )
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
    warehouseStockZone: state.reducerWarehouse.warehouseStockZone,
    warehouseStock: state.reducerWarehouse.warehouseStock,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  create,
  update,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeMaterial)
