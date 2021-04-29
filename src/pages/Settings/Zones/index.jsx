import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'

import Button from '../../../components/Button/Button'

import MaterialTable from 'material-table'

const TypeMaterial = props => {
  const { zone, setTitle } = props
  const { register, handleSubmit, errors } = useForm()

  useEffect(() => {
    const topbar = {
      title: 'Zona',
      menu: { Zona: '/settings/zone' },
    }
    setTitle(topbar)
    props.getAll('zone', 'GET_ZONE')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    props.create('zone', 'CREATE_ZONE', data).then(() => {
      props.getAll('zone', 'GET_ZONE')
    })
    document.getElementById('formZone').reset()
  }

  return (
    <>
      <Card title="Crear Zona">
        <form
          id="formZone"
          className="formZone"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            name="id"
            title="ID"
            passRef={register({ required: true })}
            placeholder={errors.id && 'Campo requerido'}
          />
          <Input
            type="text"
            name="plant"
            title="Planta"
            passRef={register({ required: true })}
            placeholder={errors.plant && 'Campo requerido'}
          />
          <Input
            type="text"
            name="zone"
            title="Zona"
            passRef={register({ required: true })}
            placeholder={errors.zone && 'Campo requerido'}
          />
          <Input
            type="text"
            name="subzone"
            title="Sub-Zona"
            passRef={register({ required: true })}
            placeholder={errors.subzone && 'Campo requerido'}
          />
          <div className="formZone__buttons">
            <Button type="submit" className="btn --success">
              Crear
            </Button>
          </div>
        </form>
      </Card>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'Planta', field: 'plant' },
          { title: 'Zona', field: 'zone' },
          { title: 'Sub-zona', field: 'subzone' },
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
        data={zone}
        title="Pedidos"
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    zone: state.zone,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  create,
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeMaterial)
