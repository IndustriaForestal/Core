import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, create, update } from '../../actions/app'
import Loading from '../../components/Loading/Loading'

import './styles.scss'

import MaterialTable from 'material-table'

const Qualities = props => {
  const { qualities, setTitle, user } = props

  useEffect(() => {
    const topbar = {
      title: 'Calidades',
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
    props.getAll('qualities', 'GET_QUALITIES')

    // eslint-disable-next-line
  }, [])

  if (qualities) {
    const editable = {
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            newData.user_id = user.id
            props
              .create('qualities', 'CREATE_QUALITY', newData)
              .then(() => props.getAll('qualities', 'GET_QUALITIES'))
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
              .update(`qualities/${oldData.id}`, 'UPDATE_QUALITY', newData)
              .then(() => props.getAll('qualities', 'GET_QUALITIES'))
              .then(() => resolve())
          }, 1000)
        }),
    }

    return (
      <MaterialTable
        title="Calidades"
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
     
        data={qualities}
        editable={editable}
      />
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    qualities: state.reducerQualities.qualities,
    user: state.reducerApp.user,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  update,
  create,
}

export default connect(mapStateToProps, mapDispatchToProps)(Qualities)
