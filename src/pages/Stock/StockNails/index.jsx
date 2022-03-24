import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted } from '../../../actions/app'
import './styles.scss'
import MaterialTable from 'material-table'

const Nails = props => {
  const { stock, setTitle, workstations, zones, plants } = props
  const [workstation, setWorkstation] = useState(0)
  const [plant, setPlant] = useState(0)
  const [zone, setZone] = useState(0)
  useEffect(() => {
    const topbar = {
      title: 'Inventarios Generales',
      menu: {
        Tarimas: '/stock',
        Complementos: '/stockNails',
        'Madera Habilitada': '/stockItems',
        'Madera Aserrada': '/stockSawn',
        'Materia Prima': '/stockMaterial',
        'Entradas y salidas': '/stockChanges',
        Historial: '/stockHistory',
      },
    }

    setTitle(topbar)
    props
      .getAll('stock/complements', 'GET_STOCK')
      .then(() => {
        props.getAll('zones/workstations', 'GET_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('zones/zones', 'GET_ZONES')
      })
    // eslint-disable-next-line
  }, [])

  if (stock && workstations && zones && plants) {
    return (
      <>
        <div>
          <label htmlFor="filter">
            Filtrar Planta
            <select
              name="filter"
              onChange={e => setPlant(parseInt(e.target.value))}
            >
              <option value="0">Todas</option>
              {plants.map(o => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="filter">
            Filtrar Zona
            <select
              name="filter"
              onChange={e => setZone(parseInt(e.target.value))}
            >
              <option value="0">Todas</option>
              {zones
                .filter(o =>
                  plant !== 0 ? parseInt(o.plant_id) === parseInt(plant) : o
                )
                .map(o => (
                  <option key={o.id} value={o.id}>
                    {
                      plants.find(p => parseInt(p.id) === parseInt(o.plant_id))
                        .name
                    }{' '}
                    {o.name}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="filter">
            Filtrar Zona de trabajo
            <select
              name="filter"
              onChange={e => setWorkstation(parseInt(e.target.value))}
            >
              <option value="0">Todas</option>
              {workstations
                .filter(o =>
                  zone !== 0 ? parseInt(o.zone_id) === parseInt(zone) : o
                )
                .map(o => (
                  <option key={o.id} value={o.id}>
                    {o.workstation}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <MaterialTable
          columns={[
            { title: 'id', field: 'id' },
            { title: 'Nombre', field: 'name' },
            {
              title: 'Total',
              field: 'total',
              render: rowData => rowData.stock,
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
          }}
          data={stock}
          title="Inventario Clavos"
          options={{
            exportButton: true,
          }}
        />
      </>
    )
  } else {
    return <h1>Cargando</h1>
  }
}

const mapStateToProps = state => {
  return {
    stock: state.reducerStock.stock,
    role: state.reducerApp.role,
    workstations: state.reducerZones.workstations,
    zones: state.reducerZones.zones,
    plants: state.reducerZones.plants,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
