import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { create, getAll } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const CreateMaterial = props => {
  const { register, handleSubmit, errors } = useForm()
  const { processes } = props

  const onSubmit = data => {
    props.create('material', 'CREATE_MATERIAL', data)
    document.getElementById('formMaterial').reset()
  }

  useEffect(() => {
    props.getAll('processes', 'GET_PROCESSES')
    // eslint-disable-next-line
  }, [])

  if (processes) {
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
          <div className="formNail__buttons">
            <Button type="submit" className="btn --success">
              Crear
            </Button>
            <Link to="/material">
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
    processes: state.processes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMaterial)
