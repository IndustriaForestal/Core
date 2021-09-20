import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import './styles.scss'
import MaterialTable from 'material-table'

const Complements = props => {
  const { complements, setTitle, user } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Complementos',
      menu: {
        Complementos: '/complements',
      },
    }
    setTitle(topbar)
    props.getAll('complements', 'GET_COMPLEMENTS')
    // eslint-disable-next-line
  }, [])

  if (complements) {
    const editable = {
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            newData.user_id = userId
            props
              .create('complements', 'CREATE_COMPLEMENTS', newData)
              .then(() => props.getAll('complements', 'GET_COMPLEMENTS'))
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
                `complements/${oldData.id}`,
                'UPDATE_COMPLEMENTS',
                newData
              )
              .then(() => props.getAll('complements', 'GET_COMPLEMENTS'))
              .then(() => resolve())
          }, 1000)
        }),
      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            props
              .deleted(`complements/${oldData.id}`, 'DELETE_COMPLEMENTS')
              .then(() => props.getAll('complements', 'GET_COMPLEMENTS'))
              .then(() => resolve())
          }, 1000)
        }),
    }

    return (
      <MaterialTable
        title="Complementos"
        columns={[{ title: 'Nombre', field: 'name' }]}
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
        data={complements}
        editable={editable}
      />
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    complements: state.reducerComplements.complements,
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

export default connect(mapStateToProps, mapDispatchToProps)(Complements)
