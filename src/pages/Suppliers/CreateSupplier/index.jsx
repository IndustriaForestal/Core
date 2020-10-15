import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { create, getAll } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const CreateSupplier = props => {
  const { register, handleSubmit, errors } = useForm()
  const { material } = props
  const endPoint = 'suppliers'
  const typeAction = 'CREATE_SUPPLIER'

  const onSubmit = data => {
    props.create(endPoint, typeAction, data)
    document.getElementById('formSupplier').reset()
  }

  useEffect(() => {
    props.getAll('material', 'GET_MATERIAL')
    // eslint-disable-next-line
  }, [])

  if (material) {
    return (
      <Card title="Crear Proveedor">
        <form
          id="formSupplier"
          className="formSupplier"
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
            title="Capacidad Semanal"
            passRef={register({ required: true })}
            placeholder={errors.stock && 'Campo requerido'}
          />
          <div className="inputGroup">
            <label htmlFor="materialId">
              <span>Inicia su proceso en:</span>
              <select name="materialId" ref={register}>
                {material.map(materialOne => {
                  return (
                    <option key={materialOne._id} value={materialOne._id}>
                      {materialOne.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
          <div className="formSupplier__buttons">
            <Button type="submit" className="btn --success">
              Crear
            </Button>
            <Link to="/suppliers">
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
    material: state.material,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSupplier)
