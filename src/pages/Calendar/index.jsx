import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { connect } from 'react-redux'

import { getAll } from '../../actions/app'

import Card from '../../components/Card/Card'

import 'react-big-calendar/lib/css/react-big-calendar.css'

moment.locale('es')
const localizer = momentLocalizer(moment)

const CalendarOrders = props => {
  const { orders } = props

  useEffect(() => {
    props.getAll('orders', 'GET_ORDERS')
  }, [])

  let eventList = []

  if (orders && orders.filter(order => order.completed !== 1).length > 0) {
    eventList = orders
      .filter(order => order.completed !== 1)
      .map(order => {
        console.log(order)
        if (order.orderType === 0) {
          return {
            title: order.orderNumber,
            start: moment(order.ordersProduction[0].date).toDate(),
            end: moment(order.ordersProduction[0].date).toDate(),
            orderId: order._id,
          }
        } else {
          return {
            title: order.orderNumber,
            start: moment(order.orderFast.deliveryDate).toDate(),
            end: moment(order.orderFast.deliveryDate).toDate(),
            orderId: order._id,
          }
        }
      })
  }

  const handleClickEvent = (e) => {
    props.history.push(`/orders/details/${e.orderId}`)
  }

  return (
    <Card title="Calendario de Ordenes">
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        onDoubleClickEvent={e => handleClickEvent(e)}
        style={{ height: 500 }}
      />
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
  }
}

const mapDispatchToProps = {
  getAll,
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarOrders)