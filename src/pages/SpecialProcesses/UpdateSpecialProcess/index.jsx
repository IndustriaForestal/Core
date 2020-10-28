import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get, update } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const UpdateProcess = props => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const { specialProcess } = props

  useEffect(() => {
    props.get(`specialProcesses/${id}`, 'GET_SPECIAL_PROCESS')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.update(`specialProcesses/${id}`, 'UPDATE_SPECIAL_PROCESS', data)
    window.location.href = '/specialProcesses'
  }
  if (specialProcess) {
    return (
      <Card title="Editar Proceso" className="card -warning">
        <form
          id="formProcess"
          className="formProcess"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="name"
            title="Nombre"
            passRef={register}
            value={specialProcess.name}
          />
          <Input
            type="number"
            name="capacity"
            title="Capacidad"
            passRef={register}
            value={specialProcess.capacity}
          />
          <Input
            type="number"
            name="people"
            title="Personal"
            passRef={register}
            value={specialProcess.people}
          />
          <Input
            type="number"
            name="duration"
            title="Duración"
            passRef={register}
            value={specialProcess.duration}
          />
          <div className="formCustomer__buttons">
            <Button type="submit" className="btn --warning">
              Guardar
            </Button>
            <Link to="/specialProcesses">
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
    specialProcess: state.specialProcess,
  }
}

const mapDispatchToProps = {
  get,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProcess)
