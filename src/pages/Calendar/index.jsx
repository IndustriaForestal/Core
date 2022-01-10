import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/es-mx'
import { connect } from 'react-redux'
import './styles.scss'
import Loading from '../../components/Loading/Loading'

import { getAll, setWraper } from '../../actions/app'

moment.locale('es')

const CalendarOrders = props => {
  const { orders, customers } = props
  const [active, setActive] = useState(false)

  useEffect(() => {
    props
      .getAll('orders', 'GET_ORDERS')
      .then(() => {
        props.getAll('customers', 'GET_CUSTOMERS')
      })
      .then(() => {
        props.setWraper(true)
      })
    // eslint-disable-next-line
  }, [])

  let eventList = []

  if (orders) {
    // eslint-disable-next-line
    orders.map(order => {
      if (order.pallets) {
        // eslint-disable-next-line
        order.pallets.map(pallet => {
          if (pallet.orderDateDelivery) {
            eventList.push({
              title: `${pallet.model}: ${pallet.amount}`,
              start: moment(pallet.orderDateDelivery).toDate(),
              end: moment(pallet.orderDateDelivery).toDate(),
              orderId: `/orders/shipments/${order.id}`,
            })
          }
        })
      }
    })
  }

  const handleClickEvent = e => {
    props.history.push(`/dashboard/kanban?id=${e}`)
  }

  if (orders && customers) {
    const newCalendar = customers.map(customer => {
      let ordersArray = []
      const ordersCusomter = orders
        .filter(order => order.customer_id === customer.id)
        .map(oc => {
          ordersArray.push({ ...oc, orderId: oc.id })
        })

      let calendarOrders = []

      for (let i = 0; i < 60; i++) {
        let calendarDay = []
        // eslint-disable-next-line
        ordersArray.map(order => {
          if (
            moment(order.delivery).format('YYYY-MM-DD') ===
            moment().add(i, 'days').format('YYYY-MM-DD')
          ) {
            calendarDay.push(order)
          }
        })
        calendarOrders.push(calendarDay)
      }

      return {
        id: customer.id,
        name: customer.name,
        orders: calendarOrders,
      }
    })

    let days = []
    for (let i = 0; i < 60; i++) {
      days.push(moment().add(i, 'days').format('YYYY-MM-DD'))
    }

    const handleAdd = () => {
      console.log(newCalendar)
    }

    return (
      <>
        <div
          className="calendarPro"
          style={{
            gridTemplateColumns: `repeat(${newCalendar.length + 1}, auto)`,
          }}
        >
          <div className="calendarPro__column">
            <div className="calendarPro__head">Fecha</div>

            {days.map(day => (
              <div key={day} className="calendarPro__day">
                {day}
              </div>
            ))}
          </div>
          {newCalendar.map((row, index) => {
            return (
              <div kye={index} className="calendarPro__column">
                <div className="calendarPro__head">{row.name}</div>
                {row.orders.map((order, i) => {
                  if (order.length > 0) {
                    return (
                      <div
                        key={i}
                        className="calendarPro__day"
                        onClick={() => console.log(order)}
                      >
                        <span
                          className="calendarPro__add"
                          onClick={() => handleAdd()}
                        >
                          +
                        </span>
                        <span className="calendarPro__counter">
                          {order.length}
                        </span>
                        {order.map(o => (
                          <div
                            key={o.orderId}
                            className={`calendarPro__event --${o.state}`}
                            onClick={() => handleClickEvent(o.orderId)}
                          >
                            {o.orderId}
                          </div>
                        ))}
                      </div>
                    )
                  } else {
                    return (
                      <div key={i} className="calendarPro__day">
                        <span
                          className="calendarPro__add"
                          onClick={() => handleAdd()}
                        >
                          +
                        </span>
                      </div>
                    )
                  }
                })}
              </div>
            )
          })}
        </div>
        <div
          className={`calendarPro__colors ${active ? '--active' : ''}`}
          onClick={() => setActive(!active)}
        >
          <ul>
            <li>
              <span style={{ backgroundColor: 'var(--naranja)' }}></span> En
              proceso de fabricación
            </li>
            <li>
              <span style={{ backgroundColor: 'var(--danger)' }}></span> Re
              programación externa o <br /> cancelación por parte del cliente
            </li>
            <li>
              <span style={{ backgroundColor: 'var(--success)' }}></span>{' '}
              Enviado
            </li>
            <li>
              <span style={{ backgroundColor: 'var(--primary)' }}></span>{' '}
              Reprogramación interna
            </li>
            <li>
              <span style={{ backgroundColor: 'var(--white)' }}></span> Termino
              (Finalizado)
            </li>
            <li>
              <span style={{ backgroundColor: 'var(--rosa)' }}></span>{' '}
              Aprobación de dirección <br /> pendiente
            </li>
            <li>
              <span style={{ backgroundColor: 'var(--warning)' }}></span>{' '}
              Confirmados pendientes <br /> por producir
            </li>
            {/* 
            Verde: enviado 
            Azul: re programación interna
            Blanco: fabricado, en proceso de término
            Rojo: re programación externa o cancelación o parte del cliente 
            Naranja: en proceso de fabricación 
            Rosa: aprobación de dirección pendiente 
            Amarillo: confirmados pendientes por producir
            */}
          </ul>
        </div>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    orders: state.reducerOrders.orders,
    customers: state.reducerCustomers.customers,
  }
}

const mapDispatchToProps = {
  getAll,
  setWraper,
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarOrders)
