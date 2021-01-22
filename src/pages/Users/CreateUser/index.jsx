import React, { useEffect, useState } from 'react'
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
  const { processes } = props
  const [passwordVerify, setPasswordVerify] = useState(false)
  const [password, setPassword] = useState(false)
  const onSubmit = data => {
    props.create('users', 'CREATE_USER', data)
    document.getElementById('formUser').reset()
  }

  useEffect(() => {
    props.getAll('processes', 'GET_PROCESSES')
    // eslint-disable-next-line
  }, [])

  const handlePasswordVerify = e => {
    if (password === e.target.value) {
      setPasswordVerify(true)
    } else {
      setPasswordVerify(false)
    }
  }

  if (processes) {
    return (
      <Card title="Crear Cliente">
        <form
          id="formUser"
          className="formUser"
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
            type="text"
            name="user"
            title="Usuario"
            passRef={register({ required: true })}
            placeholder={errors.user && 'Campo requerido'}
          />
          <Input
            type="password"
            name="password"
            title="Contraseña"
            passRef={register({ required: true })}
            placeholder={errors.password && 'Campo requerido'}
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <Input
            type="password"
            name="confirmPassword"
            title="Confirmar Contraseña"
            onChange={handlePasswordVerify}
          />

          {passwordVerify ? (
            <span className="--success">Password Correcto</span>
          ) : (
            <span className="--danger">Los password deben ser iguales</span>
          )}

          <div className="inputGroup">
            <label htmlFor="role">
              <span>Area:</span>
              <select name="role" ref={register}>
                <option value="Administrador">Administrador</option>
                <option value="Vista">Vista</option>
                {processes.map(process => {
                  return (
                    <option key={process._id} value={process.name}>
                      {process.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
          <div className="formUser__buttons">
            {passwordVerify ? (
              <Button type="submit" className="btn --success">
                Crear
              </Button>
            ) : (
              <button
                type="submit"
                className="btn --success --disabled"
                disabled
              >
                Crear
              </button>
            )}

            <Link to="/users">
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateSupplier)
