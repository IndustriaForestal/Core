import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  getAll,
  deleted,
  create,
  update,
} from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import MaterialTable from 'material-table'

const TypeMaterial = props => {
  const { warehouseItems, processes, setTitle, user } = props
  const userId = user.id

  useEffect(() => {
    const topbar = {
      title: 'Almance',
      menu: { 'Almance Configuración': '/warehouse/add' },
    }
    setTitle(topbar)
    props.getAll('warehouse', 'GET_WAREHOUSE_ITEMS').then(() => {
      props.getAll('processes', 'GET_PROCESSES')
    })
    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`warehouse`, 'CREATE_WOOD', newData)
            .then(() => props.getAll('warehouse', 'GET_WAREHOUSE_ITEMS'))
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
            .update(`warehouse/${oldData.id}`, 'UPDATE_WOOD', newData)
            .then(() => props.getAll('warehouse', 'GET_WAREHOUSE_ITEMS'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`warehouse/${oldData.id}`, 'DELETE_WOOD')
            .then(() => props.getAll('warehouse', 'GET_WAREHOUSE_ITEMS'))
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (warehouseItems && processes) {
    const lookupProcesses = {}
    processes.map(item => (lookupProcesses[item.id] = item.name))

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Nombre', field: 'name' },
            {
              title: 'Proceso',
              field: 'process_id',
              lookup: lookupProcesses,
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
          data={warehouseItems}
          title="Productos Almacen"
          editable={editable}
        />
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    warehouseItems: state.reducerWarehouse.warehouseItems,
    processes: state.reducerProcesses.processes,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeMaterial)
