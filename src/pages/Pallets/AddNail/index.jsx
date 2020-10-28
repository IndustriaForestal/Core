import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getAll } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import { addObjectPallet } from '../actions'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const AddNail = props => {
  const { register, handleSubmit, errors } = useForm()
  const { id } = useParams()
  const { nails } = props

  useEffect(() => {
    props.getAll(`nails`, 'GET_NAILS')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.addObjectPallet(`pallets/add/${id}`, 'ADD_NAIL_PALLET', data)
    document.getElementById('formProcess').reset()
  }

  if (nails) {
    return (
      <Card title="Agregar Proceso">
        <form
          id="formProcess"
          className="formProcess"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="inputGroup">
            <label htmlFor="nailId">
              <span>Clavo:</span>
              <select name="nailId" ref={register}>
                {nails.map(nail => {
                  return (
                    <option key={nail._id} value={nail._id}>
                      {nail.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
          <Input
            type="number"
            name="amount"
            title="Cantidad"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
          <div className="formProcess__buttons">
            <Button type="submit" className="btn --success">
              Crear
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

const mapDispatchToProps = {
  getAll,
  addObjectPallet,
}

const mapStateToProps = state => {
  return {
    nails: state.nails,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNail)
