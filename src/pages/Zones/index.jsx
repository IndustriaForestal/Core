import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted } from '../../actions/app'
import './styles.scss'

import MaterialTable from 'material-table'

const Zones = props => {
  const { setTitle, zones, subzones, plants } = props

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
    setTitle(topbar)
    props
      .getAll('zones/plants', 'GET_PLANTS')
      .then(() => {
        props.getAll('zones/zones', 'GET_ZONES')
      })
      .then(() => {
        props.getAll('zones/subzones', 'GET_SUBZONES')
      })
    // eslint-disable-next-line
  }, [])

  if (zones && subzones && plants) {
    const zonesCompleted = subzones.map(sz => {
      const zone = zones.find(
        zone => parseInt(zone.id) === parseInt(sz.zone_id)
      )

      const plant = plants.find(
        plant => parseInt(plant.id) === parseInt(zone.plant_id)
      )

      return {
        ...sz,
        zone_id: zone.id,
        zone_name: zone.name,
        plant_id: plant.id,
        plant_name: plant.name,
      }
    })

    return (
      <MaterialTable
        columns={[
          { title: 'Planta', field: 'plant_name' },
          { title: 'Zona', field: 'zone_name' },
          { title: 'Sub-Zon ID', field: 'id' },
          { title: 'Alto m', field: 'height' },
          { title: 'Largo m', field: 'length' },
          { title: 'Ancho m', field: 'width' },
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
        }}
        data={zonesCompleted}
        title="Zonas"
      />
    )
  } else {
    return <h1>Cargando</h1>
  }
}

const mapStateToProps = state => {
  return {
    zones: state.reducerZones.zones,
    plants: state.reducerZones.plants,
    subzones: state.reducerZones.subzones,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Zones)
