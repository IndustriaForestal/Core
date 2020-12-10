import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsFileEarmarkPlus } from 'react-icons/bs'
import moment from 'moment'
import { updatePalletsStock, completeOrder } from './actions'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import Loading from '../../components/Loading/Loading'
import './styles.scss'

const Orders = props => {
  const { orders, setTitle, pallets, socket } = props

  useEffect(() => {
    const topbar = {
      title: 'Pedidos',
      menu: { Pedidos: '/orders' },
    }
    setTitle(topbar)
    props.getAll('orders', 'GET_ORDERS')
    props.getAll('pallets', 'GET_PALLETS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = [
    '#',
    'Cliente',
    'Fecha Entrega',
    'Modelo - Cantidad',
    'Acciones',
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

  const handleCompleteOrder = orderId => {
    const order = orders.filter(order => order._id === orderId)
    const pallet = pallets.filter(pallet => order[0].palletId === pallet._id)

    const capacity = pallet[0].capacityCharge.filter(
      cp => cp._id === order[0].platformId
    )

    props
      .updatePalletsStock(capacity[0].capacity * -1, pallet[0]._id, 'dry')
      .then(() => {
        props.completeOrder(orderId)
      })
      .then(() => {
        socket.emit('notification')
      })
  }

  if (orders) {
    return (
      <>
        <Table head={tableHeader}>
          {orders ? (
            orders.map(order => {
              console.log(order)
              if (!order.completed) {
                return (
                  <tr key={order._id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.customerId.name}</td>
                    <td>{moment(order.date).format('DD/MM/YYYY')}</td>
                    <td>
                      <ul>
                        {order.pallets.map(pallet => {
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
                    <td>
                      <Link to={`orders/main/${order._id}`}>
                        <Button className="btn --success">
                          <BsPlus />
                        </Button>
                      </Link>
                      <Link to={`orders/shipments/${order._id}`}>
                        <Button className="btn --info">
                          <BsFileEarmarkPlus />
                        </Button>
                      </Link>
                      <Button
                        className="btn --danger"
                        onClick={() => handleDeleteNail(order._id)}
                      >
                        <AiOutlineDelete />
                      </Button>
                    </td>
                  </tr>
                )
              }
            })
          ) : (
            <tr>
              <td colSpan="7">No hay registros</td>
            </tr>
          )}
        </Table>
        <Link to="/orders/create">
          <AddButton>
            <BsPlus />
          </AddButton>
        </Link>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    pallets: state.pallets,
    socket: state.socket,
  }
}

const mapDispatchToProps = {
  setTitle,
  updatePalletsStock,
  completeOrder,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
