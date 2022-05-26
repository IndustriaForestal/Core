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

const Reports = props => {
  const { reports, user } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Reportes',
      menu: {
        'Crear Reporte': '/reports-config',
        'Crear Parametro': '/reports-columns',
      },
    }
    props.setTitle(topbar)
    props.getAll('reports', 'GET_REPORTS')

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`reports`, 'CREATE_REPORT', newData)
            .then(() => props.getAll('reports', 'GET_REPORTS'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          delete newData.id
          newData.user_id = userId
          props
            .update(`reports/${oldData.id}`, 'UPDATE_REPORT', newData)
            .then(() => props.getAll('reports', 'GET_REPORTS'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`reports/${oldData.id}`, 'DELETE_REPORT')
            .then(() => props.getAll('reports', 'GET_REPORTS'))
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (reports) {
    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Query', field: 'query' },
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
          data={reports}
          editable={editable}
          title="Reportes"
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
    reports: state.reducerReports.reports,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
