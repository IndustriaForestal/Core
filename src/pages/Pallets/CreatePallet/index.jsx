import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { create, getAll } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const CreatePallet = props => {
  const { register, handleSubmit, errors } = useForm()
  const { customers, qualities } = props

  const onSubmit = data => {
    props.create('pallets', 'CREATE_PALLET', data)
    document.getElementById('formTarima').reset()
  }

  useEffect(() => {
    props.getAll('customers', 'GET_CUSTOMERS')
    props.getAll('qualities', 'GET_QUALITIES')
    // eslint-disable-next-line
  }, [])

  if (customers && qualities) {
    return (
      <Card title="Crear Tarima">
        <form
          id="formTarima"
          className="formTarima"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="model"
            title="Modelo"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
          <Input
            type="text"
            name="description"
            title="Descripción"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
          <Input
            type="text"
            name="width"
            title="Ancho"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
          <Input
            type="text"
            name="height"
            title="Alto"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
          <Input
            type="text"
            name="length"
            title="Largo"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
          <div className="inputGroup"> 
            <label htmlFor="qualityId">
              <span>Calidad:</span>
              <select name="qualityId" ref={register}>
                {qualities.map(quality => {
                  return (
                    <option key={quality._id} value={quality._id}>
                      {quality.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
          <div className="inputGroup"> 
            <label htmlFor="customerId">
              <span>Cliente:</span>
              <select name="customerId" ref={register}>
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
    )
  } else {
    return <Loading />
  }
}

const mapDispatchToProps = {
  create,
  getAll,
}

const mapStateToProps = state => {
  return {
    customers: state.customers,
    qualities: state.qualities
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePallet)
