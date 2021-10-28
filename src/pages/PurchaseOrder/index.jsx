import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import './styles.scss'
import MaterialTable from 'material-table'
import Button from '../../components/Button/Button'

const Processes = props => {
  const { purchaseOrders, user, pallets, items, suppliers } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Ordenes de compra',
      menu: {
        'Ordenes de compra': '/purchase-order',
      },
    }
    setTitle(topbar)
    props
      .getAll('purchaseOrders', 'GET_PURCHASE_ORDERS')
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
      .then(() => {
        props.getAll('items', 'GET_ITEMS')
      })
      .then(() => {
        props.getAll('suppliers', 'GET_SUPPLIERS')
      })

    // eslint-disable-next-line
  }, [])

  if (purchaseOrders && pallets && items && suppliers) {
    const data = purchaseOrders.map(po => {
      const item = items.find(p => p.id === po.item_id)

      return {
        ...po,
        product:
          po.pallet_id !== null
            ? `Tarima: ${pallets.find(p => p.id === po.pallet_id).model}`
            : po.item_id !== null && item !== undefined
            ? `Madera Habilitada: ${item.length} x ${item.width} x ${item.height}`
            : 'Trozo',
      }
    })

    return (
      <MaterialTable
        title="Orden de compra a proveedores"
        columns={[
          { title: 'Orden de Embarque', field: 'order_id' },
          { title: 'Compra', field: 'product' },
          { title: 'Cantidad necesaria', field: 'amount' },
          {
            title: 'Cantidad comprada',
            field: 'amount',
            render: rowData => <input type="number" />,
          },
          {
            title: 'Proveedor',
            field: 'amount',
            render: rowData => (
              <select name="filter">
                <option value="0">Seleccionar</option>
                {suppliers.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            ),
          },
          {
            title: 'Acciones',
            field: 'amount',
            render: rowData => <Button>Agregar</Button>,
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
        data={data}
        detailPanel={rowData => {
          return (
            <>
              <table
                style={{
                  width: '100%',
                  padding: '15px',
                  textAlign: 'center',
                }}
              >
                <thead>
                  <tr>
                    <th>Proceso</th>
                    <th>Materiales</th>
                    <th>Inicio</th>
                  </tr>
                </thead>
                <tbody>
                  {rowData.dataSuppliers.filter(d => d.id === rowData.id).map((d) => (
                    <tr key={d.id}>
                      <td>{process.process_name}</td>
                      <td>{process.material_in}</td>
                      <td>{process.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )
        }}
      />
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    purchaseOrders: state.reducerPurchaseOrders.purchaseOrders,
    items: state.reducerItems.items,
    pallets: state.reducerPallets.pallets,
    user: state.reducerApp.user,
    suppliers: state.reducerSuppliers.suppliers,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  create,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(Processes)
