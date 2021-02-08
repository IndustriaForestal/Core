import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/es-mx'
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

  if (orders) {
    orders.map(order => {
      if (order.shipments && order.shipments.length > 0) {
        order.shipments.map(shipment => {
          if (shipment.completed !== 1) {
            if (shipment.ordersProduction) {
              eventList.push({
                title: `${shipment.pallets[0].model}: ${shipment.pallets[0].amount}`,
                start: moment(shipment.ordersProduction[0].date).toDate(),
                end: moment(shipment.ordersProduction[0].date).toDate(),
                orderId: `/orders/details/${shipment._id}`,
                eventColor: '#378006',
              })
            }
          }
        })
      }
    })

    /*  const shipmentsArray = orders.map(order =>
      order.shipments.map(shipment => shipment)
    )

    console.log(shipmentsArray)

    shipmentsArray.map(item =>
      item.map(shipment => {
        if (shipment.completed !== 1) {
          eventList.push({
            title: 'Prueba',
            start: moment(shipment.ordersProduction[0].date).toDate(),
            end: moment(shipment.ordersProduction[0].date).toDate(),
            orderId: shipment._id,
          })
        }
      })
    ) */
  }

  /* if (orders && orders.filter(order => order.completed !== 1).length > 0) {
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
  } */

  const handleClickEvent = e => {
    props.history.push(`${e.orderId}`)
  }

  return (
    <Card title="Calendario de Embarques">
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        onDoubleClickEvent={e => handleClickEvent(e)}
        style={{ height: 500 }}
        messages={{
          next: 'sig',
          previous: 'ant',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          showMore: function (e) {
            return '+' + e + ' más'
          },
        }}
        culture="es"
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
