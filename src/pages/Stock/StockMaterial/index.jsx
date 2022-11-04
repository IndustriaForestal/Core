import React, { useEffect, useState } from 'react'
import { cmToFbm } from '../../../utils'
import { connect } from 'react-redux'
import {
  setTitle,
  getAll,
  deleted,
  cleanStock,
} from '../../../actions/app'
import MaterialTable from 'material-table'

const StockSwan = props => {
  const {
    stockRaws,
    stockZoneRaws,
    setTitle,
    units,
    workstations,
    zones,
    plants,
    subzones,
  } = props
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
        Reporte: '/stock/report',
      },
    }

    setTitle(topbar)
    props
      .getAll('stock/raws', 'GET_STOCK_RAWS')
      .then(() => {
        props.getAll('zones/workstations', 'GET_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('stock/stock_zones/raws', 'GET_SZ_RAWS')
      })
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

  if (
    stockRaws &&
    workstations &&
    zones &&
    plants &&
    subzones &&
    stockZoneRaws
  ) {
    const stockItemsD = stockRaws
      .filter(s => s.m3 > 0)
      .map(item => {
        const zoneId = subzones.find(
          z => z.id === item.zone_id
        ).zone_id
        const zone = zones.find(z => z.id === zoneId)
        const plant = plants.find(
          p => p.id === parseInt(zone.plant_id)
        )
        if (units) {
          return {
            ...item,
            zone: zone.name,
            plant: plant.name,
            plant_id: plant.id,
            zone_ID: zone.id,
            m3: `${cmToFbm(item.m3)} fbm`,
          }
        } else {
          return {
            ...item,
            zone: zone.name,
            plant: plant.name,
            plant_id: plant.id,
            zone_ID: zone.id,
            m3: `${(item.m3 * 10).toFixed(2)} m3`,
          }
        }
      })

    const data = stockItemsD
      .filter(item => {
        if (plant !== 0) {
          return parseInt(item.plant_id) === plant
        } else {
          return item
        }
      })
      .filter(item => {
        if (zone !== 0) {
          return parseInt(item.zone_ID) === zone
        } else {
          return item
        }
      })

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
                  plant !== 0
                    ? parseInt(o.plant_id) === parseInt(plant)
                    : o
                )
                .map(o => (
                  <option key={o.id} value={o.id}>
                    {
                      plants.find(
                        p => parseInt(p.id) === parseInt(o.plant_id)
                      ).name
                    }{' '}
                    {o.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <MaterialTable
          columns={[
            { title: 'id', field: 'id' },
            { title: 'Volumen', field: 'm3' },
            { title: 'Especie', field: 'name' },
            {
              title: 'Estado',
              field: 'state',
              lookup: { damp: 'Humedo / Verde', dry: 'Seca' },
            },
            { title: 'Zona', field: 'zone_id' },
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
          data={data}
          title="Materia Prima"
          options={{
            exportButton: true,
            exportAllData: true,
            pageSize: 50,
            pageSizeOptions: [50, 100, 150],
            emptyRowsWhenPaging: false,
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
    stockRaws: state.reducerStock.stockRaws,
    stockZoneRaws: state.reducerStock.stockZoneRaws,
    role: state.reducerApp.role,
    units: state.reducerApp.units,
    workstations: state.reducerZones.workstations,
    zones: state.reducerZones.zones,
    plants: state.reducerZones.plants,
    subzones: state.reducerZones.subzones,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  cleanStock,
}

export default connect(mapStateToProps, mapDispatchToProps)(StockSwan)
