import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineDelete } from 'react-icons/ai'
import moment from 'moment'
import { updatePalletsStock, completeOrder } from '../actions'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted, get } from '../../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import AddButton from '../../../components/AddButton/AddButton'
import Loading from '../../../components/Loading/Loading'

const OrderShipments = props => {
  const { orderDetails, setTitle, pallets, socket } = props
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

  const tableHeader = [
    '#',
    'Cliente',
    'Fecha Entrega',
    'Modelo - Cantidad',
    'Modelo - Cantidad Listas',
    'Modelo - Cantidad Restantes',
  ]

  const tableHeader2 = [
    'Humedad',
    'Fecha Entrega',
    'Tipo',
    'Modelo - Cantidad',
    'Estado',
    'Detalles',
  ]

  const handleDeleteNail = orderId => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
    }).then(result => {
      if (result.isConfirmed) {
        props.deleted(`orders/${orderId}`, 'DELETE_ORDER')
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  // const handleCompleteOrder = orderId => {
  //   const order = orders.filter(order => orderDetails._id === orderId)
  //   const pallet = pallets.filter(pallet => order[0].palletId === pallet._id)

  //   const capacity = pallet[0].capacityCharge.filter(
  //     cp => cp._id === order[0].platformId
  //   )

  //   props
  //     .updatePalletsStock(capacity[0].capacity * -1, pallet[0]._id, 'dry')
  //     .then(() => {
  //       props.completeOrder(orderId)
  //     })
  //     .then(() => {
  //       socket.emit('notification')
  //     })
  // }

  if (orderDetails) {
    return (
      <>
        <Table head={tableHeader}>
          <tr key={orderDetails._id}>
            <td>{orderDetails.orderNumber}</td>
            <td>{orderDetails.customerId.name}</td>
            <td>{moment(orderDetails.date).format('DD/MM/YYYY')}</td>
            <td>
              <ul>
                {orderDetails.pallets.map(pallet => {
                  return (
                    <li key={pallet.palletId}>
                      {pallet.model}: {pallet.amount}
                    </li>
                  )
                })}
              </ul>
            </td>
            <td>
              <ul>
                {orderDetails.pallets.map(pallet => {
                  if (pallet.ready) {
                    return (
                      <li key={pallet.palletId}>
                        {pallet.model}: {pallet.ready}
                      </li>
                    )
                  } else {
                    return <li key={pallet.palletId}>{pallet.model}: 0</li>
                  }
                })}
              </ul>
            </td>
            <td>
              <ul>
                {orderDetails.pallets.map(pallet => {
                  if (pallet.ready) {
                    return (
                      <li key={pallet.palletId}>
                        {pallet.model}: {pallet.amount - pallet.ready}
                      </li>
                    )
                  } else {
                    return (
                      <li key={pallet.palletId}>
                        {pallet.model}: {pallet.amount}
                      </li>
                    )
                  }
                })}
              </ul>
            </td>
          </tr>
        </Table>
        <Table head={tableHeader2}>
          {orderDetails.shipments && orderDetails.shipments.length > 0
            ? orderDetails.shipments.map(shipment => {
                console.log(shipment)
                return (
                  <tr key={shipment._id}>
                    <td>% {shipment.humedity}</td>
                    <td>
                      {moment(shipment.ordersProduction[0].date).format(
                        'DD-MM-YYYY'
                      )}
                    </td>
                    <td>
                      {shipment.type === 0 ? 'Producción' : 'Pedido Rapido'}
                    </td>
                    <td>
                      <ul>
                        {shipment.pallets.map(pallet => {
                          return (
                            <li key={pallet.palletId}>
                              {pallet.model}: {pallet.amount}
                            </li>
                          )
                        })}
                      </ul>
                    </td>
                    <td>
                      {shipment.completed && shipment.completed === 1
                        ? 'Completado'
                        : 'Pendiente'}
                    </td>
                    <td>
                      <Link to={`../details/${shipment._id}`}>
                        <Button className="btn --info">
                          <BsPlus />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                )
              })
            : null}
        </Table>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    orderDetails: state.orderDetails,
    pallets: state.pallets,
    socket: state.socket,
  }
}

const mapDispatchToProps = {
  setTitle,
  updatePalletsStock,
  completeOrder,
  getAll,
  get,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderShipments)
