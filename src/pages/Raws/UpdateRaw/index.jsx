import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get, update } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const UpdateRaws = props => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const { raw } = props

  useEffect(() => {
    props.get(`raws/${id}`, 'GET_RAW')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.update(`raws/${id}`, 'UPDATE_RAW', data)
    window.location.href = '/raws'
  }
  if (raw) {
    return (
      <Card title="Editar Materia Prima" className="card -warning">
        <form
          id="formRaws"
          className="formRaws"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="name"
            title="Nombre"
            passRef={register}
            value={raw.name}
          />
          <div className="formCustomer__buttons">
            <Button type="submit" className="btn --warning">
              Guardar
            </Button>
            <Link to="/raws">
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
    raw: state.raw,
  }
}

const mapDispatchToProps = {
  get,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRaws)
