import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { create } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'

const CreateNail = props => {
  const { register, handleSubmit, errors } = useForm()
  const endPoint = 'nails'
  const typeAction = 'CREATE_NAIL'

  const onSubmit = data => {
    props.create(endPoint, typeAction, data)
    document.getElementById('formNail').reset()
  }

  return (
    <Card title="Crear Clavo">
      <form
        id="formNail"
        className="formNail"
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
          name="stock"
          title="Inventario"
          passRef={register({ required: true })}
          placeholder={errors.stock && 'Campo requerido'}
        />
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
}

const mapDispatchToProps = {
  create,
}

export default connect(null, mapDispatchToProps)(CreateNail)
