import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineDelete } from 'react-icons/ai'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { setTitle, getAll, deleted, get, create } from '../../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Loading from '../../../components/Loading/Loading'
import './styles.scss'

const CreateOrder = props => {
  const [newPallet, setPallet] = useState({})
  const [startDate, setStartDate] = useState(new Date())
  const [startDateOrder, setStartDateOrder] = useState(new Date())
  const [orderNumber, setOrderNumber] = useState()
  const [paperNumber, setPaperNumber] = useState()
  const [customerId, setCostumerId] = useState(0)
  const [amount, setAmount] = useState(0)
  const [palletsArray, setPalletArray] = useState([])
  const { setTitle, customers, pallets } = props

  const tableHeader = ['# OC','Nombre', 'Cantidad', 'Acciones']

  const handleSaveOrder = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
    }).then(result => {
      if (result.isConfirmed) {
        const order = {
          date: moment(startDate).format('YYYY-MM-DDT06:00:00') + 'Z',
          startDate: moment(startDateOrder).format('YYYY-MM-DDT06:00:00') + 'Z',
          paperNumber,
          customerId,
          pallets: palletsArray,
        }
        console.log(order)
        props.create('orders', 'CREATE_ORDER', order).then(() => {
          props.history.push('/orders')
        })
      }
    })
  }

  useEffect(() => {
    const topbar = {
      title: 'Crear Pedido',
      menu: { Pedidos: '/orders' },
    }
    setTitle(topbar)
    props.getAll('customers', 'GET_CUSTOMERS')
    // eslint-disable-next-line
  }, [])

  const setPallets = e => {
    props.getAll(`pallets/customer/${e.target.value}`, 'GET_PALLETS')
    setCostumerId(e.target.value)
  }

  const setPalletChange = e => {
    setPallet(pallets.filter(pallet => pallet._id === e.target.value))
  }

  const handleAddPallet = () => {
    const pallet = newPallet[0]

    setPalletArray([
      ...palletsArray,
      {
        palletId: pallet._id,
        qualityId: pallet.quality._id,
        model: pallet.model,
        amount: parseInt(amount),
        orderNumber,
      },
    ])
  }

  const handleRemovePallet = palletId => {
    const newArray = palletsArray.filter(pallet => pallet.palletId !== palletId)
    setPalletArray(newArray)
  }

  if (customers) {
    return (
      <>
        <Card title="Datos Pedido">
          <div>
            <p>Recepción del pedido</p>
            <DatePicker
              selected={startDateOrder}
              name="dateStart"
              onChange={date => setStartDateOrder(date)}
              className="datePicker_css"
            />
          </div>
          <div>
            <p>Entrega del pedido</p>
            <DatePicker
              selected={startDate}
              name="date"
              onChange={date => setStartDate(date)}
              className="datePicker_css"
            />
          </div>
          <Input
            type="text"
            name="paperNumber"
            title="# Papeleta"
            onInput={e => setPaperNumber(e.target.value)}
          />
          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Cliente:</span>
              <select name="customerId" onChange={setPallets}>
                <option value="0">Seleccionar...</option>
                {customers.map(customer => {
                  return (
                    <option key={customer._id} value={customer._id}>
                      {customer.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
        </Card>
        <Card title="Crear Pedido">
          <Input
            type="text"
            name="orderNumber"
            title="# Pedido"
            onInput={e => setOrderNumber(e.target.value)}
          />
          {pallets ? (
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>Tarimas:</span>
                <select name="palletId" onChange={setPalletChange}>
                  <option value="0">Seleccionar...</option>
                  {pallets.map(pallet => {
                    return (
                      <option key={pallet._id} value={pallet._id}>
                        {pallet.model} - {pallet.qualityId[0]}
                      </option>
                    )
                  })}
                </select>
              </label>
            </div>
          ) : null}

          <Input
            type="number"
            name="amount"
            title="Cantidad"
            onInput={e => setAmount(e.target.value)}
          />
          <div className="formNail__buttons">
            <Button
              type="button"
              className="btn --success"
              onClick={handleAddPallet}
            >
              Agregar
            </Button>
            <Link to="/nails">
              <Button className="btn --danger">Cancelar</Button>
            </Link>
          </div>
        </Card>

        <Table head={tableHeader}>
          {palletsArray.map(pallet => (
            <tr key={pallet.palletId}>
              <td>{pallet.orderNumber}</td>
              <td>{pallet.model}</td>
              <td>{pallet.amount}</td>
              <td>
                <Button
                  className="btn --danger"
                  onClick={() => handleRemovePallet(pallet.palletId)}
                >
                  <AiOutlineDelete />
                </Button>
              </td>
            </tr>
          ))}
        </Table>
        {palletsArray.length > 0 ? (
          <Button onClick={handleSaveOrder}>Crear</Button>
        ) : null}
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers,
    pallets: state.pallets,
    order: state.order,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  get,
  deleted,
  create,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
