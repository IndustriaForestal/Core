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
  const { user, roles, workstations, zones, plants } = props
  const [passwordVerify, setPasswordVerify] = useState(true)
  const [password, setPassword] = useState(true)

  useEffect(() => {
    props
      .get(`users/${id}`, 'GET_USER')
      .then(() => {
        props.getAll(`users/roles`, 'GET_ROLES')
      })
      .then(() => {
        props.getAll('zones/workstations', 'GET_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('zones/zones', 'GET_ZONES')
      })
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

  if (user && roles && workstations && zones && plants) {
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
          {passwordVerify ? null : (
            <span className="--danger">Los password deben ser iguales</span>
          )}
          <div className="inputGroup">
            <label htmlFor="role">
              <span>Rol:</span>
              <select name="role" ref={register}>
                <option value={user.rol_id}>
                  {roles.find(r => r.id === user.rol_id).name}
                </option>
                {roles
                  ? roles
                      .filter(rol => rol.id !== user.rol_id)
                      .map(rol => (
                        <option key={rol.id} value={rol.id}>
                          {rol.name}
                        </option>
                      ))
                  : null}
              </select>
            </label>
          </div>
          <div className="inputGroup">
            <label htmlFor="plant_id">
              <span>Planta:</span>
              <select name="plant_id" ref={register}>
                <option value={user.plant_id}>
                  {plants.find(p => p.id === user.plant_id) !== undefined
                    ? plants.find(p => p.id === user.plant_id).name
                    : 'Error'}
                </option>
                {plants
                  ? plants.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))
                  : null}
              </select>
            </label>
            <label htmlFor="zone_id">
              <span>Zona:</span>
              <select name="zone_id" ref={register}>
                <option value={user.zone_id}>
                  {zones.find(z => z.id === user.zone_id) !== undefined
                    ? zones.find(z => z.id === user.zone_id).name
                    : 'Error'}
                </option>
                {zones
                  ? zones.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))
                  : null}
              </select>
            </label>
            <label htmlFor="workstation">
              <span>Area de trabajo:</span>
              <select name="workstation" ref={register}>
                <option value={user.workstation_id}>
                  {user.workstation_id > 0
                    ? workstations.find(w => w.id === user.workstation_id)
                        .workstation
                    : 'Area de trabajo sin asignar'}
                </option>
                {user.workstation_id > 0 ? (
                  <option value="">Quitar area de trabajo</option>
                ) : null}

                {workstations
                  ? workstations
                      .filter(w => w.id !== user.workstation_id)
                      .map(w => (
                        <option key={w.id} value={w.id}>
                          {w.workstation}
                        </option>
                      ))
                  : null}
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
    user: state.reducerUsers.user,
    roles: state.reducerUsers.roles,
    zones: state.reducerZones.zones,
    plants: state.reducerZones.plants,
    workstations: state.reducerZones.workstations,
  }
}

const mapDispatchToProps = {
  get,
  getAll,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMaterialOne)
