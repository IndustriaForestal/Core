import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get, update } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const UpdateItem = props => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const { item } = props

  useEffect(() => {
    props.get(`items/${id}`, 'GET_ITEM')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.update(`items/${id}`, 'UPDATE_ITEM', data)
    window.location.href = '/items'
  }
  if (item) {
    return (
      <Card title="Editar Clavo" className="card -warning">
        <form
          id="formItem"
          className="formItem"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="name"
            title="Nombre"
            passRef={register}
            value={item.name}
          />
          <Input
            type="text"
            name="description"
            title="Descripción"
            passRef={register}
            value={item.description}
          />
          <Input
            type="number"
            name="length"
            step="any"
            title="Largo"
            passRef={register}
            value={item.length}
          />
          <Input
            type="number"
            name="width"
            step="any"
            title="Ancho"
            passRef={register}
            value={item.width}
          />
          <Input
            type="number"
            name="height"
            step="any"
            title="Alto"
            passRef={register}
            value={item.height}
          />
          <Input
            type="number"
            name="stock"
            title="Inventario"
            passRef={register}
            value={item.stock}
          />
          <div className="formCustomer__buttons">
            <Button type="submit" className="btn --warning">
              Guardar
            </Button>
            <Link to="/items">
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
    item: state.item,
  }
}

const mapDispatchToProps = {
  get,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItem)
