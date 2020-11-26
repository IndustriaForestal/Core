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
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import Title from '../../components/Title/Title'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading/Loading'
import './styles.scss'

const OrderProduction = props => {
  const role = Cookies.get('role')
  console.log(role)
  const { orders, setTitle, processes } = props

  useEffect(() => {
    const topbar = {
      title: 'Orden de producción',
      menu: { 'Orden de producción': '/orderProduction' },
    }
    setTitle(topbar)
    props.getAll(`orders`, 'GET_ORDERS')
    props.getAll(`processes`, 'GET_PROCESSES')
    // eslint-disable-next-line
  }, [])

  const tableHeader = ['Proceso', 'Fecha', 'Estatus', 'Completado']
  const tableHeaderFast = ['Proceso', 'Dato']

  if (orders && processes) {
    if (role === 'Administrador') {
      return (
        <Card title={`Ordenes de producción`}>
          {orders.map(order => {
            if (order.orderType === 0) {
              /*  const aserrio = order.ordersProduction.filter(
                op => op.processId === '5f99cbda74cd296d5bb5b744'
              )
              const startAserrio = moment(aserrio[0].date).format('DD-MM-YYYY')
              const endAserrio = moment(
                aserrio[aserrio.length - 1].date
              ).format('DD-MM-YYYY')
 */
              return (
                <React.Fragment key={order._id}>
                  <Title>{`Pedido #${order.orderNumber}`}</Title>
                  <Table head={tableHeader}>
                    {order.ordersProduction ? (
                      order.ordersProduction.map((production, index) => {
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
                                {moment(production.date).format('DD-MM-YYYY')}
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
                      })
                    ) : (
                      <tr>
                        <td>Error: La tarima esta incompleta </td>
                        <td>Error: La tarima esta incompleta </td>
                        <td>Error: La tarima esta incompleta </td>
                        <td>Error: La tarima esta incompleta </td>
                      </tr>
                    )}
                    {/*    {order.itemsList
                      ? order.itemsList.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.itemName}</td>
                              <td>{`${startAserrio} - ${endAserrio}`}</td>
                              <td>
                                {moment(aserrio[0].date).isBefore(
                                  moment(),
                                  'day'
                                )
                                  ? 'Vencido'
                                  : 'En tiempo'}
                              </td>
                              <td>
                                {item.completed === 1 ? (
                                  <AiOutlineCheckCircle className="--success" />
                                ) : (
                                  <AiOutlineClose className="--danger" />
                                )}
                              </td>
                            </tr>
                          )
                        })
                      : null} */}
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
                          {moment(order.orderFast.deliveryDate).format(
                            'DD-MM-YYYY LT'
                          )}
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
                          {moment(order.orderFast.bake).format('DD-MM-YYYY LT')}
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
          })}
        </Card>
      )
    } else {
      const processId = processes.filter(process => process.name === role)
      return (
        <Card title={`Ordenes de producción`}>
          {orders.map(order => {
            if (order.orderType === 0) {
              const aserrio = order.ordersProduction.filter(
                op => op.processId === '5f99cbda74cd296d5bb5b744'
              )
              const startAserrio = moment(aserrio[0].date).format('DD-MM-YYYY')
              const endAserrio = moment(
                aserrio[aserrio.length - 1].date
              ).format('DD-MM-YYYY')
              const counter = order.ordersProduction.filter(
                op =>
                  op.processId === '5f99cbda74cd296d5bb5b744' &&
                  op.completed === 0
              ).length
              return (
                <React.Fragment key={order._id}>
                  <Title>{`Pedido #${order.orderNumber}`}</Title>
                  <Table head={tableHeader}>
                    {order.ordersProduction ? (
                      order.ordersProduction.map((production, index) => {
                        if (
                          production.processId === processId[0]._id &&
                          production.completed === 0 &&
                          production.processId !== '5f99cbda74cd296d5bb5b744'
                        )
                          return (
                            <tr key={index}>
                              <td>
                                {production.processName
                                  ? production.processName
                                  : production.name}
                              </td>
                              <td>
                                {moment(production.date).format('DD-MM-YYYY')}
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
                                  to={`orderProduction/${order._id}/${index}`}
                                >
                                  <Button className="btn --warning">
                                    <AiOutlineEdit />
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          )
                      })
                    ) : (
                      <tr>
                        <td>Error </td>
                        <td>Error </td>
                        <td>Error </td>
                        <td>Error </td>
                      </tr>
                    )}
                    {order.itemsList && role === 'Aserrio' && counter > 0 ? (
                      <tr>
                        <td>Aserrio</td>
                        <td>{`${startAserrio} - ${endAserrio}`}</td>
                        <td>
                          {moment(aserrio[0].date).isBefore(moment(), 'day')
                            ? 'Vencido'
                            : 'En tiempo'}
                        </td>
                        <td>
                          <Link
                            to={`orderProduction/${order._id}/0?itemsList=true`}
                          >
                            <Button className="btn --warning">
                              <AiOutlineEdit />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ) : null}
                  </Table>
                </React.Fragment>
              )
            }
          })}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderProduction)
