import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import {
  updatePalletsStock,
  completeOrder,
  updateAmountPalletOrder,
  updateDatePalletOrder,
} from '../actions'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted, get } from '../../../actions/app'
import Input from '../../../components/Input/Input'
import Swal from 'sweetalert2'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import AddButton from '../../../components/AddButton/AddButton'
import Loading from '../../../components/Loading/Loading'

const OrderShipments = props => {
  const { orderDetails, setTitle, pallets, socket } = props
  const [startDateOrder, setStartDateOrder] = useState(new Date())
  console.log(startDateOrder)
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

  const tableHeader = ['Modelo', 'Cantidad', 'Fecha Entrega']

  const handleSaveAmount = (e, index) => {
    console.log(e.key)
    if (e.key === 'Enter') {
      console.log(e.target.value, index)
      const amount = e.target.value
      props
        .updateAmountPalletOrder(id, { index, amount })
        .then(() => props.get(`orders/${id}`, 'GET_ORDER'))
        .then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          })
          Toast.fire({
            icon: 'success',
            title: 'Se guardo correctamente',
          })
        })
    }
  }

  const handleSaveDate = (date, index) => {
    console.log(date, index)
    props
      .updateDatePalletOrder(id, { index, date })
      .then(() => props.get(`orders/${id}`, 'GET_ORDER'))
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
        })
        Toast.fire({
          icon: 'success',
          title: 'Se guardo correctamente',
        })
      })
  }

  if (orderDetails) {
    return (
      <>
        <h1>{orderDetails.paperNumber}</h1>
        <h1>{orderDetails.orderNumber}</h1>
        <h1>{orderDetails.customerId.name}</h1>
        <Table head={tableHeader}>
          {orderDetails.pallets.map((pallet, index) => {
            console.log(pallet, index)
            return (
              <tr key={index}>
                <td>{pallet.model}</td>
                <td>
                  <Input
                    value={pallet.amount}
                    onKeyPress={e => {
                      handleSaveAmount(e, index)
                    }}
                  />
                </td>
                <td>
                  <DatePicker
                    selected={
                      pallet.orderDateDelivery
                        ? new Date(pallet.orderDateDelivery)
                        : new Date()
                    }
                    name="dateStart"
                    onChange={date => handleSaveDate(date, index)}
                    className="datePicker_css"
                  />
                </td>
              </tr>
            )
          })}
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
  updateAmountPalletOrder,
  updateDatePalletOrder,
  completeOrder,
  getAll,
  get,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderShipments)
