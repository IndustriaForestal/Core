import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { create } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'

const CreateCustomer = props => {
  const { register, handleSubmit, errors } = useForm()
  const endPoint = 'customers'
  const typeAction = 'CREATE_CUSTOMER'

  const onSubmit = data => {
    props.create(endPoint, typeAction, data)
    document.getElementById('formCustomer').reset()
  }

  return (
    <Card title="Crear Cliente">
      <form
        id="formCustomer"
        className="formCustomer"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          name="name"
          title="Nombre"
          passRef={register({ required: true })}
          placeholder={errors.name && 'Campo requerido'}
        />
        <Input
          type="text"
          name="address"
          title="Dirección"
          passRef={register({ required: true })}
          placeholder={errors.address && 'Campo requerido'}
        />
        <Input
          type="email"
          name="email"
          title="Email"
          passRef={register({ required: true })}
          placeholder={errors.email && 'Campo requerido'}
        />
        <Input
          type="tel"
          name="phone"
          title="Teléfono"
          passRef={register({ required: true })}
          placeholder={errors.phone && 'Campo requerido'}
        />
        <Input
          type="number"
          name="shipment"
          title="Embarques por semana"
          passRef={register({ required: true })}
          placeholder={errors.shipment && 'Campo requerido'}
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
  create
}

export default connect(null, mapDispatchToProps)(CreateCustomer)
