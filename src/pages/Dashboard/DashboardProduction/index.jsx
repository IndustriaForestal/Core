import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  setModal,
  setWraper,
  getAll,
  deleted,
  create,
  update,
} from '../../../actions/app'

import Rodal from 'rodal'
import Button from '../../../components/Button/Button'

const DashboardProduction = props => {
  const { processes, ordersRequeriment, items, workstations, modal } = props
  const [arrayWorkstation, setWorkstationID] = useState([])
  const order = props.modal.order

  if (order && processes && ordersRequeriment && items && workstations) {
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

    const handleStart = () => {
      if (arrayWorkstation.length > 0) {
        props
          .update(`orders/start/${order.id}`, 'START_ORDER', arrayWorkstation)
          .then(() => {
            props.getAll('orders/production', 'GET_ORDERS_PRODUCTION')
          })
          .then(() => {
            props.setModal(false)
          })
      } else {
        console.log('Seleccionar Workstation')
      }
    }

    return (
      <Rodal
        visible={modal.state}
        height={500}
        width={1100}
        onClose={() => props.setModal({ state: false, order: {}, stage: 0 })}
      >
        <div>
          {console.log(process, order, 'Process')}
          <h1>Proceso {order.type_process === 0 ? 'Regular' : 'Especial'}: {process.name}</h1>
          <h3>Tarima: {order.model}</h3>
          {process.id === 36 ? null : process.material_in === 4 ||
            process.material_in === 3 ? (
            <div>
              {itemsRequerimient.map(item => (
                <div key={item.id}>
                  {item.item.length} x {item.item.width} x {item.item.height} -{' '}
                  {item.amount}
                </div>
              ))}
            </div>
          ) : (
            order.amount
          )}
          <select
            name="Process"
            onChange={e =>
              e.target.value !== ''
                ? setWorkstationID([...arrayWorkstation, e.target.value])
                : null
            }
          >
            <option value="">Seleccionar</option>
            {workstations
              .filter(
                ws => ws.process_id === order.process_id && ws.active === 1
              )
              .map(ws => (
                <option key={ws.id} value={ws.id}>
                  {ws.workstation}
                  {console.log(ws)}
                </option>
              ))}
          </select>
          <table>
            <thead>
              <tr>
                <th>Estacion de trabajo asiganda</th>
              </tr>
            </thead>
            <tbody>
              {arrayWorkstation.map(w => (
                <tr>
                  <td>
                    {
                      workstations.find(item => item.id === parseInt(w))
                        .workstation
                    }
                  </td>
                  <td
                    onClick={() =>
                      setWorkstationID(arrayWorkstation.filter(ws => ws !== w))
                    }
                  >
                    X
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button onClick={handleStart}>Iniciar</Button>
        </div>
      </Rodal>
    )
  } else {
    return (
      <Rodal
        visible={modal.state}
        height={500}
        width={1100}
        onClose={() => props.setModal({ state: false, order: {}, stage: 0 })}
      >
        <div>Cargando</div>
      </Rodal>
    )
  }
}

const mapDispatchToProps = {
  setTitle,
  setModal,
  setWraper,
  getAll,
  deleted,
  create,
  update,
}

const mapStateToProps = state => {
  return {
    user: state.reducerApp.user,
    modal: state.reducerApp.modal,
    processes: state.reducerProcesses.processes,
    ordersProduction: state.reducerOrders.ordersProduction,
    ordersRequeriment: state.reducerOrders.ordersRequeriment,
    workstations: state.reducerZones.workstations,
    items: state.reducerItems.items,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProduction)
