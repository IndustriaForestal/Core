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

const Samples = props => {
  const { trafficFuel, user } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Combustibles',
      menu: {
        'Trafico': '/traffic',
        'Tipos camiones': '/traffic-types',
        'Combustibles': '/traffic-fuel',
        'Cajas': '/traffic-boxes',
        'Choferes': '/traffic-drivers',
        'Camiones': '/traffic-trucks',
        'Cajas camiones': '/traffic-trucks-boxes',
      },
    }
    props.setTitle(topbar)
    props.getAll('traffic/fuel', 'GET_TRAFFIC_FUEL')

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`traffic/fuel`, 'CREATE_SAMPLE', newData)
            .then(() => props.getAll('traffic/fuel', 'GET_TRAFFIC_FUEL'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          delete newData.id
          newData.user_id = userId
          props
            .update(`traffic/fuel/${oldData.id}`, 'UPDATE_SAMPLE', newData)
            .then(() => props.getAll('traffic/fuel', 'GET_TRAFFIC_FUEL'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`traffic/fuel/${oldData.id}`, 'DELETE_SAMPLE')
            .then(() => props.getAll('traffic/fuel', 'GET_TRAFFIC_FUEL'))
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (trafficFuel) {
    return (
      <>
        <MaterialTable
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
          data={trafficFuel}
          editable={editable}
          title="Combustibles"
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
    trafficFuel: state.reducerTraffic.trafficFuel,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Samples)
