import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../../actions/app'
import Loading from '../../../components/Loading/Loading'
import MaterialTable from 'material-table'

const Processes = props => {
  const { processes, setTitle, processesItems, items, user } = props

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
        props.getAll('processes/items', 'GET_PROCESSES_ITEMS')
      })
      .then(() => {
        props.getAll('items', 'GET_ITEMS')
      })
    // eslint-disable-next-line
  }, [])

  if (processes && processesItems && items) {
    const lookup = {}
    const lookupPallets = {}

    processes.map(process => (lookup[process.id] = process.name))

    items.map(
      item =>
      (lookupPallets[
        item.id
      ] = `${item.length} x ${item.width} x ${item.height} - ${item.name}`)
    )

    return (
      <MaterialTable
        title="Procesos por madera habilitada"
        columns={[
          {
            title: 'Proceso',
            field: 'process_id',
            lookup: lookup,
          },
          {
            title: 'Madera Habilitada',
            field: 'item_id',
            lookup: lookupPallets,
          },
          { title: 'Orden', field: 'orden' },
          { title: 'Cantidad', field: 'amount' },
          { title: 'Estimado Horas', field: 'estimated' },
          { title: 'Holgura Horas', field: 'clearance' },
          { title: '% Merma', field: 'scrap' },
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
        data={processesItems}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.user_id = user.id
                props
                  .create('processes/items', 'CREATE_PROCESS_PALLETS', newData)
                  .then(() =>
                    props.getAll('processes/items', 'GET_PROCESSES_ITEMS')
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
                    `processes/items/${oldData.id}`,
                    'UPDATE_PROCESS_PALLETS',
                    newData
                  )
                  .then(() =>
                    props.getAll('processes/items', 'GET_PROCESSES_ITEMS')
                  )
                  .then(() => resolve())
                  .catch(e => {
                    console.log(e)
                    reject()
                  })
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                props
                  .deleted(
                    `processes/items/${oldData.id}`,
                    'DELETE_PROCESS_PALLETS'
                  )
                  .then(() =>
                    props.getAll('processes/items', 'GET_PROCESSES_ITEMS')
                  )
                  .then(() => resolve())
              }, 1000)
            }),
        }}
      />
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    processes: state.reducerProcesses.processes,
    processesItems: state.reducerProcesses.processesItems,
    items: state.reducerItems.items,
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
