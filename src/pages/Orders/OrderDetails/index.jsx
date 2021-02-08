import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineCheckCircle, AiOutlineClose } from 'react-icons/ai'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Swal from 'sweetalert2'
import { searchCapacities, completeOrder, updatePalletsStock } from '../actions'
import {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  update,
  setSocket,
} from '../../../actions/app'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import Title from '../../../components/Title/Title'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading/Loading'
import './styles.scss'

const OrderDetails = props => {
  const { orderDetails, setTitle, pallet, socket } = props
  const { id } = useParams()

  useEffect(() => {
    const topbar = {
      title: 'Pedidos',
      menu: { Pedidos: '/orders' },
    }
    setTitle(topbar)
    props.get(`orders/shipments/${id}`, 'GET_ORDER')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (orderDetails && orderDetails !== undefined) {
      props.get(`pallets/${orderDetails.pallets[0].palletId}`, 'GET_PALLET')
    }
    // eslint-disable-next-line
  }, [orderDetails])

  const tableHeader = ['Proceso', 'Fecha', 'Estatus']

  const handleComplete = id => {
    const capacity = pallet[0].capacityCharge.filter(
      cp => cp._id === orderDetails.platformId
    )

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then(result => {
      if (result.isConfirmed) {
        props
          .updatePalletsStock(capacity[0].capacity * -1, pallet[0]._id, 'dry')
          .then(() => props.completeOrder(id))
          .then(() =>
            Swal.fire('Completado!', 'Guardado con exito.', 'success')
          )
          .then(() => socket.emit('notification'))
          .then(() => props.history.push('/orders'))
      }
    })
  }

  if (orderDetails && pallet) {
    const shipment = orderDetails.shipments.filter(
      shipment => shipment._id === id
    )[0]
    console.log(shipment)
    if (shipment.type !== 3) {
      return (
        <Card
          title={`Pedido ${shipment.type === 1 ? 'Rapido' : ''} #${
            orderDetails.orderNumber
          }`}
        >
          <Title>{pallet[0].model}</Title>
          <Title className="title --small">{pallet[0].customerId.name}</Title>
          <Table head={tableHeader}>
            {shipment.ordersProduction ? (
              shipment.ordersProduction.map((order, index) => {
                console.log(order)
                return (
                  <tr key={index}>
                    <td>
                      {order.processName ? order.processName : order.name}
                    </td>
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
              })
            ) : (
              <tr>
                <td>Error: La tarima esta incompleta </td>
                <td>Error: La tarima esta incompleta </td>
                <td>Error: La tarima esta incompleta </td>
              </tr>
            )}
          </Table>
        </Card>
      )
    } else {
      if (shipment.orderFast) {
        return (
          <Card title={`Pedido Rapido #${shipment.orderNumber}`}>
            <Title>{pallet[0].model}</Title>
            <Title className="title --small">{pallet[0].customerId.name}</Title>
            <p>
              Fecha de entrega:
              {moment(shipment.orderFast.deliveryDate).format('L LT')}
            </p>
            <p>
              Inicio viaje:
              {moment(shipment.orderFast.travel).format('L LT')}
            </p>
            <p>
              Inicio Limpieza:
              {moment(shipment.orderFast.clean).format('L LT')}
            </p>
            <p>Personal Limpieza: {shipment.orderFast.peopleClean}</p>
            <p>
              Inicio estufado:
              {moment(shipment.orderFast.bake).format('L LT')}
            </p>
            <p>Tiempo estufado: {shipment.orderFast.timeBake}</p>
            <Button onClick={() => handleComplete(shipment._id)}>
              Completado
            </Button>
          </Card>
        )
      } else {
        return <h1>Error al crear el pedido rapido.</h1>
      }
    }
  } else {
    return (
      <h1>El pedido no existe</h1>
    )
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
    socket: state.stocket,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  get,
  searchCapacities,
  completeOrder,
  updatePalletsStock,
  create,
  update,
  setSocket,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
