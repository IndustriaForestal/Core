import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAll, create, update, setTitle } from '../../../actions/app'

import MaterialTable from 'material-table'

const CreateCustomer = props => {
  const { workstations, zones, user, plants } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Zonas',
      menu: {
        Zonas: '/zones',
        'Crear Planta': '/zones/createPlant',
        'Crear Zona': '/zones/createZone',
        'Crear Sub-Zona': '/zones/createSubzone',
        'Crear Estación de Trabajo': '/zones/workstation',
      },
    }
    props.setTitle(topbar)
    props
      .getAll('zones/workstations', 'GET_WORKSTATIONS')
      .then(() => {
        props.getAll('zones/zones', 'GET_ZONES')
      })
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(
              `zones/workstations/${newData.zone_id}`,
              'CREATE_WORKSTATIONS',
              newData
            )
            .then(() => props.getAll('zones/workstations', 'GET_WORKSTATIONS'))
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
            .update(
              `zones/workstations/${oldData.id}`,
              'UPDATE_WORKSTATIONS',
              newData
            )
            .then(() => props.getAll('zones/workstations', 'GET_WORKSTATIONS'))
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (zones && workstations && plants) {
    const lookupZones = {}

    const zonesPlants = zones.map(zone => {
      return {
        ...zone,
        plant_name: plants.find(
          plant => parseInt(plant.id) === parseInt(zone.plant_id)
        ).name,
      }
    })

    zonesPlants.map(
      zone => (lookupZones[zone.id] = `${zone.plant_name} - ${zone.name}`)
    )

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Estación de trabajo', field: 'workstation' },
            { title: 'Capacidad hrs', field: 'capacity' },
            { title: 'Operadores', field: 'operators' },
            { title: 'Zona', field: 'zone_id', lookup: lookupZones },
            { title: 'Activa', field: 'active', lookup: { 0: 'No', 1: 'Si' } },
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
          data={workstations}
          editable={editable}
          title="Estaciones de trabajo"
        />
      </>
    )
  } else {
    return <h1>Cargando</h1>
  }
}

const mapDispatchToProps = {
  create,
  getAll,
  update,
  setTitle,
}

const mapStateToProps = state => {
  return {
    zones: state.reducerZones.zones,
    plants: state.reducerZones.plants,
    workstations: state.reducerZones.workstations,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer)
