import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get, update, getAll } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const UpdatePallet = props => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const { customers, qualities, pallet } = props

  useEffect(() => {
    props.get(`pallets/${id}`, 'GET_PALLET')
    props.getAll(`customers`, 'GET_CUSTOMERS')
    props.getAll('qualities', 'GET_QUALITIES')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.update(`pallets/${id}`, 'UPDATE_PALLET', data)
    window.location.href = '/pallets'
  }
  if (customers && qualities && pallet) {
    return (
      <Card title="Editar Clavo" className="card -warning">
        <form
          id="formPallet"
          className="formPallet"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="model"
            title="Modelo"
            passRef={register}
            value={pallet[0].model}
          />
          <Input
            type="text"
            name="description"
            title="Descripción"
            passRef={register({ required: true })}
            value={pallet[0].description}
          />
          <Input
            type="text"
            name="width"
            title="Ancho"
            passRef={register({ required: true })}
            value={pallet[0].width}
          />
          <Input
            type="text"
            name="height"
            title="Alto"
            passRef={register({ required: true })}
            value={pallet[0].height}
          />
          <Input
            type="text"
            name="length"
            title="Largo"
            passRef={register({ required: true })}
            value={pallet[0].length}
          />
          <div className="inputGroup">
            <label htmlFor="qualityId">
              <span>Calidad:</span>
              <select name="qualityId" ref={register}>
                {qualities
                  .filter(quality => quality._id !== pallet[0].qualityId)
                  .map(quality => {
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
                {customers
                  .filter(customer => customer._id !== pallet[0].customerId)
                  .map(customer => {
                    return (
                      <option key={customer._id} value={customer._id}>
                        {customer.name}
                      </option>
                    )
                  })}
              </select>
            </label>
          </div>
          <div className="formCustomer__buttons">
            <Button type="submit" className="btn --warning">
              Guardar
            </Button>
            <Link to="/pallets">
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
    customers: state.customers,
    qualities: state.qualities,
    pallet: state.pallet,
  }
}

const mapDispatchToProps = {
  get,
  getAll,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePallet)
