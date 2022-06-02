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
  const { trafficDrivers, user, plants, trafficTypes } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Cajas',
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
      .getAll('traffic/drivers', 'GET_TRAFFIC_DRIVERS')
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('traffic/types', 'GET_TRAFFIC_TYPES')
      })

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`traffic/drivers`, 'CREATE_SAMPLE', newData)
            .then(() =>
              props.getAll('traffic/drivers', 'GET_TRAFFIC_DRIVERS')
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
              `traffic/drivers/${oldData.id}`,
              'UPDATE_SAMPLE',
              newData
            )
            .then(() =>
              props.getAll('traffic/drivers', 'GET_TRAFFIC_DRIVERS')
            )
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`traffic/drivers/${oldData.id}`, 'DELETE_SAMPLE')
            .then(() =>
              props.getAll('traffic/drivers', 'GET_TRAFFIC_DRIVERS')
            )
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (trafficDrivers && plants && trafficTypes) {
    const lookupPlants = {}
    const lookupTypes = {}
    plants.map(item => (lookupPlants[item.id] = item.name))
    trafficTypes.map(item => (lookupTypes[item.id] = item.name))

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Licencia', field: 'license' },
            { title: 'Expiración', field: 'license_date' },
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
          data={trafficDrivers}
          editable={editable}
          title="Cajas"
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
    trafficDrivers: state.reducerTraffic.trafficDrivers,
    trafficTypes: state.reducerTraffic.trafficTypes,
    plants: state.reducerZones.plants,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Samples)
