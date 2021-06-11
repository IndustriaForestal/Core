import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { create, getAll, update } from '../../../actions/app'
import { useForm } from 'react-hook-form'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Cookies from 'js-cookie'

import MaterialTable from 'material-table'

const CreateCustomer = props => {
  const { register, handleSubmit, errors } = useForm()
  const { plants } = props
  const endPoint = 'zones/plants'
  const typeAction = 'CREATE_CUSTOMER'

  useEffect(() => {
    props.getAll('zones/plants', 'GET_PLANTS')
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    data.user_id = Cookies.get('id')
    props.create(endPoint, typeAction, data).then(() => {
      props.getAll('zones/plants', 'GET_PLANTS')
    })
    document.getElementById('formCustomer').reset()
  }

  if (plants) {
    return (
      <>
        <Card title="Crear Planta">
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
            { title: 'Planta', field: 'name' },
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
          data={plants}
          title="Plantas"
          cellEditable={{
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return new Promise((resolve, reject) => {
                props
                  .update(`zones/plants/${rowData.id}`, 'UPDATE_PLANT', {
                    ...rowData,
                    [columnDef.field]: newValue,
                    user_id: Cookies.get('id'),
                  })
                  .then(() => {
                    props.getAll('zones/plants', 'GET_PLANTS')
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer)
