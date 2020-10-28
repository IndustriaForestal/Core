import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { create } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'

const CreateProcess = props => {
  const { register, handleSubmit, errors } = useForm()
  const endPoint = 'specialProcesses'
  const typeAction = 'CREATE_SPECIAL_PROCESS'

  const onSubmit = data => {
    props.create(endPoint, typeAction, data)
    document.getElementById('formProcess').reset()
  }

  return (
    <Card title="Crear Proceso">
      <form
        id="formProcess"
        className="formProcess"
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
          type="number"
          name="capacity"
          title="Capacidad diaria"
          passRef={register({ required: true })}
          placeholder={errors.capacity && 'Campo requerido'}
        />
        <Input
          type="number"
          name="people"
          title="Personal Necesario"
          passRef={register({ required: true })}
          placeholder={errors.people && 'Campo requerido'}
        />
        <Input
          type="number"
          name="duration"
          title="Duración"
          passRef={register({ required: true })}
          placeholder={errors.duration && 'Campo requerido'}
        />
        <div className="formProcess__buttons">
          <Button type="submit" className="btn --success">
            Crear
          </Button>
          <Link to="/specialProcesses">
            <Button className="btn --danger">Cancelar</Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}

const mapDispatchToProps = {
  create,
}

export default connect(null, mapDispatchToProps)(CreateProcess)
