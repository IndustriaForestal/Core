import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAll, create } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Cookies from 'js-cookie'

import MaterialTable from 'material-table'

const CreateCustomer = props => {
  const { register, handleSubmit, errors } = useForm()
  const { zones, subzones } = props

  useEffect(() => {
    props.getAll('zones/zones', 'GET_ZONES').then(() => {
      props.getAll('zones/subzones', 'GET_SUBZONES')
    })

    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    data.user_id = Cookies.get('id')
    if (data.zone_id === '') {
      console.log(data)
    } else {
      props.create(`zones/subzones/${data.zone_id}`, 'GET_SUBZONES', data)
      document.getElementById('formCustomer').reset()
    }
  }

  if (zones && subzones) {
    return (
      <>
        <Card title="Crear SubZona">
          <form
            id="formCustomer"
            className="formCustomer"
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
              type="number"
              step="any"
              name="length"
              title="Largo"
              passRef={register({ required: true })}
              placeholder={errors.length && 'Campo requerido'}
            />
            <Input
              type="number"
              step="any"
              name="height"
              title="Alto"
              passRef={register({ required: true })}
              placeholder={errors.height && 'Campo requerido'}
            />
            <Input
              type="number"
              step="any"
              name="width"
              title="Ancho"
              passRef={register({ required: true })}
              placeholder={errors.width && 'Campo requerido'}
            />
            <div className="inputGroup">
              <label htmlFor="zone_id">
                <span>Zona</span>
                <select name="zone_id" ref={register}>
                  <option value="">Seleccionar</option>
                  {zones
                    ? zones.map(zone => {
                        return (
                          <option key={zone.id} value={zone.id}>
                            {zone.name}
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
              <Link to="/customers">
                <Button className="btn --danger">Cancelar</Button>
              </Link>
            </div>
          </form>
        </Card>
        <MaterialTable
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'Alto', field: 'height' },
            { title: 'Ancho', field: 'width' },
            { title: 'Largo', field: 'length' },
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
          data={subzones}
          title="Sub-Zonas"
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
}

const mapStateToProps = state => {
  return {
    zones: state.zones,
    subzones: state.subzones,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer)
