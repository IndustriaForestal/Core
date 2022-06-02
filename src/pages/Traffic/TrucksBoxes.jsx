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
  const { trafficTrucks, user, trafficBoxes, trafficTrucksBoxes } =
    props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Cajas a Camiones',
      menu: {
        Trafico: '/traffic',
        'Tipos camiones': '/traffic-types',
        Combustibles: '/traffic-fuel',
        Cajas: '/traffic-boxes',
        Choferes: '/traffic-drivers',
        Camiones: '/traffic-trucks',
        'Cajas camiones': '/traffic-trucks-boxes',
      },
    }
    props.setTitle(topbar)
    props
      .getAll('traffic/trucksBoxes', 'GET_TRAFFIC_TRUCKS_BOXES')
      .then(() => {
        props.getAll('traffic/boxes', 'GET_TRAFFIC_BOXES')
      })
      .then(() => {
        props.getAll('traffic/trucks', 'GET_TRAFFIC_TRUCKS')
      })

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`traffic/trucksBoxes`, 'CREATE_SAMPLE', newData)
            .then(() =>
              props.getAll(
                'traffic/trucksBoxes',
                'GET_TRAFFIC_TRUCKS_BOXES'
              )
            )
            .then(() => resolve())
        }, 1000)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          delete newData.id
          newData.user_id = userId
          props
            .update(
              `traffic/trucksBoxes/${oldData.id}`,
              'UPDATE_SAMPLE',
              newData
            )
            .then(() =>
              props.getAll(
                'traffic/trucksBoxes',
                'GET_TRAFFIC_TRUCKS_BOXES'
              )
            )
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(
              `traffic/trucksBoxes/${oldData.id}`,
              'DELETE_SAMPLE'
            )
            .then(() =>
              props.getAll(
                'traffic/trucksBoxes',
                'GET_TRAFFIC_TRUCKS_BOXES'
              )
            )
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (trafficTrucks && trafficBoxes && trafficTrucksBoxes) {
    const lookupTrucks = {}
    const lookupBoxes = {}

    trafficTrucks.map(item => (lookupTrucks[item.id] = item.model))
    trafficBoxes.map(item => (lookupBoxes[item.id] = item.name))

    return (
      <>
        <MaterialTable
          columns={[
            {
              title: 'Camion',
              field: 'truck_id',
              lookup: lookupTrucks,
            },
            {
              title: 'Caja',
              field: 'box_id',
              lookup: lookupBoxes,
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
          data={trafficTrucksBoxes}
          editable={editable}
          title="Cajas a Camiones"
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
    trafficTrucks: state.reducerTraffic.trafficTrucks,
    trafficBoxes: state.reducerTraffic.trafficBoxes,
    trafficTrucksBoxes: state.reducerTraffic.trafficTrucksBoxes,

    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Samples)
