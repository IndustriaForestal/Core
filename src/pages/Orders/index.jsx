import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
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
import SearchBar from '../../components/SearchBar/SearchBar'
import MaterialTable from 'material-table'
import './styles.scss'

const Orders = props => {
  const { orders, setTitle, pallets, socket, role } = props

  useEffect(() => {
    const topbar = {
      title: 'Pedidos de Clientes',
      menu: { 'Pedidos de Clientes': '/orders' },
    }
    setTitle(topbar)
    props.getAll('orders', 'GET_ORDERS')
    props.getAll('pallets', 'GET_PALLETS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = [
    '#',
    'Cliente',
    'Fecha Recepción',
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

  function compare(a, b) {
    const orderA = a.startDate
    const orderB = b.startDate

    let comparison = 0
    if (orderA > orderB) {
      comparison = -1
    } else if (orderA < orderB) {
      comparison = 1
    }
    return comparison
  }

  const setFilter = e => {
    const filter = orders.map(order => {
      order.pallets.map(pallet => {
        // console.log(pallet.orderNumber)
        if (pallet.orderNumber.toLowerCase().includes(e)) {
          console.log('Chi')
          return order
        }
      })
    })
    console.log(e)
    console.log(filter)
  }

  if (orders) {
    return (
      <>
        {/* <SearchBar onChange={e => setFilter(e.target.value)} /> */}
        <MaterialTable
          columns={[
            { title: 'Planta', field: 'sucursal' },
            { title: 'Usuario', field: 'paperNumber' },
            { title: 'Cliente', field: 'customerId.name' },
            { title: '# Pedido', field: 'pallets[0].orderNumber' },
            {
              title: 'Fecha Entrega',
              field: 'date',
              render: rowData => moment(rowData.date).format('DD/MM/YYYY'),
            },
            {
              title: 'Acciones',
              render: rowData => {
                if (role === 'Administrador') {
                  return (
                    <>
                      <Link to={`orders/update/${rowData._id}`}>
                        <Button className="btn --warning">
                          <AiOutlineEdit />
                        </Button>
                      </Link>
                      <Link to={`orders/main/${rowData._id}`}>
                        <Button className="btn --success">
                          <BsPlus />
                        </Button>
                      </Link>
                      <Link to={`orders/shipments/${rowData._id}`}>
                        <Button className="btn --info">
                          <BsFileEarmarkPlus />
                        </Button>
                      </Link>
                      <Button
                        className="btn --danger"
                        onClick={() => handleDeleteNail(rowData._id)}
                      >
                        <AiOutlineDelete />
                      </Button>
                    </>
                  )
                } else {
                  return (
                    <>
                      <Link to={`orders/shipments/${rowData._id}`}>
                        <Button className="btn --info">
                          <BsFileEarmarkPlus />
                        </Button>
                      </Link>
                    </>
                  )
                }
              },
            },
          ]}
          detailPanel={rowData => {
            return (
              <table
                style={{
                  width: '100%',
                  padding: '15px',
                  textAlign: 'center',
                }}
              >
                <thead>
                  <tr>
                    <th>#Orden</th>
                    <th>Modelo</th>
                    <th>Cantidad</th>
                    <th>Fecha Entrega</th>
                  </tr>
                </thead>
                <tbody>
                  {rowData.pallets.map((pallet, index) => {
                    if (pallet.ready) {
                      return (
                        <tr key={index}>
                          <td>{pallet.orderNumber}</td>
                          <td>{pallet.model}</td>
                          <td>{pallet.amount - pallet.ready}</td>
                          <td>
                            {moment(pallet.orderDateDelivery).format(
                              'DD/MM/YYYY'
                            )}
                          </td>
                        </tr>
                      )
                    } else {
                      return (
                        <tr key={index}>
                          <td>{pallet.orderNumber}</td>
                          <td>{pallet.model}</td>
                          <td>{pallet.amount}</td>
                          <td>
                            {moment(pallet.orderDateDelivery).format(
                              'DD/MM/YYYY'
                            )}
                          </td>
                        </tr>
                      )
                    }
                  })}
                </tbody>
              </table>
            )
          }}
          localization={{
            pagination: {
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'Filas',
              firstAriaLabel: 'Primera',
              firstTooltip: 'Primera',
              previousAriaLabel: 'Anterior',
              previousTooltip: 'Anterior',
              nextAriaLabel: 'Siguiente',
              nextTooltip: 'Siguiente',
              lastAriaLabel: 'Ultimo',
              lastTooltip: 'Ultimo',
            },
            toolbar: {
              searchTooltip: 'Buscar',
              searchPlaceholder: 'Buscar',
            },
          }}
          data={orders}
          title="Pedidos"
        />
        {/* <Table head={tableHeader}>
          {orders ? (
            orders.sort(compare).map(order => {
              if (!order.completed) {
                return (
                  <tr key={order._id}>
                    <td>{order.paperNumber}</td>
                    <td>{order.customerId.name}</td>
                    <td>{moment(order.startDate).format('DD/MM/YYYY')}</td>
                    <td>{moment(order.date).format('DD/MM/YYYY')}</td>
                    <td>
                      <ul>
                        {order.pallets.map((pallet, index) => {
                          if (pallet.ready) {
                            return (
                              <li key={index}>
                                {pallet.orderNumber} -- {pallet.model}:{' '}
                                {pallet.amount - pallet.ready}
                              </li>
                            )
                          } else {
                            return (
                              <li key={index}>
                                {pallet.orderNumber} -- {pallet.model}:{' '}
                                {pallet.amount} --{' '}
                                {moment(pallet.orderDateDelivery).format(
                                  'DD/MM/YYYY'
                                )}
                              </li>
                            )
                          }
                        })}
                      </ul>
                    </td>
                    <td>
                      {role === 'Administrador' ? (
                        <>
                          <Link to={`orders/update/${order._id}`}>
                            <Button className="btn --warning">
                              <AiOutlineEdit />
                            </Button>
                          </Link>
                          <Link to={`orders/main/${order._id}`}>
                            <Button className="btn --success">
                              <BsPlus />
                            </Button>
                          </Link>
                        </>
                      ) : null}
                      <Link to={`orders/shipments/${order._id}`}>
                        <Button className="btn --info">
                          <BsFileEarmarkPlus />
                        </Button>
                      </Link>
                      {role === 'Administrador' ? (
                        <Button
                          className="btn --danger"
                          onClick={() => handleDeleteNail(order._id)}
                        >
                          <AiOutlineDelete />
                        </Button>
                      ) : null}
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
        </Table> */}
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
    role: state.role,
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
