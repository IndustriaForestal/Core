import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../../actions/app'
import Loading from '../../../components/Loading/Loading'

import '../styles.scss'

import MaterialTable from 'material-table'

const Qualities = props => {
  const { qualities, setTitle, user, qualitiesProcesses, processes } = props

  useEffect(() => {
    const topbar = {
      title: 'Calidades',
      menu: {
        'Procesos por Rechazo': '/processes/reject',
        Procesos: '/processes',
        Calidades: '/qualities',
        'Procesos por calidades': '/qualities/processes',
        'Procesos por Tarima': '/processes/pallets',
        'Procesos por Madera Habilitada': '/processes/items',
      },
    }
    setTitle(topbar)
    props
      .getAll('qualities', 'GET_QUALITIES')
      .then(() => {
        props.getAll('processes', 'GET_PROCESSES')
      })
      .then(() => {
        props.getAll('qualities/processes', 'GET_QUALITIES_PROCESSES')
      })
    // eslint-disable-next-line
  }, [])

  if (qualities && qualitiesProcesses && processes) {
    const lookupQualities = {}

    qualities.map(item => (lookupQualities[item.id] = item.name))

    const lookupProcesses = {}

    processes.map(item => (lookupProcesses[item.id] = item.name))

    const editable = {
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            newData.user_id = user.id
            props
              .create('qualities/processes', 'CREATE_QUALITY_PROCESS', newData)
              .then(() =>
                props.getAll('qualities/processes', 'GET_QUALITIES_PROCESSES')
              )
              .then(() => resolve())
          }, 1000)
        }),
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(oldData, newData)
            delete newData.id
            newData.user_id = user.id
            props
              .update(
                `qualities/processes/${oldData.id}`,
                'UPDATE_QUALITY_PROCESS',
                newData
              )
              .then(() =>
                props.getAll('qualities/processes', 'GET_QUALITIES_PROCESSES')
              )
              .then(() => resolve())
          }, 1000)
        }),
      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            props
              .deleted(
                `qualities/processes/${oldData.id}`,
                'DELETE_QUALITY_PROCESS'
              )
              .then(() =>
                props.getAll('qualities/processes', 'GET_QUALITIES_PROCESSES')
              )
              .then(() => resolve())
          }, 1000)
        }),
    }

    return (
      <MaterialTable
        title="Procesos por calidad"
        columns={[
          { title: 'Calidad', field: 'quality_id', lookup: lookupQualities },
          { title: 'Posición', field: 'position' },
          { title: 'Proceso', field: 'process_id', lookup: lookupProcesses },
          { title: 'Cantidad', field: 'amount' },
          { title: 'Duración', field: 'duration' },
          { title: 'Holgura', field: 'slack' },
          { title: 'Merma', field: 'scrap' },
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
        data={qualitiesProcesses}
        editable={editable}
      />
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    qualities: state.reducerQualities.qualities,
    processes: state.reducerProcesses.processes,
    qualitiesProcesses: state.reducerQualities.qualitiesProcesses,
    user: state.reducerApp.user,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  update,
  create,
}

export default connect(mapStateToProps, mapDispatchToProps)(Qualities)
