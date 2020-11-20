import React, { useEffect, useState } from 'react'
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
  const { user, processes } = props
  const [passwordVerify, setPasswordVerify] = useState(true)
  const [password, setPassword] = useState(true)

  useEffect(() => {
    props.get(`users/one/${id}`, 'GET_USER')
    props.getAll(`processes`, 'GET_PROCESSES')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.update(`users/${id}`, 'UPDATE_USER', data)
    window.location.href = '/users'
  }

  const handlePasswordVerify = e => {
    if (password === e.target.value) {
      setPasswordVerify(true)
    } else {
      setPasswordVerify(false)
    }
  }

  if (user && processes) {
    return (
      <Card title="Editar Usuario" className="card -warning">
        <form
          id="formUser"
          className="formUser"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="name"
            title="Nombre"
            passRef={register}
            value={user.name}
          />
          <Input
            type="text"
            name="user"
            title="Usuario"
            passRef={register}
            value={user.user}
          />
          <Input
            type="password"
            name="password"
            title="Contraseña"
            passRef={register}
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
                <option value={user.role}>{user.role}</option>
                <option value="Administrador">Administrador</option>
                {processes
                  .filter(process => process.name !== user.role)
                  .map(process => {
                    return (
                      <option key={process._id} value={process.name}>
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

const mapStateToProps = state => {
  return {
    processes: state.processes,
    user: state.user,
  }
}

const mapDispatchToProps = {
  get,
  getAll,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMaterialOne)
