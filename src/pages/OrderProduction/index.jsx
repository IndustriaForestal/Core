import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineEdit,
} from 'react-icons/ai'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  update,
} from '../../actions/app'
import { completeShipment, addReadyToOrder } from './actions'
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import Title from '../../components/Title/Title'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading/Loading'
import './styles.scss'

const OrderProduction = props => {
  const role = sessionStorage.getItem('role')
  const { orders, setTitle, processes } = props
  console.log(role)
  useEffect(() => {
    const topbar = {
      title: 'Ordenes de producción',
      menu: { 'Ordenes de producción': '/orderProduction' },
    }
    setTitle(topbar)
    props.getAll(`orders`, 'GET_ORDERS')
    props.getAll(`processes`, 'GET_PROCESSES')
    // eslint-disable-next-line
  }, [])

  const tableHeader = ['Proceso', 'Fecha', 'Estatus', 'Completado']
  const tableHeaderFast = ['Proceso', 'Dato']

  const handleCompleteShipment = shipmentId => {
    console.log(shipmentId)
    console.log(orders)
    const order = orders.filter(order =>
      order.shipments.find(shipment => shipment._id === shipmentId)
    )[0]

    order.shipments.map(shipment =>
         // eslint-disable-next-line
      shipment.pallets.map(pallet => {
        console.log(pallet.palletId, pallet.amount, order._id)
        props.addReadyToOrder(pallet.palletId, pallet.amount, order._id)
      })
    )
    props.completeShipment(shipmentId).then(() => {
      props.getAll(`orders`, 'GET_ORDERS')
    })
  }

  if (orders && processes) {
    const newOrders = orders.map(order => {
      if (order.shipments) {
        return order.shipments.filter(shipment => shipment.completed !== 1)[0]
      } else {
        return null
      }
    })

    console.log(
      orders
        .filter(
          order =>
            order.shipments &&
            order.shipments.length > 0 &&
            order.shipments.completed !== 1
        )
        .map(op => op.shipments.map(order => order))
    )

    if (role === 'Administrador' || role === 'Vista') {
      return (
        <Card title={`Ordenes de producción`}>
          {newOrders.length > 0
            ? orders
                .filter(
                  order =>
                    order.shipments &&
                    order.shipments.length > 0 &&
                    order.shipments.completed !== 1
                )
                .map(op =>
                     // eslint-disable-next-line
                  op.shipments.map(order => {
                    if (order) {
                      if (order.type !== 3) {
                        return (
                          <React.Fragment key={order._id}>
                            <Title>{`${op.pallets[0].orderNumber} - ${op.paperNumber}`}</Title>
                            {order.ordersProduction &&
                            order.ordersProduction.filter(
                              op => op.completed === 0
                            ).length === 0 &&
                            role === 'Administrador' ? (
                              <Button
                                onClick={() =>
                                  handleCompleteShipment(order._id)
                                }
                              >
                                Completar
                              </Button>
                            ) : null}
                            <Table head={tableHeader}>
                              {order.ordersProduction ? (
                                order.ordersProduction.map(
                                  (production, index) => {
                                    console.log(production.completed)
                                    if (production.type !== '3') {
                                      return (
                                        <tr key={index}>
                                          <td>
                                            {production.processName
                                              ? production.processName
                                              : production.name}
                                          </td>
                                          <td>
                                            {moment(production.date).format(
                                              'DD-MM-YYYY'
                                            )}
                                          </td>
                                          <td>
                                            {moment(production.date).isBefore(
                                              moment(),
                                              'day'
                                            )
                                              ? 'Vencido'
                                              : 'En tiempo'}
                                          </td>
                                          <td>
                                            {production.completed === 1 ? (
                                              <AiOutlineCheckCircle className="--success" />
                                            ) : (
                                              <AiOutlineClose className="--danger" />
                                            )}
                                          </td>
                                        </tr>
                                      )
                                    } else {
                                      return null
                                    }
                                  }
                                )
                              ) : (
                                <tr>
                                  <td>Error: La tarima esta incompleta </td>
                                  <td>Error: La tarima esta incompleta </td>
                                  <td>Error: La tarima esta incompleta </td>
                                  <td>Error: La tarima esta incompleta </td>
                                </tr>
                              )}
                            </Table>
                          </React.Fragment>
                        )
                      } else {
                        if (order.orderFast) {
                          return (
                            <React.Fragment key={order._id}>
                              <Title>{`Pedido #${order.orderNumber}`}</Title>
                              <Table head={tableHeaderFast}>
                                <tr>
                                  <td>Fecha de entrega</td>
                                  <td>
                                    {moment(
                                      order.orderFast.deliveryDate
                                    ).format('DD-MM-YYYY LT')}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Inicio viaje</td>
                                  <td>
                                    {moment(order.orderFast.travel).format(
                                      'DD-MM-YYYY LT'
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td> Inicio Limpieza</td>
                                  <td>
                                    {moment(order.orderFast.clean).format(
                                      'DD-MM-YYYY LT'
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td> Personal Limpieza</td>
                                  <td>{order.orderFast.peopleClean}</td>
                                </tr>
                                <tr>
                                  <td> Inicio estufado</td>
                                  <td>
                                    {moment(order.orderFast.bake).format(
                                      'DD-MM-YYYY LT'
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td> Tiempo estufado</td>
                                  <td>{order.orderFast.timeBake}</td>
                                </tr>
                              </Table>
                            </React.Fragment>
                          )
                        } else {
                          return null
                        }
                      }
                    }
                  })
                )
            : null}
        </Card>
      )
    } else {
      const process = processes.filter(process => process.name === role)
      const processId = process[0]._id
      console.log(processId)
      console.log(newOrders)
      return (
        <Card title={`Ordenes de producción`}>
          {newOrders.length > 0 && newOrders[0]
             // eslint-disable-next-line
            ? newOrders[0].map(orderCero => {
                const order = orderCero
                if (order) {
                  return (
                    <React.Fragment key={order._id}>
                      <Title>{`Pendientes`}</Title>
                      <Table head={tableHeader}>
                        {order.ordersProduction ? (
                          order.ordersProduction.map((production, index) => {
                            if (
                              production.processId === processId &&
                              production.completed !== 1
                            ) {
                              return (
                                <tr key={index}>
                                  <td>
                                    {production.processName
                                      ? production.processName
                                      : production.name}
                                  </td>
                                  <td>
                                    {moment(production.date).format(
                                      'DD-MM-YYYY'
                                    )}
                                  </td>
                                  <td>
                                    {moment(production.date).isBefore(
                                      moment(),
                                      'day'
                                    )
                                      ? 'Vencido'
                                      : 'En tiempo'}
                                  </td>
                                  <td>
                                    <Link
                                      to={`orderProduction/${order._id}/${index}?processId=${production.processId}`}
                                    >
                                      <Button className="btn --warning">
                                        <AiOutlineEdit />
                                      </Button>
                                    </Link>
                                  </td>
                                </tr>
                              )
                            } else {
                              return null
                            }
                          })
                        ) : (
                          <tr>
                            <td>Error </td>
                            <td>Error </td>
                            <td>Error </td>
                            <td>Error </td>
                          </tr>
                        )}
                      </Table>
                    </React.Fragment>
                  )
                }
                console.log(order, 'Filtrado')
              })
            : null}
        </Card>
      )
    }
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    processes: state.processes,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  get,
  create,
  update,
  completeShipment,
  addReadyToOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderProduction)
