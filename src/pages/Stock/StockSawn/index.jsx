import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  getAll,
  deleted,
  cleanStock,
} from '../../../actions/app'
import MaterialTable from 'material-table'
import { cmToIn } from '../../../utils'

const StockSwan = props => {
  const {
    stockSawn,
    stockZoneSawn,
    setTitle,
    units,
    workstations,
    zones,
    plants,
    subzones,
    materialState,
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
      .getAll('stock/sawn', 'GET_STOCK_SAWN')
      .then(() => {
        props.getAll('stock/stock_zones/sawn', 'GET_SZ_SAWN')
      })
      .then(() => {
        props.getAll('zones/workstations', 'GET_WORKSTATIONS')
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
      .then(() => {
        props.getAll('material/state', 'GET_MATERIAL_STATE')
      })
    // eslint-disable-next-line
  }, [])

  if (
    stockSawn &&
    stockZoneSawn &&
    workstations &&
    zones &&
    plants &&
    subzones &&
    materialState
  ) {
    const stockItems = stockSawn
      .filter(item => item.item_type_id !== 4)
      .map(item => {
        if (units) {
          return {
            ...item,
            length: `${cmToIn(item.length).toFixed(3)} in`,
            height: `${cmToIn(item.height).toFixed(3)} in`,
            width: `${cmToIn(item.width).toFixed(3)} in`,
          }
        } else {
          return {
            ...item,
            length: `${item.length.toFixed(3)} cm`,
            height: `${item.height.toFixed(3)} cm`,
            width: `${item.width.toFixed(3)} cm`,
          }
        }
      })

    const stockZonesFull = stockZoneSawn.map(item => {
      const zoneId = subzones.find(z => z.id === item.zone_id).zone_id
      const zone = zones.find(z => z.id === zoneId)
      const plant = plants.find(p => p.id === parseInt(zone.plant_id))
      return {
        ...item,
        zone: zone.name,
        plant: plant.name,
        plant_id: plant.id,
        zone_ID: zone.id,
        state:
          item.state === 'dry'
            ? 'Seca'
            : item.state === 'damp'
            ? 'Húmeda'
            : '',
      }
    })

    const data = stockItems
      .filter(item => {
        const existence = stockZonesFull.filter(
          o =>
            parseInt(o.sawn_id) === parseInt(item.id) &&
            parseInt(o.plant_id) === plant
        )
        if (plant !== 0) {
          return existence.length > 0
        } else {
          return item
        }
      })
      .filter(item => {
        const existence = stockZonesFull.filter(
          o =>
            parseInt(o.sawn_id) === parseInt(item.id) &&
            parseInt(o.zone_ID) === zone
        )
        if (zone !== 0) {
          return existence.length > 0
        } else {
          return item
        }
      })
      .map(item => {
        const existence = stockZonesFull.filter(
          o => parseInt(o.sawn_id) === parseInt(item.id)
        )

        const totalStock = existence.reduce((a, b) => {
          return a + b.amount
        }, 0)

        return { ...item, existence, totalStock }
      })

    const lookupMaterialState = {}
    materialState.map(
      item => (lookupMaterialState[item.state] = item.name)
    )

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
          <label htmlFor="filter">
            Filtrar Zona de trabajo
            <select
              name="filter"
              onChange={e => setWorkstation(parseInt(e.target.value))}
            >
              <option value="0">Todas</option>
              {workstations
                .filter(o =>
                  zone !== 0
                    ? parseInt(o.zone_id) === parseInt(zone)
                    : o
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
            { title: 'Especie', field: 'name' },
            { title: 'Alto', field: 'height' },
            { title: 'Largo', field: 'length' },
            { title: 'Ancho', field: 'width' },
            {
              title: 'Estado',
              field: 'state',
              lookup: lookupMaterialState,
            },
            { title: 'Cantidad', field: 'stock' },
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
          title="Madera Habilitada"
          options={{
            exportButton: true,
            exportAllData: true,
            pageSize: 50,
            pageSizeOptions: [50, 100, 150],
            emptyRowsWhenPaging: false,
          }}
          detailPanel={rowData => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Planta</th>
                      <th>Zona</th>
                      <th>Sub zona</th>
                      <th>Cantidad</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowData.existence.length > 0 ? (
                      rowData.existence.map(o => (
                        <tr>
                          <td>{o.plant}</td>
                          <td>{o.zone}</td>
                          <td>{o.zone_id}</td>
                          <td>{o.amount}</td>
                          <td>{o.state}</td>
                        </tr>
                      ))
                    ) : (
                      <div>
                        <h3>Sin Existencias</h3>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            )
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
    stockSawn: state.reducerStock.stockSawn,
    stockZoneSawn: state.reducerStock.stockZoneSawn,
    role: state.reducerApp.role,
    units: state.reducerApp.units,
    workstations: state.reducerZones.workstations,
    zones: state.reducerZones.zones,
    plants: state.reducerZones.plants,
    subzones: state.reducerZones.subzones,
    materialState: state.reducerMaterial.materialState,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  cleanStock,
}

export default connect(mapStateToProps, mapDispatchToProps)(StockSwan)
