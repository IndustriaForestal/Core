import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { create, getAll, update } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'

import MaterialTable from 'material-table'

const CreateCustomer = props => {
  const { register, handleSubmit, errors } = useForm()
  const { plants, zones } = props
  const typeAction = 'CREATE_CUSTOMER'

  useEffect(() => {
    props.getAll('zones/plants', 'GET_PLANTS').then(() => {
      props.getAll('zones/zones', 'GET_ZONES')
    })
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    data.user_id = sessionStorage.getItem('id')
    props.create(`zones/zones/${data.plant_id}`, typeAction, data).then(() => {
      props.getAll('zones/zones', 'GET_ZONES')
    })
    document.getElementById('formCustomer').reset()
  }

  if (plants && zones) {
    return (
      <>
        <Card title="Crear Zona">
          <form
            id="formCustomer"
            className="formCustomer"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="text"
              name="name"
              title="Nombre"
              passRef={register({ required: true })}
              placeholder={errors.name && 'Campo requerido'}
            />
            <div className="inputGroup">
              <label htmlFor="plant_id">
                <span>Cliente</span>
                <select name="plant_id" ref={register}>
                  {plants
                    ? plants.map(plant => {
                        return (
                          <option key={plant.id} value={plant.id}>
                            {plant.name}
                          </option>
                        )
                      })
                    : null}
                </select>
              </label>
            </div>
            <div className="formCustomer__buttons">
              <Button type="submit" className="btn --success">
                Crear
              </Button>
              <Link to="/zones">
                <Button className="btn --danger">Cancelar</Button>
              </Link>
            </div>
          </form>
        </Card>
        <MaterialTable
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Zona', field: 'name' },
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
          data={zones}
          title="Zonas"
          cellEditable={{
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return new Promise((resolve, reject) => {
                props
                  .update(`zones/zones/${rowData.id}`, 'UPDATE_PLANT', {
                    ...rowData,
                    [columnDef.field]: newValue,
                    user_id: sessionStorage.getItem('id'),
                  })
                  .then(() => {
                    props.getAll('zones/zones', 'GET_ZONES')
                  })
                setTimeout(resolve, 1000)
              })
            },
          }}
        />
      </>
    )
  } else {
    return <h1>Cargando</h1>
  }
}

const mapDispatchToProps = {
  create,
  getAll,
  update,
}

const mapStateToProps = state => {
  return {
    plants: state.reducerZones.plants,
    zones: state.reducerZones.zones,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer)
