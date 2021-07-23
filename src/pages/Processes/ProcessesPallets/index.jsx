import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../../actions/app'
import Loading from '../../../components/Loading/Loading'
import MaterialTable from 'material-table'

const Processes = props => {
  const { processes, setTitle, processesPallets, pallets } = props

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
    props
      .getAll('processes', 'GET_PROCESSES')
      .then(() => {
        props.getAll('processes/pallets', 'GET_PROCESSES_PALLETS')
      })
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
    // eslint-disable-next-line
  }, [])

  if (processes && processesPallets && pallets) {
    const lookup = {}
    const lookupPallets = {}

    processes.map(process => {
      return (lookup[process.id] = process.name)
    })

    pallets.map(pallet => {
      return (lookupPallets[pallet.id] = pallet.model)
    })

    return (
      <MaterialTable
        title="Procesos por tarima"
        columns={[
          {
            title: 'Proceso',
            field: 'process_id',
            lookup: lookup,
          },
          {
            title: 'Tarima',
            field: 'pallet_id',
            lookup: lookupPallets,
          },
          { title: 'Orden', field: 'orden' },
          { title: 'Estimado Horas', field: 'estimated' },
          { title: 'Holgura Horas', field: 'clearance' },
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
        data={processesPallets}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.user_id = 1
                props
                  .create(
                    'processes/pallets',
                    'CREATE_PROCESS_PALLETS',
                    newData
                  )
                  .then(() =>
                    props.getAll('processes/pallets', 'GET_PROCESSES_PALLETS')
                  )
                  .then(() => resolve())
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(oldData, newData)
                delete newData.id
                newData.user_id = 1
                props
                  .update(
                    `processes/pallets/${oldData.id}`,
                    'UPDATE_PROCESS_PALLETS',
                    newData
                  )
                  .then(() =>
                    props.getAll('processes/pallets', 'GET_PROCESSES_PALLETS')
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
                    `processes/pallets/${oldData.id}`,
                    'DELETE_PROCESS_PALLETS'
                  )
                  .then(() =>
                    props.getAll('processes/pallets', 'GET_PROCESSES_PALLETS')
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
    processesPallets: state.reducerProcesses.processesPallets,
    pallets: state.reducerPallets.pallets,
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
