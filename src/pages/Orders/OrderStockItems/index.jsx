import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  getAll,
  deleted,
  get,
  create,
  cleanStock,
} from '../../../actions/app'
import { orderSavePallets, checkPallets, orderPalletItem } from '../actions'
import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Table from '../../../components/Table/Table'

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
    props.history.push('/orders/stock-sawn')
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
    // eslint-disable-next-line
    const handleCheckPallet = (id, state) => {
      const pallet = order.pallets.find(pallet => pallet.pallet_id === id)

      if (pallet.check === 0) {
        props.checkPallets({ id, state, check: 1, stage: 2 })
      } else {
        props.checkPallets({ id, state: null, check: 0, stage: 0 })
      }
    }
    // eslint-disable-next-line
    let counter = 0

    const header = [
      'Madera',
      'Cantidad Requerida',
      'Cantidad Pendiente',
      'Secas',
      'Humedas',
      'Reparación',
      'Proveedor',
    ]

    const handleInputItem = (e, state, amount, id, itemId, supplier) => {
      if (e.key === 'Enter') {
        if (e.target.value > amount) {
          console.log('No debe ser mayor')
        } else {
          props.orderPalletItem({
            id,
            state,
            amount: e.target.value,
            itemId,
            stage: 1,
            check: 1,
            supplier,
          })
        }
      }
    }

    return (
      <>
        {mapedOrder.map(pallet => (
          <Card
            key={pallet.pallet_id}
            title={`${
              pallets.find(p => parseInt(p.id) === parseInt(pallet.pallet_id))
                .model
            } Cantidad: ${pallet.amount} Cantidad Pendiente: ${
              pallet.amount - pallet.amount_stock - pallet.amount_stock_supplier
            }`}
          >
            <Table head={header}>
              {items
                .filter(
                  item =>
                    parseInt(item.pallet_id) === parseInt(pallet.pallet_id)
                )
                .map((item, index) => {
                  const newRequiredItems =
                    pallet.amount -
                    pallet.amount_stock -
                    pallet.amount_stock_supplier
                  if (
                    item.amount_new * newRequiredItems >
                      stock.find(s => parseInt(s.id) === parseInt(item.id))
                        .dry ||
                    item.amount_new * newRequiredItems >
                      stock.find(s => parseInt(s.id) === parseInt(item.id))
                        .damp ||
                    item.amount_new * newRequiredItems >
                      stock.find(s => parseInt(s.id) === parseInt(item.id))
                        .repair
                  ) {
                    counter = 1
                  } else {
                    counter = 0
                  }

                  const amount_items =
                    pallet.amount_items.length > 0 &&
                    pallet.amount_items.find(i => i.id === item.id) !==
                      undefined
                      ? pallet.amount_items.find(i => i.id === item.id).amount
                      : 0

                  const amount_items_supplier =
                    pallet.amount_items_supplier.length > 0 &&
                    pallet.amount_items_supplier.find(i => i.id === item.id) !==
                      undefined
                      ? pallet.amount_items_supplier.find(i => i.id === item.id)
                          .amount
                      : 0

                  return (
                    <tr key={index}>
                      <td>{`${item.length} x ${item.width} x ${item.height} - ${item.name} x ${item.amount_new}`}</td>
                      <td>{item.amount_new * newRequiredItems}</td>
                      <td>
                        {item.amount_new * newRequiredItems -
                          amount_items -
                          amount_items_supplier}
                      </td>
                      <td
                        className={
                          item.amount_new * newRequiredItems <=
                          stock.find(s => parseInt(s.id) === parseInt(item.id))
                            .dry
                            ? '--success'
                            : null
                        }
                      >
                        <div>
                          {
                            stock.find(
                              s => parseInt(s.id) === parseInt(item.id)
                            ).dry
                          }
                        </div>
                        {pallet.stage2 === 1 ? (
                          <input
                            type="number"
                            defaultValue={
                              pallet.amount_items.length > 0 &&
                              pallet.amount_items.find(
                                i => i.id === item.id && i.check_stage === 'dry'
                              ) !== undefined
                                ? pallet.amount_items.find(
                                    i => i.id === item.id
                                  ).amount
                                : 0
                            }
                            onKeyPress={e =>
                              handleInputItem(
                                e,
                                'dry',
                                stock.find(
                                  s => parseInt(s.id) === parseInt(item.id)
                                ).dry,
                                pallet.pallet_id,
                                item.id,
                                false
                              )
                            }
                          />
                        ) : null}
                      </td>
                      <td
                        className={
                          item.amount_new * newRequiredItems <=
                          stock.find(s => parseInt(s.id) === parseInt(item.id))
                            .damp
                            ? '--success'
                            : null
                        }
                      >
                        <div>
                          {
                            stock.find(
                              s => parseInt(s.id) === parseInt(item.id)
                            ).damp
                          }
                        </div>
                        {pallet.stage2 === 1 ? (
                          <input
                            type="number"
                            defaultValue={
                              pallet.amount_items.length > 0 &&
                              pallet.amount_items.find(
                                i =>
                                  i.id === item.id && i.check_stage === 'damp'
                              ) !== undefined
                                ? pallet.amount_items.find(
                                    i => i.id === item.id
                                  ).amount
                                : 0
                            }
                            onKeyPress={e =>
                              handleInputItem(
                                e,
                                'damp',
                                stock.find(
                                  s => parseInt(s.id) === parseInt(item.id)
                                ).damp,
                                pallet.pallet_id,
                                item.id,
                                false
                              )
                            }
                          />
                        ) : null}
                      </td>
                      <td
                        className={
                          item.amount_new * newRequiredItems <=
                          stock.find(s => parseInt(s.id) === parseInt(item.id))
                            .repair
                            ? '--success'
                            : null
                        }
                      >
                        <div>
                          {
                            stock.find(
                              s => parseInt(s.id) === parseInt(item.id)
                            ).repair
                          }
                        </div>
                        {pallet.stage2 === 1 ? (
                          <input
                            defaultValue={
                              pallet.amount_items.length > 0 &&
                              pallet.amount_items.find(
                                i =>
                                  i.id === item.id && i.check_stage === 'repair'
                              ) !== undefined
                                ? pallet.amount_items.find(
                                    i => i.id === item.id
                                  ).amount
                                : 0
                            }
                            type="number"
                            onKeyPress={e =>
                              handleInputItem(
                                e,
                                'repair',
                                stock.find(
                                  s => parseInt(s.id) === parseInt(item.id)
                                ).repair,
                                pallet.pallet_id,
                                item.id,
                                false
                              )
                            }
                          />
                        ) : null}
                      </td>
                      <td
                        className={
                          item.amount_new * newRequiredItems <=
                          stock.find(s => parseInt(s.id) === parseInt(item.id))
                            .repair
                            ? '--success'
                            : null
                        }
                      >
                        {pallet.stage2_supplier === 1 ? (
                          <input
                            type="number"
                            defaultValue={
                              pallet.amount_items.length > 0 &&
                              pallet.amount_items.find(
                                i =>
                                  i.id === item.id &&
                                  i.check_stage === 'supplier'
                              ) !== undefined
                                ? pallet.amount_items.find(
                                    i => i.id === item.id
                                  ).amount
                                : 0
                            }
                            onKeyPress={e =>
                              handleInputItem(
                                e,
                                'supplier',
                                1000000,
                                pallet.pallet_id,
                                item.id,
                                true
                              )
                            }
                          />
                        ) : null}
                      </td>
                    </tr>
                  )
                })}
            </Table>
          </Card>
        ))}

        <Button className="btn --danger" onClick={() => props.history.goBack()}>
          Atras
        </Button>
        <Button onClick={() => handleNext()}>Siguiente</Button>
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
  orderPalletItem,
  cleanStock,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
