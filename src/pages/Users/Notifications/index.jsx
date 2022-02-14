import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../../actions/app'
import Loading from '../../../components/Loading/Loading'

import MaterialTable from 'material-table'

const Complements = props => {
  const { screens, roles, userPathname, notificationsRoles, notificationsUsers } =
    props
  useEffect(() => {
    props
      .getAll('users/screens', 'GET_SCREENS')
      .then(() => {
        props.getAll('users/roles', 'GET_ROLES')
      })
      .then(() => {
        props.getAll('users/notifications', 'GET_NOTIFICATIONS_ROLES')
      })
    // eslint-disable-next-line
  }, [])

  if (screens && roles && userPathname && notificationsRoles) {
    const lookupRoles = {}
    const lookupScreens = {}
    roles.map(item => (lookupRoles[item.id] = item.name))
    userPathname.map(item => (lookupScreens[item.pathname] = item.name))

    console.log(lookupRoles)

    const editable = {
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            props
              .create('users/notifications', 'CREATE', newData)
              .then(() => props.getAll('users/notifications', 'GET_NOTIFICATIONS_ROLES'))
              .then(() => resolve())
          }, 1000)
        }),

      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            props
              .deleted(
                `users/notifications/${oldData.id}`,
                'DELETE'
              )
              .then(() => props.getAll('users/notifications', 'GET_NOTIFICATIONS_ROLES'))
              .then(() => resolve())
          }, 1000)
        }),
    }

    return (
      <MaterialTable
        title="Notificaciones por usuario"
        columns={[
          { title: 'Rol', field: 'rol_id', lookup: lookupRoles },
          { title: 'Notificaciones', field: 'notification',  lookup: notificationsUsers },
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
        data={notificationsRoles}
        editable={editable}
      />
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    screens: state.reducerUsers.screens,
    roles: state.reducerUsers.roles,
    userPathname: state.reducerUsers.userPathname,
    notificationsRoles: state.reducerUsers.notificationsRoles,
    notificationsUsers: state.reducerUsers.notificationsUsers,
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
