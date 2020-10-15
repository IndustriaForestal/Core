import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { create } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'

const CreateItem = props => {
  const { register, handleSubmit, errors } = useForm()
  const endPoint = 'items'
  const typeAction = 'CREATE_ITEM'

  const onSubmit = data => {
    props.create(endPoint, typeAction, data)
    document.getElementById('formItem').reset()
  }

  return (
    <Card title="Crear Clavo">
      <form
        id="formItem"
        className="formItem"
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
          name="description"
          title="Descripción"
          passRef={register({ required: true })}
          placeholder={errors.stock && 'Campo requerido'}
        />
        <Input
          type="number"
          name="length"
          step="any"
          title="Largo"
          passRef={register({ required: true })}
          placeholder={errors.stock && 'Campo requerido'}
        />
        <Input
          type="number"
          name="width"
          step="any"
          title="Ancho"
          passRef={register({ required: true })}
          placeholder={errors.stock && 'Campo requerido'}
        />
        <Input
          type="number"
          name="height"
          step="any"
          title="Alto"
          passRef={register({ required: true })}
          placeholder={errors.stock && 'Campo requerido'}
        />
        <Input
          type="number"
          name="stock"
          title="Inventario"
          passRef={register({ required: true })}
          placeholder={errors.stock && 'Campo requerido'}
        />
        <div className="formItem__buttons">
          <Button type="submit" className="btn --success">
            Crear
          </Button>
          <Link to="/items">
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

export default connect(null, mapDispatchToProps)(CreateItem)
