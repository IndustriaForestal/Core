import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getAll } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import { addProcessQuality } from '../actions'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const AddProcess = props => {
  const { register, handleSubmit, errors } = useForm()
  const { id } = useParams()
  const { processes, material } = props

  useEffect(() => {
    props.getAll(`processes`, 'GET_PROCESSES')
    props.getAll(`material`, 'GET_MATERIAL')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.addProcessQuality(`qualities/add/${id}`, 'ADD_PROCESS_QUALITY', data)
    document.getElementById('formProcess').reset()
  }

  if (processes && material) {
    return (
      <Card title="Agregar Proceso">
        <form
          id="formProcess"
          className="formProcess"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="number"
            name="position"
            title="Posición"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Inicia su proceso en:</span>
              <select name="processId" ref={register}>
                {processes.map(process => {
                  return (
                    <option key={process._id} value={process._id}>
                      {process.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
          <Input
            type="number"
            name="capacity"
            title="Capacidad Diaria"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
          <Input
            type="number"
            name="people"
            title="Personal Necesario"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
          <Input
            type="number"
            name="duration"
            title="Duración"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
         {/*  <div className="inputGroup">
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
          </div> */}
          <div className="formProcess__buttons">
            <Button type="submit" className="btn --success">
              Crear
            </Button>
            <Link to="/qualities">
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
  addProcessQuality,
}

const mapStateToProps = state => {
  return {
    processes: state.processes,
    material: state.material,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProcess)
