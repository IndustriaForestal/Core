import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { setTitle, getAll, deleted, get, create } from '../../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Loading from '../../../components/Loading/Loading'
import './styles.scss'

const CreateOrder = props => {
  const { register, handleSubmit, errors } = useForm()
  const [newPallet, setPallet] = useState({})
  const [fastOrder, setFastOrder] = useState(false)
  const { setTitle, customers, pallets, order, history } = props

  const typeOrder = useRef(null)

  const tableHeader = ['Nombre', '1 Verdes', '1 Secas', '2 Verdes', '2 Secas']

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
        props.create('orders', 'CREATE_ORDER', data)
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
  }

  const setPalletChange = e => {
    setPallet(pallets.filter(pallet => pallet._id === e.target.value))
  }

  const handlePlatform = (pallet, e) => {
    if (
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
    }
  }

  useEffect(() => {
    if (order) {
      if (typeOrder.current.options.selectedIndex === 0) {
        history.push(`/orders/create/${order}`)
      } else {
        history.push(`/orders/intern/${order}`)
      }
    }
  }, [order, history])

  if (customers) {
    return (
      <>
        <Card title="Crear Pedido">
          <form
            id="formNail"
            className="formNail"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <Input
              type="text"
              name="orderNumber"
              title="# Pedido"
              passRef={register({ required: true })}
              placeholder={errors.orderNumber && 'Campo requerido'}
            />

            {pallets ? (
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Tarimas:</span>
                  <select
                    name="palletId"
                    onChange={setPalletChange}
                    ref={register({ required: true })}
                  >
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
              passRef={register({ required: true })}
              placeholder={errors.orderNumber && 'Campo requerido'}
            />
            {newPallet && newPallet.length > 0 ? (
              <>
                <div className="inputGroup">
                  {console.log(newPallet)}
                  <label htmlFor="processId">
                    <span>Plataforma:</span>
                    <select
                      name="platformId"
                      onChange={e => handlePlatform(newPallet, e)}
                      ref={register({ required: true })}
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

                <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>Tipo de Pedido:</span>
                    <select name="typeOrder" ref={typeOrder}>
                      <option value="0">Producción</option>
                      <option value="1">Pedido Rapido</option>
                    </select>
                  </label>
                </div>
                {/*  
               Cambio de pedido rapido condicionado, a libre
               <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>Tipo de Pedido:</span>
                    <select name="typeOrder" ref={typeOrder}>
                      <option value="0">Producción</option>
                      {fastOrder ? (
                        <option value="1">Pedido Rapido</option>
                      ) : null}
                    </select>
                  </label>
                </div> */}
              </>
            ) : null}
            <div className="formNail__buttons">
              <Button type="submit" className="btn --success">
                Crear
              </Button>
              <Link to="/nails">
                <Button className="btn --danger">Cancelar</Button>
              </Link>
            </div>
          </form>
        </Card>
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
