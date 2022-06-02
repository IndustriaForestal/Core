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
  const { trafficTrucks, user, plants, trafficTypes, trafficFuel } =
    props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Camiones',
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
      .getAll('traffic/trucks', 'GET_TRAFFIC_TRUCKS')
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('traffic/types', 'GET_TRAFFIC_TYPES')
      })
      .then(() => {
        props.getAll('traffic/fuel', 'GET_TRAFFIC_FUEL')
      })

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`traffic/trucks`, 'CREATE_SAMPLE', newData)
            .then(() =>
              props.getAll('traffic/trucks', 'GET_TRAFFIC_TRUCKS')
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
              `traffic/trucks/${oldData.id}`,
              'UPDATE_SAMPLE',
              newData
            )
            .then(() =>
              props.getAll('traffic/trucks', 'GET_TRAFFIC_TRUCKS')
            )
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`traffic/trucks/${oldData.id}`, 'DELETE_SAMPLE')
            .then(() =>
              props.getAll('traffic/trucks', 'GET_TRAFFIC_TRUCKS')
            )
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (trafficTrucks && plants && trafficTypes && trafficFuel) {
    const lookupPlants = {}
    const lookupTypes = {}
    const lookupFuel = {}

    plants.map(item => (lookupPlants[item.id] = item.name))
    trafficTypes.map(item => (lookupTypes[item.id] = item.name))
    trafficFuel.map(item => (lookupFuel[item.id] = item.name))

    console.log(lookupFuel, lookupTypes, lookupPlants)

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Modelo', field: 'model' },
            { title: 'Placa', field: 'plate' },
            { title: 'Verificación', field: 'checks' },
            { title: 'Seguro', field: 'insurance' },
            {
              title: 'Tarjeta circulación',
              field: 'card',
              type: 'file',
            },
            {
              title: 'Planta',
              field: 'plant_id',
              lookup: lookupPlants,
            },
            {
              title: 'Tipo Camión',
              field: 'type_id',
              lookup: lookupTypes,
            },
            {
              title: 'Combustible',
              field: 'fuel_id',
              lookup: lookupFuel,
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
          data={trafficTrucks}
          editable={editable}
          title="Camiones"
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
    trafficTypes: state.reducerTraffic.trafficTypes,
    trafficFuel: state.reducerTraffic.trafficFuel,
    plants: state.reducerZones.plants,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Samples)
