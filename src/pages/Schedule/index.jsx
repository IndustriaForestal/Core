import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import MaterialTable from 'material-table'
import moment from 'moment'

const Processes = props => {
  const { setTitle, schedule, scheduleHolidays, scheduleConfig } = props
  useEffect(() => {
    const topbar = {
      title: 'Procesos',
      menu: {
        Horarios: '/schedule',
      },
    }
    setTitle(topbar)
    props
      .getAll('schedule', 'GET_SCHEDULE')
      .then(() => {
        props.getAll('schedule/holidays', 'GET_SCHEDULE_HOLIDAYS')
      })
      .then(() => {
        props.getAll('schedule/config', 'GET_SCHEDULE_CONFIG')
      })
    // eslint-disable-next-line
  }, [])

  if (schedule && scheduleHolidays && scheduleConfig) {
    const editable = {
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(oldData, newData)

            props
              .update(`schedule/${oldData.id}`, 'UPDATE_FELIN', newData)
              .then(() => props.getAll('schedule', 'GET_SCHEDULE'))
              .then(() => resolve())
          }, 1000)
        }),
    }

    const editable2 = {
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            props
              .create('schedule', 'CREATE_FELIN', newData)
              .then(() => props.getAll('schedule/holidays', 'GET_SCHEDULE_HOLIDAYS'))
              .then(() => resolve())
          }, 1000)
        }),
      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            props
              .deleted(`schedule/${oldData.id}`, 'DELETE_FELIN')
              .then(() => props.getAll('schedule/holidays', 'GET_SCHEDULE_HOLIDAYS'))
              .then(() => resolve())
          }, 1000)
        }),
    }

    return (
      <>
        <MaterialTable
          title="Horaios"
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Porcentaje', field: 'amount' },
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
          data={schedule}
          editable={editable}
        />
        <MaterialTable
          title="Días Festivos"
          columns={[
            { title: 'Día', field: 'day' },
            { title: 'Porcentaje', field: 'amount' },
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
          data={scheduleHolidays.map(d => {
            return ({
              ...d,
              day: moment(d.day).format('DD-MM-YYYY'),
            })
          })}
          editable={editable2}
        />
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    schedule: state.reducerSchedule.schedule,
    scheduleHolidays: state.reducerSchedule.scheduleHolidays,
    scheduleConfig: state.reducerSchedule.scheduleConfig,
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
