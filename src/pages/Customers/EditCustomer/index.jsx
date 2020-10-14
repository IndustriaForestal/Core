import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get, update } from '../../../actions/app'
import Swal from 'sweetalert2'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const EditCustomers = props => {
  const [form, setValues] = useState()
  const { id } = useParams()
  const endPoint = `customers/${id}`
  const typeAction = 'GET_CUSTOMER'
  useEffect(() => {
    props.get(endPoint, typeAction)
    // eslint-disable-next-line
  }, [])
  const { customer } = props
  const handlerInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    })
  }
  const handlerSubmit = event => {
    event.preventDefault()
    if (form) {
      props.update(endPoint, 'UPDATE_CUSTOMER', form)
      window.location.href = '/customers'
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      })

      Toast.fire({
        icon: 'info',
        title: 'El formulario esta vacio',
      })
    }
    document.getElementById('formCustomer').reset()
  }
  if (customer) {
    return (
      <Card title="Editar Cliente" className="card -warning">
        <form
          id="formCustomer"
          className="formCustomer"
          onSubmit={handlerSubmit}
        >
          <Input
            onChange={handlerInput}
            type="text"
            name="name"
            title="Nombre"
            placeholder={customer.name}
          />
          <Input
            onChange={handlerInput}
            type="text"
            name="address"
            title="Dirección"
            placeholder={customer.address}
          />
          <Input
            onChange={handlerInput}
            type="email"
            name="email"
            title="Email"
            placeholder={customer.email}
          />
          <Input
            onChange={handlerInput}
            type="tel"
            name="phone"
            title="Teléfono"
            placeholder={customer.phone}
          />
          <Input
            onChange={handlerInput}
            type="number"
            name="shipment"
            title="Embarques por semana"
            placeholder={customer.shipment}
          />
          <div className="formCustomer__buttons">
            <Button type="submit" className="btn --warning">
              Editar
            </Button>
            <Link to="/customers">
              <Button className="btn --danger">Cancelar</Button>
            </Link>
          </div>
        </form>
      </Card>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    customer: state.customer,
  }
}

const mapDispatchToProps = {
  get,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomers)
