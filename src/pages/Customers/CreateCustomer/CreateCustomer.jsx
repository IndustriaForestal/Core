import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createCustomer } from '../actions'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import './CreateCustomer.scss'

const CreateCustomer = props => {
  const [form, setValues] = useState()

  const handlerInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handlerSubmit = event => {
    event.preventDefault()
    if (props.createCustomer(form)) {
      console.log('Wevos')
    } else {
      console.log('nowevos')
    }
    document.getElementById('formCustomer').reset()
  }

  return (
    <Card title="Crear Cliente">
      <form id="formCustomer" className="formCustomer" onSubmit={handlerSubmit}>
        <Input onChange={handlerInput} type="text" name="name" title="Nombre" />
        <Input
          onChange={handlerInput}
          type="text"
          name="address"
          title="Dirección"
        />
        <Input
          onChange={handlerInput}
          type="email"
          name="email"
          title="Email"
        />
        <Input
          onChange={handlerInput}
          type="tel"
          name="phone"
          title="Teléfono"
        />
        <Input
          onChange={handlerInput}
          type="number"
          name="numberShipments"
          title="Embarques por semana"
        />
        <div className="formCustomer__buttons">
          <Button type="submit" className="btn --success">
            Crear
          </Button>
          <Link to="/customers">
            <Button className="btn --danger">Cancelar</Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}

const mapDispatchToProps = {
  createCustomer,
}

export default connect(null, mapDispatchToProps)(CreateCustomer)
