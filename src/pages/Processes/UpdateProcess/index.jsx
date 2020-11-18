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
  const { process } = props

  useEffect(() => {
    props.get(`processes/${id}`, 'GET_PROCESS')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.update(`processes/${id}`, 'UPDATE_PROCESS', data)
    window.location.href = '/processes'
  }
  if (process) {
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
            value={process.name}
          />
          <div className="inputGroup">
            <label htmlFor="type">
              <span>Ocupa:</span>
              <select name="type" ref={register}>
                {process.type === 1 ? (
                  <>
                    <option value="1">Tarima</option>
                    <option value="0">Pie Tabla</option>
                  </>
                ) : (
                  <>
                    <option value="0">Pie Tabla</option>
                    <option value="1">Tarima</option>
                  </>
                )}
              </select>
            </label>
          </div>
          <div className="formCustomer__buttons">
            <Button type="submit" className="btn --warning">
              Guardar
            </Button>
            <Link to="/processes">
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
    process: state.process,
  }
}

const mapDispatchToProps = {
  get,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProcess)
