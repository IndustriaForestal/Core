import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create } from '../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'

import Button from '../../components/Button/Button'

import MaterialTable from 'material-table'

const TypeMaterial = props => {
  const { itemsType, setTitle } = props
  const { register, handleSubmit, errors } = useForm()

  useEffect(() => {
    const topbar = {
      title: 'Tipo de Complemento',
      menu: { 'Tipo de Complemento': '/settings/type-material' },
    }
    setTitle(topbar)
    props.getAll('items/type', 'GET_ITEMS_TYPE')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.create('items/type', 'CREATE_ITEM_TYPE', data).then(() => {
      props.getAll('items/type', 'GET_ITEMS_TYPE')
    })
    document.getElementById('formItemType').reset()
  }

  return (
    <>
      <Card title="Crear Materia Prima">
        <form
          id="formItemType"
          className="formItemType"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="name"
            title="Nombre"
            passRef={register({ required: true })}
            placeholder={errors.name && 'Campo requerido'}
          />
          <div className="formItemType__buttons">
            <Button type="submit" className="btn --success">
              Crear
            </Button>
          </div>
        </form>
      </Card>
      <MaterialTable
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Nombre', field: 'name' },
        ]}
        localization={{
          pagination: {
            labelDisplayedRows: '{from}-{to} de {count}',
            labelRowsSelect: 'Filas',
            firstAriaLabel: 'Primera',
            firstTooltip: 'Primera',
            previousAriaLabel: 'Anterior',
            previousTooltip: 'Anterior',
            nextAriaLabel: 'Siguiente',
            nextTooltip: 'Siguiente',
            lastAriaLabel: 'Ultimo',
            lastTooltip: 'Ultimo',
          },
          toolbar: {
            searchTooltip: 'Buscar',
            searchPlaceholder: 'Buscar',
          },
        }}
        data={itemsType}
        title="Pedidos"
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    itemsType: state.reducerMaterial.itemsType,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  create,
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeMaterial)
