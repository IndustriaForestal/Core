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
import './styles.scss'

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
    ordersHistory,
    ordersWork,
  } = props
  const { register, handleSubmit } = useForm()

  const { id } = useParams()
  const [next, setNext] = useState(true)

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
        props.getAll('orders/history', 'GET_ORDERS_HISTORY')
      })
  }, [])

  const onSubmit = data => {
    props
      .create('orders/history', 'CREATE_HISTORY', data)
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
    ordersHistory &&
    ordersWork
  ) {
    const order =
      ordersWork.find(o => o.id === parseInt(id)) !== undefined
        ? ordersWork.find(o => o.id === parseInt(id))
        : 0

    const orderHistory = ordersHistory.find(
      o => o.order_production_id === parseInt(id)
    )

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
      <Card title="Revisi??n de calidad">
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
                        defaultValue={orderHistory.amount_final}
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
                            defaultValue={orderHistory.r1}
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
                            defaultValue={orderHistory.r2}
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
                            defaultValue={orderHistory.r3}
                          />
                          <input
                            type="hidden"
                            value={item.amount}
                            name={`amount-items-${item.item.id}-requirement`}
                            ref={register}
                          />
                        </div>
                      ) : null}
                      <div>
                        <div>Reproceso</div>
                        <input
                          type="number"
                          name={`reject-4-items-${item.item.id}`}
                          ref={register}
                          defaultValue="0"
                        />
                        <input
                          type="hidden"
                          value={order.amount}
                          name={`amount-items-${item.item.id}-requirement`}
                          ref={register}
                        />
                      </div>
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
                  defaultValue={orderHistory.amount_final}
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
                      defaultValue={orderHistory.r1}
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
                      defaultValue={orderHistory.r2}
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
                      defaultValue={orderHistory.r3}
                    />
                  </div>
                ) : null}
                <div>
                  <div>Reproceso</div>
                  <input
                    type="number"
                    name={`reject-4-pallet-${order.pallet_id}`}
                    ref={register}
                    defaultValue="0"
                  />
                  <input
                    type="hidden"
                    value={order.amount}
                    name={`amount-pallet-${order.pallet_id}-requirement`}
                    ref={register}
                  />
                </div>
              </div>
            )}
            {process.id === 36 ? null : (
              <div className="review__elFelin">
                <input
                  type="text"
                  placeholder="Humedad Entrada"
                  ref={register}
                  name="damp_start"
                />
                <input
                  type="text"
                  placeholder="Humedad Salida"
                  ref={register}
                  name="damp_end"
                />
                <input
                  type="text"
                  placeholder="Cant. Muestreo"
                  ref={register}
                  name="test"
                />
              </div>
            )}
          </div>
          <div className="review__section">
            {process.id === 36 ? null : (
              <ul>
                {qualityRequest
                  .filter(qr => qr.id === order.pallet_id)
                  .map(qr => (
                    <li>
                      {specialProcesses.find(
                        sp =>
                          parseInt(sp.id) ===
                          parseInt(qr.special_process_id)
                      ) !== undefined
                        ? `${
                            specialProcesses.find(
                              sp =>
                                parseInt(sp.id) ===
                                parseInt(qr.special_process_id)
                            ).name
                          }`
                        : 'Error'}
                      <input
                        type="number"
                        name={`${
                          specialProcesses.find(
                            sp =>
                              parseInt(sp.id) ===
                              parseInt(qr.special_process_id)
                          ).id
                        }+quality`}
                        ref={register}
                        defaultValue="0"
                      />
                    </li>
                  ))}
              </ul>
            )}
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
    ordersHistory: state.reducerOrders.ordersHistory,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
