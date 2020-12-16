import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'
import { connect } from 'react-redux'
import {
  setTitle,
  getAll,
  deleted,
  get,
  create,
  update,
} from '../../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Loading from '../../../components/Loading/Loading'

const CreateOrder = props => {
  const [newPallet, setPallet] = useState({})
  const [fastOrder, setFastOrder] = useState(false)
  const [palletsArray, setPalletsArray] = useState([])
  const [humedity, setHumedity] = useState(0)
  const [amount, setAmount] = useState(0)
  const [capacity, setCapacity] = useState(0)
  const [platformId, setPlatformId] = useState()
  const { setTitle, pallets, order, history, orderDetails } = props
  const { id } = useParams()
  const typeOrder = useRef(null)

  const tableHeader = ['Nombre', '1 Verdes', '1 Secas', '2 Verdes', '2 Secas']
  const tableHeader2 = ['Nombre', 'OC', 'Cantidad']
  const tableHeader3 = ['Nombre', 'Cantidad', 'Accion']

  const onSubmit = data => {
    data.orderType = typeOrder.current.options.selectedIndex

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
      }
    })
  }

  useEffect(() => {
    const topbar = {
      title: 'Crear Pedido',
      menu: { Pedidos: '/orders' },
    }
    setTitle(topbar)
    props.get(`orders/${id}`, 'GET_ORDER')
    props.getAll(`pallets`, 'GET_PALLETS')
    // eslint-disable-next-line
  }, [])

  const setPalletChange = e => {
    setPallet(pallets.filter(pallet => pallet._id === e.target.value))
  }

  const handlePlatform = (pallet, e) => {
    /*  if (
      e.target.options[e.target.selectedIndex].dataset.algo <=
        pallet[0].stock[0].green ||
      e.target.options[e.target.selectedIndex].dataset.algo <=
        pallet[0].stock[1].green ||
      e.target.options[e.target.selectedIndex].dataset.algo <=
        pallet[0].stock[0].dry ||
      e.target.options[e.target.selectedIndex].dataset.algo <=
        pallet[0].stock[1].dry
    ) {
      setFastOrder(true)
    } else {
      setFastOrder(false)
    } */
    setPlatformId(e.target.value)
    setCapacity(parseInt(e.target.options[e.target.selectedIndex].dataset.algo))
  }

  useEffect(() => {
    if (palletsArray && palletsArray.length > 0) {
      palletsArray.map(pallet => {
        if (
          pallet.amount <= pallet.stock[0].green ||
          pallet.amount <= pallet.stock[1].green ||
          pallet.amount <= pallet.stock[0].dry ||
          pallet.amount <= pallet.stock[1].dry
        ) {
          return setFastOrder(true)
        } else {
          return setFastOrder(false)
        }
      })
    }
  }, [palletsArray])

 /*  useEffect(() => {
    if (order) {
      if (typeOrder.current.options.selectedIndex === 0) {
        history.push(`/orders/create/${order}`)
      } else {
        history.push(`/orders/intern/${order}`)
      }
    }
  }, [order, history]) */

  const handleAddPalletToArray = () => {
    let finalAmount = 0
    if (amount === 0) {
      finalAmount = parseInt(capacity)
    } else {
      finalAmount = parseInt(amount)
    }
    setPalletsArray([
      ...palletsArray,
      {
        ...newPallet[0],
        amount: finalAmount,
        palletId: newPallet[0]._id,
      },
    ])
  }
  const handleRemovePallet = palletId => {
    const newArray = palletsArray.filter(pallet => pallet.palletId !== palletId)
    setPalletsArray(newArray)
  }

  const handleCreateOrderProduction = () => {
    const orderShipment = {
      pallets: palletsArray,
      platformId,
      humedity,
      type: typeOrder.current.options.selectedIndex,
      procesed: 0,
    }

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
        props
          .update(
            `orders/newShipment/${id}`,
            'CREATE_ORDERs_SHIPMENT',
            orderShipment
          )
          .then(() => {
            if (typeOrder.current.options.selectedIndex === 0) {
              history.push(`/orders/create/${id}`)
            } else {
              history.push(`/orders/intern/${id}`)
            }
          })
      }
    })

    console.log(orderShipment)
  }

  console.log(palletsArray)

  if (orderDetails) {
    return (
      <>
        <Table head={tableHeader2}>
          {orderDetails.pallets.map(pallet => (
            <tr key={pallet.palletId}>
              <td>{pallet.model}</td>
              <td>{pallet.orderNumber}</td>
              <td>{pallet.ready ? pallet.amount - pallet.ready : pallet.amount}</td>
            </tr>
          ))}
        </Table>
        {newPallet && newPallet.length > 0 ? (
          <Table head={tableHeader}>
            {newPallet.map(pallet => (
              <tr key={pallet._id}>
                <td>{pallet.model}</td>
                <td>{pallet.stock[0].green}</td>
                <td>{pallet.stock[0].dry}</td>
                <td>{pallet.stock[1].green}</td>
                <td>{pallet.stock[1].dry}</td>
              </tr>
            ))}
          </Table>
        ) : null}
        <Card title="Seleccionar Tarimas">
          {/*   <DatePicker
              selected={startDate}
              name="date"
              onChange={date => setStartDate(date)}
              ref={register({ required: true })}
            /> */}

          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Tarimas:</span>
              <select name="palletId" onChange={setPalletChange}>
                <option value="0">Seleccionar...</option>
                {orderDetails.pallets.map(pallet => {
                  return (
                    <option key={pallet.palletId} value={pallet.palletId}>
                      {pallet.model}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>

          {newPallet && newPallet.length > 0 ? (
            <>
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Plataforma:</span>
                  <select
                    name="platformId"
                    onChange={e => handlePlatform(newPallet, e)}
                  >
                    <option value="0">Seleccionar...</option>
                    {newPallet.map(pallet =>
                      pallet.capacityCharge.map(capacityCharge => (
                        <option
                          key={capacityCharge._id}
                          value={capacityCharge._id}
                          data-algo={capacityCharge.capacity}
                        >{`${capacityCharge.name[0]}: ${capacityCharge.capacity}`}</option>
                      ))
                    )}
                  </select>
                </label>
              </div>
            </>
          ) : null}
          <Input
            type="number"
            name="amount"
            onInput={e => setAmount(e.target.value)}
            placeholder={capacity}
            title="Cantidad"
          />
          <div className="formNail__buttons">
            <Button
              type="button"
              className="btn --success"
              onClick={handleAddPalletToArray}
            >
              Agregar
            </Button>
          </div>
        </Card>

        <Table head={tableHeader3}>
          {palletsArray.map(pallet => (
            <tr key={pallet.palletId}>
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
        <Card title="Crear Orden Producción">
          <Input
            type="number"
            name="humedity"
            title="Humedad Madera"
            onInput={e => {
              setHumedity(e.target.value)
            }}
          />
          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Tipo de Pedido:</span>
              <select name="typeOrder" ref={typeOrder}>
                <option value="0">Producción</option>
                {fastOrder ? <option value="1">Pedido Rapido</option> : null}
              </select>
            </label>
          </div>
          <Button
            type="button"
            className="btn --success"
            onClick={handleCreateOrderProduction}
          >
            Crear
          </Button>
        </Card>
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
    orderDetails: state.orderDetails,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
