import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineCheckCircle, AiOutlineClose } from 'react-icons/ai'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { searchCapacities } from '../actions'
import {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  update,
} from '../../../actions/app'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import Title from '../../../components/Title/Title'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading/Loading'
import './styles.scss'

const OrderDetails = props => {
  const { orderDetails, setTitle, pallet } = props
  const { id } = useParams()

  useEffect(() => {
    const topbar = {
      title: 'Pedidos',
      menu: { Pedidos: '/orders' },
    }
    setTitle(topbar)
    props.get(`orders/${id}`, 'GET_ORDER')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (orderDetails !== undefined) {
      props.get(`pallets/${orderDetails.palletId}`, 'GET_PALLET')
    }
    // eslint-disable-next-line
  }, [orderDetails])

  const tableHeader = ['Proceso', 'Fecha', 'Estatus']

  if (orderDetails && pallet) {
    if (orderDetails.orderType === 0) {
      return (
        <Card title={`Pedido #${orderDetails.orderNumber}`}>
          <Title>{pallet[0].model}</Title>
          <Title className="title --small">{pallet[0].customerId.name}</Title>
          <Table head={tableHeader}>
            {orderDetails.ordersProduction.map((order, index) => {
              console.log(order)
              return (
                <tr key={index}>
                  <td>{order.processName ? order.processName : order.name}</td>
                  <td>{moment(order.date).format('L')}</td>
                  <td>
                    {order.completed === 1 ? (
                      <AiOutlineCheckCircle className="--success" />
                    ) : (
                      <AiOutlineClose className="--danger" />
                    )}
                  </td>
                </tr>
              )
            })}
          </Table>
        </Card>
      )
    } else {
      return (
        <Card title={`Pedido Rapido #${orderDetails.orderNumber}`}>
          <Title>{pallet[0].model}</Title>
          <Title className="title --small">{pallet[0].customerId.name}</Title>
          <p>
            Fecha de entrega:{' '}
            {moment(orderDetails.orderFast.deliveryDate).format('L LT')}
          </p>
          <p>
            Inicio viaje: {moment(orderDetails.orderFast.travel).format('L LT')}
          </p>
          <p>
            Inicio Limpieza:{' '}
            {moment(orderDetails.orderFast.clean).format('L LT')}
          </p>
          <p>Personal Limpieza: {orderDetails.orderFast.peopleClean}</p>
          <p>
            Inicio estufado:{' '}
            {moment(orderDetails.orderFast.bake).format('L LT')}
          </p>
          <p>Tiempo estufado: {orderDetails.orderFast.timeBake}</p>
          <Button>Completado</Button>
        </Card>
      )
    }
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    orderDetails: state.orderDetails,
    quality: state.quality,
    pallet: state.pallet,
    capacities: state.capacities,
    material: state.material,
    raws: state.raws,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  get,
  searchCapacities,
  create,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
