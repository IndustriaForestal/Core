import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get, update, getAll } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const UpdateMaterialOne = props => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const { supplier, material } = props
  console.log(supplier)
  useEffect(() => {
    props.get(`suppliers/${id}`, 'GET_SUPPLIER')
    props.getAll(`material`, 'GET_MATERIAL')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.update(`suppliers/${id}`, 'UPDATE_SUPPLIER', data)
    window.location.href = '/suppliers'
  }
  if (supplier && material) {
    return (
      <Card title="Editar Proveedor" className="card -warning">
        <form
          id="formNail"
          className="formNail"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="name"
            title="Nombre"
            passRef={register}
            value={supplier[0].name}
          />
          <Input
            type="number"
            name="capacity"
            title="Capacidad Semanal"
            passRef={register}
            value={supplier[0].capacity}
          />
          <div className="inputGroup">
            <label htmlFor="materialId">
              <span>Inicia su proceso en:</span>
              <select name="materialId" ref={register}>
                <option value={supplier[0].materialId}>
                  {supplier[0].material[0].name}
                </option>
                {material
                  .filter(material => material._id !== supplier[0].materialId)
                  .map(materialOne => {
                    return (
                      <option key={materialOne._id} value={materialOne._id}>
                        {materialOne.name}
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

const mapStateToProps = state => {
  return {
    material: state.material,
    supplier: state.supplier,
  }
}

const mapDispatchToProps = {
  get,
  getAll,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMaterialOne)
