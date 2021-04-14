import React, { useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/es-mx'
import { connect } from 'react-redux'
import './styles.scss'
import Loading from '../../components/Loading/Loading'

import { getAll, setWraper } from '../../actions/app'

moment.locale('es')

const CalendarOrders = props => {
  const { orders, customers } = props

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
              orderId: `/orders/shipments/${order._id}`,
            })
          }
        })
      }
    })
  }

  const handleClickEvent = e => {
    props.history.push(`/orders/shipments/${e}`)
  }

  if (orders && customers) {
    const newCalendar = customers.map(customer => {
      let ordersArray = []
      const ordersCusomter = orders.filter(
        order => order.customerId._id === customer._id
      )
   // eslint-disable-next-line
      ordersCusomter.map(oc => {
           // eslint-disable-next-line
        oc.pallets.map(pallet => {
          ordersArray.push({ ...pallet, orderId: oc._id })
        })
      })
      let calendarOrders = []

      for (let i = 0; i < 60; i++) {
        let calendarDay = []
           // eslint-disable-next-line
        ordersArray.map(order => {
          if (
            moment(order.orderDateDelivery).format('YYYY-MM-DD') ===
            moment().add(i, 'days').format('YYYY-MM-DD')
          ) {
            calendarDay.push(order)
          }
        })
        calendarOrders.push(calendarDay)
      }

      return {
        _id: customer._id,
        name: customer.name,
        orders: calendarOrders,
      }
    })

    let days = []
    for (let i = 0; i < 60; i++) {
      days.push(moment().add(i, 'days').format('YYYY-MM-DD'))
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
              <div className="calendarPro__day">{day}</div>
            ))}
          </div>
          {newCalendar.map(row => {
            return (
              <div className="calendarPro__column">
                <div className="calendarPro__head">{row.name}</div>
                {row.orders.map((order, i) => {
                  if (order.length > 0) {
                    return (
                      <div className="calendarPro__day">
                        <span className="calendarPro__counter">
                          {order.length}
                        </span>
                        {order.map(o => (
                          <div
                            className="calendarPro__event"
                            onClick={() => handleClickEvent(o.orderId)}
                          >
                            {o.model} {o.amount} {o.orderNumber}
                          </div>
                        ))}
                      </div>
                    )
                  } else {
                    return <div className="calendarPro__day"></div>
                  }
                })}
              </div>
            )
          })}
        </div>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    customers: state.customers,
  }
}

const mapDispatchToProps = {
  getAll,
  setWraper,
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarOrders)
