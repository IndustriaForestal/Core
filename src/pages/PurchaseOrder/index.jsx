import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { setTitle, getAll, deleted, create, update } from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import './styles.scss'
import MaterialTable from 'material-table'
import Button from '../../components/Button/Button'

import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
// pick a date util library
import MomentUtils from '@date-io/moment'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import 'moment/locale/es'

const Processes = props => {
  const {
    purchaseOrders,
    user,
    pallets,
    items,
    suppliers,
    purchaseOrdersSuppliers,
  } = props
  const userId = user.id
  const [order, setOrder] = useState([])
  const [amount, setAmount] = useState()
  const [supplier, setSupplier] = useState()
  const [selectedDate, setDate] = useState(new Date())

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
      .then(() => {
        props.getAll(
          'purchaseOrders/suppliers',
          'GET_PURCHASE_ORDERS_SUPPLIERS'
        )
      })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (purchaseOrdersSuppliers) {
      setOrder(purchaseOrdersSuppliers)
    }
    // eslint-disable-next-line
  }, [purchaseOrdersSuppliers])

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#40b5ed' },
      secondary: { main: '#949494' },
    },
  })

  const handleSaveSupplier = id => {
    setOrder([
      ...order,
      { order_id: id, supplier_id: supplier, amount, date: selectedDate },
    ])
  }

  const handleDeleteOrder = (id, supplier_id) => {
    setOrder(
      order.filter(
        item => !(item.order_id === id && item.supplier_id === supplier_id)
      )
    )
  }

  const handleSave = id => {
    const data = order.filter(
      item => item.order_id === id && item.id === undefined
    )
    props.create('purchaseOrders', 'CREATE_PURCHASE_ORDER', data)
  }

  const handleDeleteBD = id => {
    props.deleted(`purchaseOrders/${id}`, 'DELETE_PURCHASE_ORDER').then(() => {
      props.getAll('purchaseOrders/suppliers', 'GET_PURCHASE_ORDERS_SUPPLIERS')
    })
  }

  if (
    purchaseOrders &&
    pallets &&
    items &&
    suppliers &&
    purchaseOrdersSuppliers
  ) {
    const data = purchaseOrders
      .filter(po => {
        let validation
        let initialValue = 0
        const orders = purchaseOrdersSuppliers
          .filter(item => item.order_id === po.id && item.ready === 1)
          .reduce((count, i) => count + parseInt(i.amount), initialValue)

        orders >= parseInt(po.amount)
          ? (validation = false)
          : (validation = true)

        return po.amount > 0 && validation
      })
      .map(po => {
        const item = items.find(p => p.id === po.item_id)
        return {
          ...po,
          delivery: moment(po.delivery).format('DD/MM/YYYY HH:mm:ss'),
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
          {
            title: 'Orden de Embarque',
            field: 'order_id',
          },
          { title: 'Compra', field: 'product' },
          { title: 'Fecha limite', field: 'delivery' },
          {
            title: 'Cantidad necesaria',
            field: 'amount',
          },
          {
            title: 'Cantidad comprada',
            field: 'amount',
            render: rowData => (
              <input type="number" onChange={e => setAmount(e.target.value)} />
            ),
          },
          {
            title: 'Proveedor',
            field: 'amount',
            render: rowData => (
              <select name="filter" onChange={e => setSupplier(e.target.value)}>
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
            title: 'Fecha estimada de entrega',
            field: 'amount',
            render: rowData => (
              <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={MomentUtils} locale={'es'}>
                  <DateTimePicker
                    okLabel="Guardar"
                    clearLabel="Limpiar"
                    cancelLabel="Cancelar"
                    value={selectedDate}
                    onChange={setDate}
                  />
                </MuiPickersUtilsProvider>
              </ThemeProvider>
            ),
          },
          {
            title: 'Acciones',
            field: 'amount',
            render: rowData => (
              <Button onClick={() => handleSaveSupplier(rowData.order_id)}>
                Agregar
              </Button>
            ),
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
                    <th>Cantidad</th>
                    <th>Proveedor</th>
                    <th>Fecha estimada de entrega</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {order
                    .filter(d => d.order_id === rowData.order_id)
                    .map((d, i) => (
                      <tr key={i}>
                        <td>{d.amount}</td>
                        <td>
                          {suppliers.find(
                            supplier =>
                              parseInt(supplier.id) === parseInt(d.supplier_id)
                          ) !== undefined
                            ? suppliers.find(
                                supplier =>
                                  parseInt(supplier.id) ===
                                  parseInt(d.supplier_id)
                              ).name
                            : 'Proveedor eliminado'}
                        </td>
                        <td>
                          {d.delivery !== undefined
                            ? moment(d.delivery).format('YYYY-MM-DD HH:mm:ss')
                            : moment(d.date).format('YYYY-MM-DD HH:mm:ss')}
                        </td>
                        <td>
                          {d.id !== undefined ? null : (
                            <Button
                              className="btn --success"
                              onClick={() => handleSave(d.order_id)}
                            >
                              Guardar
                            </Button>
                          )}
                          {d.id !== undefined ? (
                            <Button
                              className="btn --danger"
                              onClick={() => handleDeleteBD(d.id)}
                            >
                              X
                            </Button>
                          ) : (
                            <Button
                              className="btn --danger"
                              onClick={() =>
                                handleDeleteOrder(d.order_id, d.supplier_id)
                              }
                            >
                              X
                            </Button>
                          )}
                        </td>
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
    purchaseOrdersSuppliers:
      state.reducerPurchaseOrders.purchaseOrdersSuppliers,
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
