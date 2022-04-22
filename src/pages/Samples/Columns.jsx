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
  const { samples, samplesColumns, user } = props
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
    props.getAll('samples', 'GET_SAMPLES').then(() => {
      props.getAll('samples/columns', 'GET_SAMPLES_COLUMNS')
    })

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`samples/columns`, 'CREATE_SAMPLE', newData)
            .then(() =>
              props.getAll('samples/columns', 'GET_SAMPLES_COLUMNS')
            )
            .then(() => resolve())
        }, 1000)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          delete newData.id
          newData.user_id = userId
          props
            .update(
              `samples/columns/${oldData.id}`,
              'UPDATE_SAMPLE',
              newData
            )
            .then(() =>
              props.getAll('samples/columns', 'GET_SAMPLES_COLUMNS')
            )
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`samples/columns/${oldData.id}`, 'DELETE_SAMPLE')
            .then(() =>
              props.getAll('samples/columns', 'GET_SAMPLES_COLUMNS')
            )
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (samples && samplesColumns) {
    const lookupSamples = {}

    samples.map(item => (lookupSamples[item.id] = item.name))
    return (
      <>
        <MaterialTable
          columns={[
            {
              title: 'Muestreo',
              field: 'sample_id',
              lookup: lookupSamples,
            },
            { title: 'Nombre', field: 'name' },
            {
              title: 'Tipo de dato',
              field: 'data_type',
              lookup: { number: 'Número', text: 'Texto' },
            },
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
          data={samplesColumns}
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
    samplesColumns: state.reducerSamples.samplesColumns,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Samples)
