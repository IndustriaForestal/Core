import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginRequest } from './actions'
import logoFull from '../../assets/static/logoFull.svg'
import './Login.scss'
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'

const Login = props => {
  const [user, setUser] = useState({})
  const handlerInput = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
      position: 'Dev',
    })
  }
  const hanlderSubmit = event => {
    event.preventDefault()
    props.loginRequest(user)
    props.history.push('/')
  }
  return (
    <div className="login">
      <div>
        <div>
          <img src={logoFull} alt="" />
        </div>
        <div>
          <form onSubmit={hanlderSubmit}>
            <Title className="-small">Bienvenido</Title>
            <label htmlFor="user">
              <span>Usuario</span>
              <input type="text" name="user" onChange={handlerInput} />
            </label>
            <label htmlFor="password">
              <span>Password</span>
              <input type="password" name="password" onChange={handlerInput} />
            </label>
            <label htmlFor="remeber">
              <span>Recordarme</span>
              <input type="checkbox" name="remeber" />
            </label>
            <Button className="btn btn__primary --flat" type="submit">
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  loginRequest,
}

export default connect(null, mapDispatchToProps)(Login)
