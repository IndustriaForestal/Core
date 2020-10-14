import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get, update } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const UpdateNail = props => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const { nail } = props

  useEffect(() => {
    props.get(`nails/${id}`, 'GET_NAIL')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.update(`nails/${id}`, 'UPDATE_NAIL', data)
    window.location.href = '/nails'
  }
  if (nail) {
    return (
      <Card title="Editar Clavo" className="card -warning">
        <form
          id="formNail"
          className="formNail"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="name"
            title="Nombre"
            passRef={register}
            value={nail.name}
          />
          <Input
            type="number"
            name="stock"
            title="Inventario"
            passRef={register}
            value={nail.stock}
          />
          <div className="formCustomer__buttons">
            <Button type="submit" className="btn --warning">
              Guardar
            </Button>
            <Link to="/nails">
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
    nail: state.nail,
  }
}

const mapDispatchToProps = {
  get,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNail)
