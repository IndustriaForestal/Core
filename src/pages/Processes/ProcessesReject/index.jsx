import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../../actions/app'
import Loading from '../../../components/Loading/Loading'
import '../styles.scss'
import MaterialTable from 'material-table'

const Processes = props => {
  const { setTitle, user, material, processesReject } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Procesos',
      menu: {
        Procesos: '/processes',
        'Procesos por Tarima': '/processes/pallets',
        'Procesos por Madera Habilitada': '/processes/items',
        'Procesos por Rechazo': '/processes/reject',
      },
    }
    setTitle(topbar)
    props.getAll('processes/reject', 'GET_PROCESSES_REJECT').then(() => {
      props.getAll('material', 'GET_MATERIAL')
    })

    // eslint-disable-next-line
  }, [])

  if (material && processesReject) {
    const lookupMaterial = {}

    material.map(m => (lookupMaterial[m.id] = m.name))

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
