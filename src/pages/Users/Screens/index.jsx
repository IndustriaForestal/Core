import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../../actions/app'
import Loading from '../../../components/Loading/Loading'

import MaterialTable from 'material-table'

const Complements = props => {
  const { screens, roles, userPathname } = props
  useEffect(() => {
    props.getAll('users/screens', 'GET_SCREENS').then(() => {
      props.getAll('users/roles', 'GET_ROLES')
    })
    // eslint-disable-next-line
  }, [])

  if (screens && roles && userPathname) {
    const lookupRoles = {}
    const lookupScreens = {}
    roles.map(item => (lookupRoles[item.id] = item.name))
    userPathname.map(item => (lookupScreens[item.pathname] = item.name))

    const editable = {
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            props
              .create('users/screens', 'CREATE', newData)
              .then(() => props.getAll('users/screens', 'GET_SCREENS'))
              .then(() => resolve())
          }, 1000)
        }),

      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            props
              .deleted(
                `users/screens/${oldData.pathname}/${oldData.role_id}`,
                'DELETE'
              )
              .then(() => props.getAll('users/screens', 'GET_SCREENS'))
              .then(() => resolve())
          }, 1000)
        }),
    }

    return (
      <MaterialTable
        title="Pantallas por roles"
        columns={[
          { title: 'Rol', field: 'role_id', lookup: lookupRoles },
          { title: 'Url', field: 'pathname', lookup: lookupScreens },
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
        data={screens}
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
