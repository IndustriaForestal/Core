import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../../actions/app'
import Loading from '../../../components/Loading/Loading'
import '../styles.scss'
import MaterialTable from 'material-table'

const Processes = props => {
  const { setTitle, user, material, processesReject, qualities } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Procesos',
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
      .getAll('processes/reject', 'GET_PROCESSES_REJECT')
      .then(() => {
        props.getAll('material', 'GET_MATERIAL')
      })
      .then(() => {
        props.getAll('qualities', 'GET_QUALITIES')
      })

    // eslint-disable-next-line
  }, [])

  if (material && processesReject && qualities) {
    const lookupMaterial = {}

    material.map(m => (lookupMaterial[m.id] = m.name))

    const lookupQualities = {}

    qualities.map(item => (lookupQualities[item.id] = item.name))

    const editable = {
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            newData.user_id = userId
            props
              .create('processes/reject', 'CREATE_PROCESS', newData)
              .then(() =>
                props.getAll('processes/reject', 'GET_PROCESSES_REJECT')
              )
              .then(() => resolve())
          }, 1000)
        }),
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(oldData, newData)
            delete newData.id
            newData.user_id = userId
            props
              .update(
                `processes/reject/${oldData.id}`,
                'UPDATE_PROCESS',
                newData
              )
              .then(() =>
                props.getAll('processes/reject', 'GET_PROCESSES_REJECT')
              )
              .then(() => resolve())
          }, 1000)
        }),
      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            props
              .deleted(`processes/reject/${oldData.id}`, 'DELETE_PROCESS')
              .then(() =>
                props.getAll('processes/reject', 'GET_PROCESSES_REJECT')
              )
              .then(() => resolve())
          }, 1000)
        }),
    }

    return (
      <MaterialTable
        title="Procesos"
        columns={[
          { title: 'Nombre', field: 'name' },
          {
            title: 'Material de entrada',
            field: 'material_in',
            lookup: lookupMaterial,
          },
          {
            title: 'Material de salida',
            field: 'material_out',
            lookup: lookupMaterial,
          },
          {
            title: 'Calidad',
            field: 'quality_id',
            lookup: lookupQualities,
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
        data={processesReject}
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
    processesReject: state.reducerProcesses.processesReject,
    material: state.reducerMaterial.material,
    user: state.reducerApp.user,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  create,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(Processes)
