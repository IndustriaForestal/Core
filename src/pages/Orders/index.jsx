import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineFileSearch, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import Loading from '../../components/Loading/Loading'
import './styles.scss'

const Orders = props => {
  const { orders, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Pedidos',
      menu: { Pedidos: '/orders' },
    }
    setTitle(topbar)
    props.getAll('orders', 'GET_ORDERS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = ['#', 'Cliente', 'Model', 'Acciones']

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

  if (orders) {
    return (
      <>
        <Table head={tableHeader}>
          {orders ? (
            orders.map(order => (
              <tr key={order._id}>
                <td>{order.orderNumber}</td>
                <td>{order.customer[0].name}</td>
                <td>{order.pallet[0].model}</td>
                <td>
                  <Link to={`orders/details/${order._id}`}>
                    <Button className="btn --info">
                      <AiOutlineFileSearch />
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
            ))
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
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
