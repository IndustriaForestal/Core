import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { create } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'

const CreatePlatform = props => {
  const { register, handleSubmit, errors } = useForm()
  const endPoint = 'platforms'
  const typeAction = 'CREATE_PLATFORM'

  const onSubmit = data => {
    props.create(endPoint, typeAction, data)
    document.getElementById('formPlatform').reset()
  }

  return (
    <Card title="Crear Clavo">
      <form
        id="formPlatform"
        className="formPlatform"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          name="name"
          title="Nombre"
          passRef={register({ required: true })}
          placeholder={errors.name && 'Campo requerido'}
        />
        <div className="formPlatform__buttons">
          <Button type="submit" className="btn --success">
            Crear
          </Button>
          <Link to="/platforms">
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

export default connect(null, mapDispatchToProps)(CreatePlatform)
