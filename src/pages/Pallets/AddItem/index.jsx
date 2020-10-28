import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getAll } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import { addObjectPallet } from '../actions'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const AddItem = props => {
  const { register, handleSubmit, errors } = useForm()
  const { id } = useParams()
  const { items } = props

  useEffect(() => {
    props.getAll(`items`, 'GET_ITEMS')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.addObjectPallet(`pallets/item/${id}`, 'ADD_ITEM_PALLET', data)
    document.getElementById('formItem').reset()
  }

  if (items) {
    return (
      <Card title="Agregar Complemento">
        <form
          id="formItem"
          className="formItem"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="inputGroup">
            <label htmlFor="itemId">
              <span>Complemento:</span>
              <select name="itemId" ref={register}>
                {items.map(item => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
          <Input
            type="number"
            name="amount"
            title="Cantidad"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
          <div className="formProcess__buttons">
            <Button type="submit" className="btn --success">
              Crear
            </Button>
            <Link to="/pallets">
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
  addObjectPallet,
}

const mapStateToProps = state => {
  return {
    items: state.items,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)
