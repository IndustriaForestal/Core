import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import MaterialTable from 'material-table'
import { setTitle, getAll, deleted, get, create } from '../../../actions/app'
import { orderSavePallets, checkPallets, orderPalletStock } from '../actions'
import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'

const CreateOrder = props => {
  useEffect(() => {
    const topbar = {
      title: 'Crear Orden Stock',
      menu: {
        Pedidos: '/orders',
        'Crear Orden': '/orders/create',
      },
    }
    props.setTitle(topbar)
    props
      .getAll('customers', 'GET_CUSTOMERS')
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
      .then(() => {
        props.getAll('stock', 'GET_STOCK')
      })
    // eslint-disable-next-line
  }, [])

  const { customers, pallets, order, stock } = props

  if (customers && pallets && stock) {
    const lookupPallets = {}

    pallets.map(item => (lookupPallets[item.id] = item.model))

    const mapedOrder = order.pallets.map(pallet => {
      const stockFilter = stock.find(
        s => parseInt(s.id) === parseInt(pallet.pallet_id)
      )
      return {
        ...pallet,
        dry: stockFilter.dry,
        damp: stockFilter.damp,
        stockSecurity: stockFilter.stock,
      }
    })

    const handleInputStock = (e, state, amount, id, supplier) => {
      if (e.key === 'Enter') {
        if (e.target.value > amount) {
          console.log('No debe ser mayor')
        } else {
          props.orderPalletStock({
            id,
            state,
            amount: e.target.value,
            stage: 1,
            check: 1,
            supplier,
          })
        }
      }
    }

    return (
      <>
        <MaterialTable
          title="Orden Inventario de Tarima"
          columns={[
            {
              title: 'Modelo',
              field: 'pallet_id',
              lookup: lookupPallets,
            },
            { title: 'Cantidad', field: 'amount' },
            {
              title: 'Pendiente',
              field: 'amount',
              render: rowData => (
                <div>
                  {rowData.amount -
                    rowData.amount_stock -
                    rowData.amount_stock_supplier}
                </div>
              ),
            },
            {
              title: 'Secas',
              field: 'dry',
              render: rowData => (
                <div>
                  <label htmlFor="cbox2">{rowData.dry} </label>
                  {rowData.stage1 ? (
                    <input
                      type="number"
                      defaultValue={
                        rowData.amount_stock && rowData.check_type === 'dry'
                          ? rowData.amount_stock
                          : 0
                      }
                      onKeyPress={e =>
                        handleInputStock(
                          e,
                          'dry',
                          rowData.dry,
                          rowData.pallet_id,
                          false
                        )
                      }
                    />
                  ) : null}
                </div>
              ),
            },
            {
              title: 'Humedas',
              field: 'damp',
              render: rowData => (
                <div>
                  <label htmlFor="cbox2">{rowData.damp} </label>
                  {rowData.stage1 ? (
                    <input
                      type="number"
                      defaultValue={
                        rowData.amount_stock && rowData.check_type === 'damp'
                          ? rowData.amount_stock
                          : 0
                      }
                      onKeyPress={e =>
                        handleInputStock(
                          e,
                          'damp',
                          rowData.damp,
                          rowData.pallet_id,
                          false
                        )
                      }
                    />
                  ) : null}
                </div>
              ),
            },
            {
              title: 'Seguridad',
              field: 'stockSecurity',
              render: rowData => (
                <div>
                  <label htmlFor="cbox2">{rowData.stockSecurity} </label>
                  {rowData.stage1 ? (
                    <input
                      type="number"
                      defaultValue={
                        rowData.amount_stock &&
                        rowData.check_type === 'stockSecurity'
                          ? rowData.amount_stock
                          : 0
                      }
                      onKeyPress={e =>
                        handleInputStock(
                          e,
                          'stockSecurity',
                          rowData.stockSecurity,
                          rowData.pallet_id,
                          false
                        )
                      }
                    />
                  ) : null}
                </div>
              ),
            },
            {
              title: 'Proveedor',
              field: 'stockSecurity',
              render: rowData => (
                <div>
                  {rowData.stage1_supplier ? (
                    <input
                      type="number"
                      defaultValue={
                        rowData.amount_stock &&
                        rowData.check_type === 'stockSecurity'
                          ? rowData.amount_stock
                          : 0
                      }
                      onKeyPress={e =>
                        handleInputStock(
                          e,
                          'supplier',
                          10000,
                          rowData.pallet_id,
                          true
                        )
                      }
                    />
                  ) : null}
                </div>
              ),
            },
            { title: 'Entrega', field: 'date' },
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
          data={mapedOrder}
          options={{
            rowStyle: rowData => ({
              backgroundColor: rowData.check === 1 ? '#90be6d' : null,
              color: rowData.check === 1 ? '#FFFFFF' : null,
            }),
          }}
        />
        <Button className="btn --danger" onClick={() => props.history.goBack()}>
          Atras
        </Button>
        <Button onClick={() => props.history.push('/orders/stock-items')}>
          Siguiente
        </Button>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    customers: state.reducerCustomers.customers,
    stock: state.reducerStock.stock,
    pallets: state.reducerPallets.pallets,
    order: state.reducerOrders.order,
    user: state.reducerApp.user,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  orderSavePallets,
  checkPallets,
  orderPalletStock,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
