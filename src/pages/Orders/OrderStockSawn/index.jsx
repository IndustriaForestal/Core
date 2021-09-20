import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import MaterialTable from 'material-table'
import { setTitle, getAll, deleted, get, create } from '../../../actions/app'
import { orderSavePallets, checkPallets, orderPalletSawn } from '../actions'
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
        props.getAll('items', 'GET_ITEMS')
      })
      .then(() => {
        props.getAll('stock/items', 'GET_STOCK_2')
      })
    // eslint-disable-next-line
  }, [])

  const { customers, pallets, order, stock, items } = props

  const handleNext = () => {
    props.history.push('/orders/estimated')
  }

  if (customers && pallets && stock && items) {
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

    const handleSawn = mapedOrder => {
      // eslint-disable-next-line
      mapedOrder.map(pallet => {
        let amount_sawn = []
        items
          .filter(
            item => parseInt(item.pallet_id) === parseInt(pallet.pallet_id)
          )
          // eslint-disable-next-line
          .map(item => {
            const amount_items = pallet.amount_items
            const amount_items_supplier = pallet.amount_items_supplier

            let amount_items_stage2 = 0
            let amount_items_stage2_suppliers = 0

            if (amount_items.length > 0) {
              amount_items
                .filter(i => i.id === item.id)
                .map(i => {
                  return (amount_items_stage2 += i.amount)
                })
            }

            if (amount_items_supplier.length > 0) {
              amount_items_supplier
                .filter(i => i.id === item.id)
                .map(i => {
                  return (amount_items_stage2_suppliers += i.amount)
                })
            }

            const newAmountItem =
              item.amount_new *
                (pallet.amount -
                  pallet.amount_stock -
                  pallet.amount_stock_supplier) -
              amount_items_stage2 -
              amount_items_stage2_suppliers

            amount_sawn.push({ id: item.id, amount: newAmountItem })
          })

        if (pallet.stage3 === 1 || pallet.stage3_supplier === 1) {
          props.orderPalletSawn({ id: pallet.pallet_id, amount_sawn })
        }
      })
    }

    return (
      <>
        <MaterialTable
          title="Mandar pedido a aserrio"
          columns={[
            {
              title: 'Modelo',
              field: 'pallet_id',
              lookup: lookupPallets,
            },
            { title: 'Entrega', field: 'date' },
          ]}
          detailPanel={rowData => {
            // eslint-disable-next-line
            let counter = 0
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
                      <th>Madera Habilitada</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      .filter(
                        item =>
                          parseInt(item.pallet_id) ===
                          parseInt(rowData.pallet_id)
                      )
                      .map((item, index) => {
                        if (
                          item.amount_new *
                            (rowData.amount -
                              rowData.amount_stock -
                              rowData.amount_stock_supplier) >
                            stock.find(
                              s => parseInt(s.id) === parseInt(item.id)
                            ).dry ||
                          item.amount_new *
                            (rowData.amount -
                              rowData.amount_stock -
                              rowData.amount_stock_supplier) >
                            stock.find(
                              s => parseInt(s.id) === parseInt(item.id)
                            ).damp ||
                          item.amount_new *
                            (rowData.amount -
                              rowData.amount_stock -
                              rowData.amount_stock_supplier) >
                            stock.find(
                              s => parseInt(s.id) === parseInt(item.id)
                            ).repair
                        ) {
                          counter = 1
                        } else {
                          counter = 0
                        }
                        const amount_items = rowData.amount_items
                        const amount_items_supplier =
                          rowData.amount_items_supplier

                        let amount_items_stage2 = 0
                        let amount_items_stage2_suppliers = 0

                        if (amount_items.length > 0) {
                          amount_items
                            .filter(i => i.id === item.id)
                            .map(i => {
                              return (amount_items_stage2 += i.amount)
                            })
                        }

                        if (amount_items_supplier.length > 0) {
                          amount_items_supplier
                            .filter(i => i.id === item.id)
                            .map(i => {
                              return (amount_items_stage2_suppliers += i.amount)
                            })
                        }

                        return (
                          <tr key={index}>
                            <td>{`${item.length} x ${item.width} x ${item.height} - ${item.name}`}</td>
                            <td>
                              {item.amount_new *
                                (rowData.amount -
                                  rowData.amount_stock -
                                  rowData.amount_stock_supplier) -
                                amount_items_stage2 -
                                amount_items_stage2_suppliers}
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </>
            )
          }}
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
          Cancelar
        </Button>
        <Button
          onClick={() => {
            handleNext()
            handleSawn(mapedOrder)
          }}
        >
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
    stock: state.reducerStock.stock2,
    pallets: state.reducerPallets.pallets,
    items: state.reducerItems.items,
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
  orderPalletSawn,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
