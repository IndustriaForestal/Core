import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../actions/app'

import MaterialTable from 'material-table'

const TypeMaterial = props => {
  const { wood, setTitle, user } = props
  const userId = user.id
  
  useEffect(() => {
    const topbar = {
      title: 'Especie de Madera',
      menu: { 'Especie de Madera': '/wood' },
    }
    setTitle(topbar)
    props.getAll('wood', 'GET_WOOD')
    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`wood`, 'CREATE_WOOD', newData)
            .then(() => props.getAll('wood', 'GET_WOOD'))
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
            .update(`wood/${oldData.id}`, 'UPDATE_WOOD', newData)
            .then(() => props.getAll('wood', 'GET_WOOD'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`wood/${oldData.id}`, 'DELETE_WOOD')
            .then(() => props.getAll('wood', 'GET_WOOD'))
            .then(() => resolve())
        }, 1000)
      }),
  }
  return (
    <>
      <MaterialTable
        columns={[
          { title: 'Nombre', field: 'name' },
          {
            title: 'Calidad',
            field: 'quality_id',
            lookup: { 1: 'A', 2: 'B', 3: 'C' },
          },
          {
            title: '% de contracción',
            field: 'contraction',
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
        data={wood}
        title="Especie de madera"
        editable={editable}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    wood: state.reducerWood.wood,
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
