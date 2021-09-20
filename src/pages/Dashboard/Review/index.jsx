import React from 'react'
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
import Rodal from 'rodal'
import Button from '../../../components/Button/Button'
import './styles.scss'

const Review = props => {
  const {
    processes,
    ordersRequeriment,
    items,
    workstations,
    modalReview,
    qualityRequest,
    specialProcesses,
    processesReject,
  } = props
  const {
    register,
    handleSubmit
  } = useForm()
  const onSubmit = data => console.log(data)
  const order = props.modalReview.order
  if (
    order &&
    processes &&
    ordersRequeriment &&
    items &&
    workstations &&
    qualityRequest &&
    specialProcesses &&
    processesReject
  ) {
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

    return (
      <Rodal
        visible={modalReview.state}
        height={500}
        width={1100}
        onClose={() =>
          props.setModalReview({ state: false, order: {}, stage: 0 })
        }
      >
        <div className="modalReview">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modalReview__section">
              <h1>Revisión: {process.name}</h1>
              <h3>Tarima: {order.model}</h3>
              {process.material_in === 4 || process.material_in === 3 ? (
                <div>
                  {itemsRequerimient.map(item => (
                    <>
                      <div key={item.item.id}>
                        {item.item.length} x {item.item.width} x{' '}
                        {item.item.height} - {item.amount}
                      </div>
                      <input
                        type="number"
                        name={`item-${item.item.id}`}
                        ref={register}
                      />
                      {console.log(item)}
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
                            name={`reject_1_item_${item.item.id}`}
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
                            name={`reject_2_item_${item.item.id}`}
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
                            name={`reject_3_item_${item.item.id}`}
                            ref={register}
                          />
                        </div>
                      ) : null}
                    </>
                  ))}
                </div>
              ) : (
                <>
                  <div>{order.amount}</div>
                  <input type="number" name="amount_pallet" ref={register} />
                  {processesReject.find(pr => pr.id === process.reject_1) !==
                  undefined ? (
                    <div>
                      {
                        processesReject.find(pr => pr.id === process.reject_1)
                          .name
                      }
                      <input
                        type="number"
                        name={`reject_1_pallet_${order.pallet_id}`}
                        ref={register}
                      />
                    </div>
                  ) : null}
                  {processesReject.find(pr => pr.id === process.reject_2) !==
                  undefined ? (
                    <div>
                      {
                        processesReject.find(pr => pr.id === process.reject_2)
                          .name
                      }
                      <input
                        type="number"
                        name={`reject_2_pallet_${order.pallet_id}`}
                        ref={register}
                      />
                    </div>
                  ) : null}
                  {processesReject.find(pr => pr.id === process.reject_3) !==
                  undefined ? (
                    <div>
                      {
                        processesReject.find(pr => pr.id === process.reject_3)
                          .name
                      }
                      <input
                        type="number"
                        name={`reject_3_pallet_${order.pallet_id}`}
                        ref={register}
                      />
                    </div>
                  ) : null}
                </>
              )}
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
            <div className="modalReview__section">
              <ul>
                {qualityRequest
                  .filter(qr => qr.id === order.pallet_id)
                  .map(qr => (
                    <li>
                      {specialProcesses.find(
                        sp =>
                          parseInt(sp.id) === parseInt(qr.special_process_id)
                      ) !== undefined
                        ? specialProcesses.find(
                            sp =>
                              parseInt(sp.id) ===
                              parseInt(qr.special_process_id)
                          ).name
                        : 'Error'}
                      <input
                        type="number"
                        name={
                          specialProcesses.find(
                            sp =>
                              parseInt(sp.id) ===
                              parseInt(qr.special_process_id)
                          ).name
                        }
                        ref={register}
                        defaultValue="0"
                      />
                    </li>
                  ))}
              </ul>
              <Button type="submit">Enviar</Button>
            </div>
          </form>
        </div>
      </Rodal>
    )
  } else {
    return (
      <Rodal
        visible={modalReview.state}
        height={500}
        width={1100}
        onClose={() =>
          props.setModalReview({ state: false, order: {}, stage: 0 })
        }
      >
        <div>Cargando</div>
      </Rodal>
    )
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
    ordersRequeriment: state.reducerOrders.ordersRequeriment,
    workstations: state.reducerZones.workstations,
    items: state.reducerItems.items,
    qualityRequest: state.reducerSpecialProcesses.specialProcessesPallets,
    specialProcesses: state.reducerSpecialProcesses.specialProcesses,
    processesReject: state.reducerProcesses.processesReject,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
