import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../actions/app'
import Swal from 'sweetalert2'
import AddButton from '../../components/AddButton/AddButton'
import './styles.scss'

import MaterialTable from 'material-table'

const Customers = props => {
  const { setTitle, role, zones, subzones, plants } = props

  useEffect(() => {
    const topbar = {
      title: 'Zonas',
      menu: {
        Zonas: '/zones',
        'Crear Planta': '/zones/createPlant',
        'Crear Zona': '/zones/createZone',
        'Crear Sub-Zona': '/zones/createSubzone',
      },
    }
    setTitle(topbar)
    props
      .getAll('customers', 'GET_CUSTOMERS')
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('zones/zones', 'GET_ZONES')
      })
      .then(() => {
        props.getAll('zones/subzones', 'GET_SUBZONES')
      })
    // eslint-disable-next-line
  }, [])

  let tableHeader
  role === 'Administrador'
    ? (tableHeader = [
        'Nombre',
        'Dirección',
        'Email',
        'Teléfono',
        'Embarques Semana',
        'Acciones',
      ])
    : (tableHeader = [
        'Nombre',
        'Dirección',
        'Email',
        'Teléfono',
        'Embarques Semana',
      ])

  if (zones && subzones && plants) {
    const zonesCompleted = subzones.map(sz => {
      const zone = zones.find(
        zone => parseInt(zone.id) === parseInt(sz.zone_id)
      )
      console.log(zone)
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

    console.log(zonesCompleted)

    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Planta', field: 'plant_name' },
            { title: 'Zona', field: 'zone_name' },
            { title: 'Sub-Zon ID', field: 'id' },
            { title: 'Alto', field: 'height' },
            { title: 'Largo', field: 'length' },
            { title: 'Ancho', field: 'width' },
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
        <Link to="/zones/createZone">
          <AddButton>
            <BsPlus />
          </AddButton>
        </Link>
      </>
    )
  } else {
    return <h1>Cargando</h1>
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers,
    zones: state.zones,
    plants: state.plants,
    subzones: state.subzones,
    role: state.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers)