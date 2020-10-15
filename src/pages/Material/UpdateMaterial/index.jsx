import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get, update, getAll } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const UpdateNail = props => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const { materialOne, processes } = props

  useEffect(() => {
    props.get(`material/${id}`, 'GET_MATERIAL_ONE')
    props.getAll(`processes`, 'GET_PROCESSES')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.update(`material/${id}`, 'UPDATE_MATERIAL_ONE', data)
    window.location.href = '/material'
  }
  if (materialOne && processes) {
    return (
      <Card title="Editar Clavo" className="card -warning">
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
            value={materialOne[0].name}
          />
          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Inicia su proceso en:</span>
              <select name="processId" ref={register}>
                <option value={materialOne[0].processId}>
                  {materialOne[0].processes[0].name}
                </option>
                {processes
                  .filter(process => process._id !== materialOne[0].processId)
                  .map(process => {
                    return (
                      <option key={process._id} value={process._id}>
                        {process.name}
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
    processes: state.processes,
    materialOne: state.materialOne,
  }
}

const mapDispatchToProps = {
  get,
  getAll,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNail)
