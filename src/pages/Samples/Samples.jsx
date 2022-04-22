import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  getAll,
  create,
  update,
  setTitle,
  deleted,
} from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import MaterialTable from 'material-table'

const Samples = props => {
  const { samples, user } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Muestreos',
      menu: {
        'Crear Muestro': '/samples-config',
        'Crear Columna': '/samples-columns',
      },
    }
    props.setTitle(topbar)
    props.getAll('samples', 'GET_SAMPLES')

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`samples`, 'CREATE_SAMPLE', newData)
            .then(() => props.getAll('samples', 'GET_SAMPLES'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          delete newData.id
          newData.user_id = userId
          props
            .update(`samples/${oldData.id}`, 'UPDATE_SAMPLE', newData)
            .then(() => props.getAll('samples', 'GET_SAMPLES'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`samples/${oldData.id}`, 'DELETE_SAMPLE')
            .then(() => props.getAll('samples', 'GET_SAMPLES'))
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (samples) {
    return (
      <>
        <MaterialTable
          columns={[{ title: 'Nombre', field: 'name' }]}
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
            header: {
              actions: 'Acciones',
            },
            body: {
              editRow: {
                deleteText: '¿Eliminar?',
                saveTooltip: 'Ok',
                cancelTooltip: 'Cancelar',
              },
              editTooltip: 'Editar',
              deleteTooltip: 'Eliminar',
              addTooltip: 'Agregar',
            },
          }}
          data={samples}
          editable={editable}
          title="Muestreos"
        />
      </>
    )
  } else {
    return <Loading />
  }
}

const mapDispatchToProps = {
  create,
  getAll,
  update,
  setTitle,
  deleted,
}

const mapStateToProps = state => {
  return {
    samples: state.reducerSamples.samples,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Samples)
