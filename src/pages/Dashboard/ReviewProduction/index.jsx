import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  setModalReview,
  setWraper,
  getAll,
  deleted,
  create,
  update,
} from '../../../actions/app'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import moment from 'moment'

const Review = props => {
  const {
    processes,
    ordersProduction,
    ordersRequeriment,
    items,
    workstations,
    qualityRequest,
    specialProcesses,
    processesReject,
    purchaseOrdersSuppliers,
    suppliers,
    ordersWork,
    warehouseItems,
    warehouseStockZone,
    user,
  } = props
  const { register, handleSubmit } = useForm()

  const { id } = useParams()
  const [next, setNext] = useState(true)
  const [inputOut, setAmountInputOut] = useState(0)

  useEffect(() => {
    props.setWraper(true)
    props
      .getAll('processes', 'GET_PROCESSES')
      .then(() => {
        props.getAll('orders/production', 'GET_ORDERS_PRODUCTION')
      })
      .then(() => {
        props.getAll('orders/work', 'GET_ORDERS_WORK')
      })
      .then(() => {
        props.getAll('orders/requeriment', 'GET_ORDERS_REQUERIMENT')
      })
      .then(() => {
        props.getAll('items', 'GET_ITEMS')
      })
      .then(() => {
        props.getAll('zones/workstations', 'GET_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('specialProcesses', 'GET_SPECIAL_PROCESSES')
      })
      .then(() => {
        props.getAll('processes/reject', 'GET_PROCESSES_REJECT')
      })
      .then(() => {
        props.getAll(
          'specialProcesses/pallets',
          'GET_SPECIAL_PROCESSES_PALLETS'
        )
      })
      .then(() => {
        props.getAll(
          'purchaseOrders/suppliers',
          'GET_PURCHASE_ORDERS_SUPPLIERS'
        )
      })
      .then(() => {
        props.getAll('suppliers', 'GET_SUPPLIERS')
      })
      .then(() => {
        props.getAll('warehouse', 'GET_WAREHOUSE_ITEMS')
      })
      .then(() => {
        props.getAll(
          'warehouse/stock_zones',
          'GET_WAREHOUSE_STOCK_ZONE'
        )
      })
  }, [])

  console.log(inputOut)

  const hanldeUpdateStockZoneWarehouse = () => {
    const negativeInput = parseInt(inputOut.amount) * -1
    inputOut.amount > inputOut.stock
      ? console.log('Mayor')
      : parseInt(inputOut.stock) - inputOut.amount === 0
      ? props
          .create(
            `warehouse/stock/${inputOut.warehouse_id}`,
            'PALLET_HISTORY',
            {
              amount: negativeInput,
              user_id: user.id,
              zone_id: inputOut.zone_id,
              sz: inputOut.sz,
              delete: true,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
          )
          .then(() => {
            props.getAll(
              'warehouse/stock_zones',
              'GET_WAREHOUSE_STOCK_ZONE'
            )
          })
      : props
          .create(
            `warehouse/stock/${inputOut.warehouse_id}`,
            'PALLET_HISTORY',
            {
              amount: negativeInput,
              user_id: user.id,
              zone_id: inputOut.zone_id,
              sz: inputOut.sz,
              delete: false,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
          )
          .then(() => {
            props.getAll(
              'warehouse/stock_zones',
              'GET_WAREHOUSE_STOCK_ZONE'
            )
          })
  }

  const onSubmit = data => {
    props
      .create('orders/history/production', 'CREATE_HISTORY', data)
      .then(() => {
        hanldeUpdateStockZoneWarehouse()
      })
      .then(() => {
        props.history.goBack()
      })
  }

  if (
    processes &&
    ordersProduction &&
    ordersRequeriment &&
    items &&
    workstations &&
    qualityRequest &&
    specialProcesses &&
    processesReject &&
    purchaseOrdersSuppliers &&
    suppliers &&
    ordersWork &&
    warehouseItems &&
    warehouseStockZone
  ) {
    const order =
      ordersWork.find(o => o.id === parseInt(id)) !== undefined
        ? ordersWork.find(o => o.id === parseInt(id))
        : 0

    const itemsRequerimient = ordersRequeriment
      .filter(requeriment => requeriment.order_id === order.order_id)
      .map(requeriment => {
        return {
          item: items.find(item => item.id === requeriment.item_id),
          amount: requeriment.amount,
        }
      })

    const process =
      processes.find(process => process.id === order.process_id) || {}

    const purchaseOrder = purchaseOrdersSuppliers.find(
      po => po.order_id === order.order_id
    )

    const supplier = suppliers.find(
      s => s.id === purchaseOrder?.supplier_id
    )

    return (
      <Card title="Producci??n">
        <form onSubmit={handleSubmit(onSubmit)} className="review">
          <div className="review__section">
            <h1>
              Proveedor:{' '}
              {supplier !== undefined
                ? supplier.name
                : 'Sin Proveedor'}
              {supplier !== undefined ? (
                <div
                  style={{
                    backgroundColor: `${supplier.color}`,
                    height: '20px',
                    width: '20px',
                  }}
                ></div>
              ) : null}
            </h1>
            <h1>Revisi??n: {process.name}</h1>
            <h3>Tarima: {order.model}</h3>
            {process.id === 36 ? null : order.item_id !== null ? (
              <div className="review__elFelin">
                {itemsRequerimient
                  .filter(i => i.item.id === order.item_id)
                  .map(item => (
                    <div className="review__box">
                      <div key={item.item.id}>
                        {item.item.length} x {item.item.width} x{' '}
                        {item.item.height} - Cantidad requerida:{' '}
                        {item.amount}
                      </div>
                      <input
                        type="number"
                        name={`items-${item.item.id}`}
                        ref={register}
                      />
                      {processesReject.find(
                        pr => pr.id === process.reject_1
                      ) !== undefined ? (
                        <div>
                          <div>
                            {
                              processesReject.find(
                                pr => pr.id === process.reject_1
                              ).name
                            }
                          </div>
                          <input
                            type="number"
                            name={`reject-1-items-${item.item.id}`}
                            ref={register}
                          />
                        </div>
                      ) : null}
                      {processesReject.find(
                        pr => pr.id === process.reject_2
                      ) !== undefined ? (
                        <div>
                          <div>
                            {' '}
                            {
                              processesReject.find(
                                pr => pr.id === process.reject_2
                              ).name
                            }
                          </div>
                          <input
                            type="number"
                            name={`reject-2-items-${item.item.id}`}
                            ref={register}
                          />
                        </div>
                      ) : null}
                      {processesReject.find(
                        pr => pr.id === process.reject_3
                      ) !== undefined ? (
                        <div>
                          <div>
                            {' '}
                            {
                              processesReject.find(
                                pr => pr.id === process.reject_3
                              ).name
                            }
                          </div>
                          <input
                            type="number"
                            name={`reject-3-items-${item.item.id}`}
                            ref={register}
                          />
                          <input
                            type="hidden"
                            value={item.amount}
                            name={`amount-items-${item.item.id}-requirement`}
                            ref={register}
                          />
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="review__box">
                <div>{order.amount}</div>
                <input
                  type="number"
                  name={`pallet-${order.pallet_id}`}
                  ref={register}
                />
                {processesReject.find(
                  pr => pr.id === process.reject_1
                ) !== undefined ? (
                  <div>
                    {
                      processesReject.find(
                        pr => pr.id === process.reject_1
                      ).name
                    }
                    <input
                      type="number"
                      name={`reject-1-pallet-${order.pallet_id}`}
                      ref={register}
                    />
                  </div>
                ) : null}
                {processesReject.find(
                  pr => pr.id === process.reject_2
                ) !== undefined ? (
                  <div>
                    {
                      processesReject.find(
                        pr => pr.id === process.reject_2
                      ).name
                    }
                    <input
                      type="number"
                      name={`reject-2-pallet-${order.pallet_id}`}
                      ref={register}
                    />
                  </div>
                ) : null}
                {processesReject.find(
                  pr => pr.id === process.reject_3
                ) !== undefined ? (
                  <div>
                    {
                      processesReject.find(
                        pr => pr.id === process.reject_3
                      ).name
                    }
                    <input
                      type="number"
                      name={`reject-3-pallet-${order.pallet_id}`}
                      ref={register}
                    />
                    <input
                      type="hidden"
                      value={order.amount}
                      name={`amount-pallet-${order.pallet_id}-requirement`}
                      ref={register}
                    />
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <div className="review__section">
            {/*  <div>
              <select
                name="next"
                ref={register}
                onChange={e => setNext(e.target.value === '0' ? false : true)}
              >
                <option value="0">Siguiente Proceso</option>
                <option value="1">Inventario</option>
              </select>
            </div> */}
            {process.id === 36 ? (
              next === true ? (
                <>
                  <input
                    type="text"
                    placeholder="Pies Tabla"
                    ref={register}
                    name="raw_pie"
                  />
                  <input
                    type="text"
                    placeholder="Ancho"
                    ref={register}
                    name="raw_width"
                  />
                  <input
                    type="text"
                    placeholder="Alto"
                    ref={register}
                    name="raw_height"
                  />
                  <input
                    type="text"
                    placeholder="Largo"
                    ref={register}
                    name="raw_length"
                  />
                  <input
                    type="text"
                    placeholder="Cant."
                    ref={register}
                    name="raw_amount"
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Pies Tabla"
                    ref={register}
                    name="raw_pie"
                  />
                </>
              )
            ) : null}
            <div>
              <input
                type="hidden"
                value={
                  process.material_in === 4 ||
                  process.material_in === 3
                    ? 'items'
                    : 'pallet'
                }
                name="type"
                ref={register}
              />
              <input
                type="hidden"
                value={process.id === 36 ? true : false}
                name="trozo"
                ref={register}
              />
              <input
                type="hidden"
                value={id}
                name="order_production_id"
                ref={register}
              />
              <input
                type="hidden"
                value={process.id}
                name="processId"
                ref={register}
              />

              {warehouseItems.find(
                item => item.process_id === process.id
              ) !== undefined
                ? warehouseItems
                    .filter(item => item.process_id === process.id)
                    .map(item => {
                      return (
                        <div key={item.id}>
                          <hr />
                          <h3>{item.name}</h3>

                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <table
                              style={{
                                width: '100%',
                                textAlign: 'center',
                              }}
                            >
                              <thead>
                                <tr>
                                  <th>Zona</th>
                                  <th>Disponible</th>
                                  <th>Cantidad</th>
                                </tr>
                              </thead>
                              <tbody>
                                {warehouseStockZone.filter(
                                  wh => wh.warehouse_id === item.id
                                ).length > 0 ? (
                                  warehouseStockZone
                                    .filter(
                                      wh =>
                                        wh.warehouse_id === item.id
                                    )
                                    .map(o => (
                                      <tr key={o.id}>
                                        <td>{o.zone_id}</td>
                                        <td>{o.amount}</td>
                                        <td>
                                          <input
                                            type="text"
                                            onInput={e =>
                                              setAmountInputOut({
                                                amount:
                                                  e.target.value,
                                                zone_id: o.zone_id,
                                                sz: o.id,
                                                stock: o.amount,
                                                warehouse_id: item.id,
                                              })
                                            }
                                          />
                                        </td>
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
                        </div>
                      )
                    })
                : null}

              <Button type="submit">Enviar</Button>
            </div>
          </div>
        </form>
      </Card>
    )
  } else {
    return <div></div>
  }
}

const mapDispatchToProps = {
  setTitle,
  setModalReview,
  setWraper,
  getAll,
  deleted,
  create,
  update,
}

const mapStateToProps = state => {
  return {
    user: state.reducerApp.user,
    modalReview: state.reducerApp.modalReview,
    processes: state.reducerProcesses.processes,
    ordersProduction: state.reducerOrders.ordersProduction,
    ordersWork: state.reducerOrders.ordersWork,
    ordersRequeriment: state.reducerOrders.ordersRequeriment,
    workstations: state.reducerZones.workstations,
    items: state.reducerItems.items,
    qualityRequest:
      state.reducerSpecialProcesses.specialProcessesPallets,
    specialProcesses: state.reducerSpecialProcesses.specialProcesses,
    processesReject: state.reducerProcesses.processesReject,
    purchaseOrdersSuppliers:
      state.reducerPurchaseOrders.purchaseOrdersSuppliers,
    suppliers: state.reducerSuppliers.suppliers,
    warehouseStockZone: state.reducerWarehouse.warehouseStockZone,
    warehouseItems: state.reducerWarehouse.warehouseItems,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
