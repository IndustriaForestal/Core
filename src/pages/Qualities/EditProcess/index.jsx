import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getAll, get } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import { updateProcessQuality } from '../actions'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const EditProcess = props => {
  const { register, handleSubmit } = useForm()
  const { qualityId, processId } = useParams()
  const { processes, material, quality } = props

  useEffect(() => {
    props.getAll(`processes`, 'GET_PROCESSES')
    props.getAll(`material`, 'GET_MATERIAL')
    props.get(`qualities/${qualityId}`, 'GET_QUALITY')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.updateProcessQuality(`qualities/update/${qualityId}/${processId}`, 'UPDATE_PROCESS_QUALITY', data)
    window.location.href = '/qualities'
  }

  if (processes && material && quality) {
    const processEdited = quality[0].process.filter(
      process => process.processId === processId
    )
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
            value={processEdited[0].position}
            passRef={register}
          />
          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Inicia su proceso en:</span>
              <select name="processId" ref={register}>
                <option value={processEdited[0].processId}>
                  {processEdited[0].processName}
                </option>
                {processes
                  .filter(process => process._id !== processEdited[0].processId)
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
          <Input
            type="number"
            name="capacity"
            title="Capacidad Diaria"
            value={processEdited[0].capacity}
            passRef={register}
          />
          <Input
            type="number"
            name="people"
            title="Personal Necesario"
            value={processEdited[0].people}
            passRef={register}
          />
          <Input
            type="number"
            name="duration"
            title="Duración"
            value={processEdited[0].duration}
            passRef={register}
          />
        {/*   <div className="inputGroup">
            <label htmlFor="materialId">
              <span>Inicia su proceso en:</span>
              <select name="materialId" ref={register}>
                <option value={processEdited[0].materialId}>
                  {processEdited[0].materialName}
                </option>
                {material
                  .filter(
                    materialOne =>
                      materialOne._id !== processEdited[0].materialId
                  )
                  .map(materialOne => {
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
            <Button type="submit" className="btn --warning">
              Actualizar
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
  get,
  updateProcessQuality,
}

const mapStateToProps = state => {
  return {
    processes: state.processes,
    material: state.material,
    quality: state.quality,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProcess)
