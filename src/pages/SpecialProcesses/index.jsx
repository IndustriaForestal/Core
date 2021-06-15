import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import moment from 'moment'
import MaterialTable from 'material-table'
import './styles.scss'

const SpecialProcesses = props => {
  const { specialProcesses, setTitle } = props


  useEffect(() => {
    const topbar = {
      title: 'Requerimientos de calidad',
      menu: { 'Requerimientos de calidad': '/specialProcesses' },
    }
    setTitle(topbar)
    props.getAll('specialProcesses', 'GET_SPECIAL_PROCESSES')
    // eslint-disable-next-line
  }, [])
  if (specialProcesses) {
    const specialProcessesMaped = specialProcesses.map(specialProcess => {
      return {
        ...specialProcess,
        created: moment(specialProcess.created).format('YYYY-MM-DD HH:mm:ss'),
      }
    })

    return (
      <MaterialTable
        title="Requerimientos Calidad"
        columns={[
          { title: 'Nombre', field: 'name' },
          { title: 'Severidad', field: 'severity' },
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
        data={specialProcessesMaped}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.user_id = 1
                props
                  .create('specialProcesses', 'CREATE_SPECIAL_PROCESS', newData)
                  .then(() =>
                    props.getAll('specialProcesses', 'GET_SPECIAL_PROCESSES')
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
                    `specialProcesses/${oldData.id}`,
                    'UPDATE_SPECIAL_PROCESS',
                    newData
                  )
                  .then(() =>
                    props.getAll('specialProcesses', 'GET_SPECIAL_PROCESSES')
                  )
                  .then(() => resolve())
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                props
                  .deleted(
                    `specialProcesses/${oldData.id}`,
                    'DELETE_SPECIAL_PROCESS'
                  )
                  .then(() =>
                    props.getAll('specialProcesses', 'GET_SPECIAL_PROCESSES')
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
    specialProcesses: state.reducerSpecialProcesses.specialProcesses,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  create,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialProcesses)
