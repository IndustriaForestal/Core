import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getAll } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import { addObjectPallet } from '../actions'
import Card from '../../../components/Card/Card'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const AddSpecialProcess = props => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const { specialProcesses, processes } = props

  useEffect(() => {
    props.getAll(`specialProcesses`, 'GET_SPECIAL_PROCESSES')
    props.getAll(`processes`, 'GET_PROCESSES')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.addObjectPallet(
      `pallets/specialProcess/${id}`,
      'ADD_SPECIAL_PROCESS_PALLET',
      data
    )
    document.getElementById('formProcess').reset()
  }

  if (specialProcesses && processes) {
    return (
      <Card title="Agregar Proceso Especial">
        <form
          id="formProcess"
          className="formProcess"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="inputGroup">
            <label htmlFor="specialProcessId">
              <span>Clavo:</span>
              <select name="specialProcessId" ref={register}>
                {specialProcesses.map(specialProcess => {
                  return (
                    <option key={specialProcess._id} value={specialProcess._id}>
                      {specialProcess.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Antes de:</span>
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

          <div className="formProcess__buttons">
            <Button type="submit" className="btn --success">
              Crear
            </Button>
            <Link to="/pallets">
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
  addObjectPallet,
}

const mapStateToProps = state => {
  return {
    specialProcesses: state.specialProcesses,
    processes: state.processes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSpecialProcess)
