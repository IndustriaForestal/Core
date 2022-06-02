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
  const { trafficBoxes, user, plants, qualities } = props
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
      .getAll('traffic/boxes', 'GET_TRAFFIC_BOXES')
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('qualities', 'GET_QUALITIES')
      })

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`traffic/boxes`, 'CREATE_SAMPLE', newData)
            .then(() =>
              props.getAll('traffic/boxes', 'GET_TRAFFIC_BOXES')
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
              `traffic/boxes/${oldData.id}`,
              'UPDATE_SAMPLE',
              newData
            )
            .then(() =>
              props.getAll('traffic/boxes', 'GET_TRAFFIC_BOXES')
            )
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`traffic/boxes/${oldData.id}`, 'DELETE_SAMPLE')
            .then(() =>
              props.getAll('traffic/boxes', 'GET_TRAFFIC_BOXES')
            )
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (trafficBoxes && plants && qualities) {
    const lookupPlants = {}
    const lookupQualities = {}
    plants.map(item => (lookupPlants[item.id] = item.name))
    qualities.map(item => (lookupQualities[item.id] = item.name))

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Alto', field: 'heigh' },
            { title: 'Ancho', field: 'width' },
            { title: 'Largo', field: 'length' },
            {
              title: 'Planta',
              field: 'plant_id',
              lookup: lookupPlants,
            },
            {
              title: 'Calidad',
              field: 'quality_id',
              lookup: lookupQualities,
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
          data={trafficBoxes}
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
    trafficBoxes: state.reducerTraffic.trafficBoxes,
    qualities: state.reducerQualities.qualities,
    plants: state.reducerZones.plants,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Samples)
