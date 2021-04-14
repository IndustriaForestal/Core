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

import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import Loading from '../../components/Loading/Loading'

import MaterialTable from 'material-table'
import './styles.scss'

const Orders = props => {
  const { orders, setTitle, role } = props

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
