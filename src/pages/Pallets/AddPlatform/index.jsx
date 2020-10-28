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

const AddPlatform = props => {
  const { register, handleSubmit, errors } = useForm()
  const { id } = useParams()
  const { platforms } = props

  useEffect(() => {
    props.getAll(`platforms`, 'GET_PLATFORMS')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.addObjectPallet(`pallets/platform/${id}`, 'ADD_PLATFORM_PALLET', data)
    document.getElementById('formPlatform').reset()
  }

  if (platforms) {
    return (
      <Card title="Agregar Proceso">
        <form
          id="formPlatform"
          className="formPlatform"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="inputGroup">
            <label htmlFor="platformId">
              <span>Plataforma:</span>
              <select name="platformId" ref={register}>
                {platforms.map(platform => {
                  return (
                    <option key={platform._id} value={platform._id}>
                      {platform.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
          <Input
            type="number"
            name="capacity"
            title="Capacidad de carga"
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
    platforms: state.platforms,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlatform)
