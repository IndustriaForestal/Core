import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { create } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'

const CreateMaterial = props => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => {
    props.create('material', 'CREATE_MATERIAL', data)
    document.getElementById('formMaterial').reset()
  }

  return (
    <Card title="Crear Material">
      <form
        id="formMaterial"
        className="formMaterial"
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
        <select name="processId">{}</select>
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

const mapStateToProps = state => {
  return {
    processes: state.processes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMaterial)

/* Terminar materiales  */

console.log('Terminar material(Create, update, delete)')