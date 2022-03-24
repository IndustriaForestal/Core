import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../actions/app'

import MaterialTable from 'material-table'

const TypeMaterial = props => {
  const { colors, setTitle, user } = props
  const userId = user.id

  useEffect(() => {
    const topbar = {
      title: 'Colores',
      menu: { Colores: '/colors' },
    }
    setTitle(topbar)
    props.getAll('colors', 'GET_COLORS')
    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`colors`, 'CREATE_COLOR', newData)
            .then(() => props.getAll('colors', 'GET_COLORS'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          delete newData.id
          newData.user_id = userId
          props
            .update(`colors/${oldData.id}`, 'UPDATE_COLOR', newData)
            .then(() => props.getAll('colors', 'GET_COLORS'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`colors/${oldData.id}`, 'DELETE_COLOR')
            .then(() => props.getAll('colors', 'GET_COLORS'))
            .then(() => resolve())
        }, 1000)
      }),
  }
  return (
    <>
      <MaterialTable
        columns={[
          { title: 'Nombre', field: 'name' },
          { title: 'Hex', field: 'hex' },
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
        data={colors}
        title="Colores"
        editable={editable}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    colors: state.reducerColors.colors,
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

export default connect(mapStateToProps, mapDispatchToProps)(TypeMaterial)
