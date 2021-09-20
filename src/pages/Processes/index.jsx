import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import './styles.scss'
import MaterialTable from 'material-table'

const Processes = props => {
  const {
    processes,
    setTitle,
    user,
    material,
    processesReject,
    materialState,
  } = props
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
      .getAll('processes', 'GET_PROCESSES')
      .then(() => {
        props.getAll('material', 'GET_MATERIAL')
      })
      .then(() => {
        props.getAll('material/state', 'GET_MATERIAL_STATE')
      })
      .then(() => {
        props.getAll('processes/reject', 'GET_PROCESSES_REJECT')
      })
    // eslint-disable-next-line
  }, [])

  if (processes && material && processesReject && materialState) {
    const lookupMaterial = {}
    const lookupProcessReject = { 0: 'N/A' }
    const lookupMaterialState = { 0: 'N/A' }

    material.map(m => (lookupMaterial[m.id] = m.name))
    processesReject.map(m => (lookupProcessReject[m.id] = m.name))
    materialState.map(m => (lookupMaterialState[m.id] = m.name))

    const editable = {
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            newData.user_id = userId
            props
              .create('processes', 'CREATE_PROCESS', newData)
              .then(() => props.getAll('processes', 'GET_PROCESSES'))
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
              .update(`processes/${oldData.id}`, 'UPDATE_PROCESS', newData)
              .then(() => props.getAll('processes', 'GET_PROCESSES'))
              .then(() => resolve())
          }, 1000)
        }),
      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            props
              .deleted(`processes/${oldData.id}`, 'DELETE_PROCESS')
              .then(() => props.getAll('processes', 'GET_PROCESSES'))
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
            title: 'Estado de madera de entrada',
            field: 'state_in',
            lookup: lookupMaterialState,
          },
          {
            title: 'Material de salida',
            field: 'material_out',
            lookup: lookupMaterial,
          },
          {
            title: 'Estado de madera de salida',
            field: 'state_out',
            lookup: lookupMaterialState,
          },
          {
            title: 'Rechazo 1',
            field: 'reject_1',
            lookup: lookupProcessReject,
          },
          {
            title: 'Rechazo 2',
            field: 'reject_2',
            lookup: lookupProcessReject,
          },
          {
            title: 'Rechazo 3',
            field: 'reject_3',
            lookup: lookupProcessReject,
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
        data={processes}
        editable={editable}
      />
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    processes: state.reducerProcesses.processes,
    processesReject: state.reducerProcesses.processesReject,
    material: state.reducerMaterial.material,
    materialState: state.reducerMaterial.materialState,
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
