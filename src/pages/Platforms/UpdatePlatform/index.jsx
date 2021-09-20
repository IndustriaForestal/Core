import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get, update } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const UpdatePlatform = props => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const { platform } = props

  useEffect(() => {
    props.get(`platforms/${id}`, 'GET_PLATFORM')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.update(`platforms/${id}`, 'UPDATE_PLATFORM', data)
    window.location.href = '/platforms'
  }
  if (platform) {
    return (
      <Card title="Editar Plataforma" className="card -warning">
        <form
          id="formPlatform"
          className="formPlatform"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="name"
            title="Nombre"
            passRef={register}
            value={platform.name}
          />
          <div className="formCustomer__buttons">
            <Button type="submit" className="btn --warning">
              Guardar
            </Button>
            <Link to="/platforms">
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
    platform: state.platform,
  }
}

const mapDispatchToProps = {
  get,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePlatform)
