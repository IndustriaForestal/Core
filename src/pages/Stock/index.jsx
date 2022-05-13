import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  setWraper,
  getAll,
  deleted,
} from '../../actions/app'
import './styles.scss'
import Loading from '../../components/Loading/Loading'
import MaterialTable from 'material-table'

const Nails = props => {
  const {
    stock,
    setTitle,
    workstations,
    zones,
    plants,
    stockZone,
    subzones,
    stockHistory,
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
      },
    }

    setTitle(topbar)
    setWraper(true)
    props
      .getAll('stock', 'GET_STOCK')
      .then(() => {
        props.getAll('stock/stock_zones', 'GET_SZ')
      })
      .then(() => {
        props.getAll('stock/stock_history/pallets', 'GET_SH')
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
    // eslint-disable-next-line
  }, [])
  if (
    stock &&
    workstations &&
    zones &&
    plants &&
    stockZone &&
    subzones &&
    stockHistory
  ) {
    const stockZonesFull = stockZone.map(item => {
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

    const data = stock
      .filter(item => {
        const existence = stockZonesFull.filter(
          o =>
            parseInt(o.pallet_id) === parseInt(item.id) &&
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
            parseInt(o.pallet_id) === parseInt(item.id) &&
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
          o => parseInt(o.pallet_id) === parseInt(item.id)
        )

        const totalStock = existence.reduce((a, b) => {
          return a + b.amount
        }, 0)

        return { ...item, existence, totalStock }
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
            { title: 'Model', field: 'model' },
            { title: 'Seco', field: 'dry' },
            { title: 'Humeda', field: 'damp' },
            { title: 'Reparación', field: 'repair' },
            { title: 'Recuperación', field: 'recovery' },
            { title: 'Stock de Seguridad', field: 'stock' },
            {
              title: 'Total',
              field: 'total',
              render: rowData =>
                rowData.dry +
                rowData.damp +
                rowData.repair +
                rowData.recovery +
                rowData.stock,
            },
            {
              title: 'Total Filtro',
              field: 'totalStock',
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
          options={{
            exportButton: true,
            exportAllData: true,
            pageSize: 50,
            pageSizeOptions: [50, 100, 150],
            emptyRowsWhenPaging: false,
          }}
          data={data}
          title="Inventario Tarimas"
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
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    stock: state.reducerStock.stock,
    role: state.reducerStock.role,
    stockHistory: state.reducerStock.stockHistory,
    stockZone: state.reducerStock.stockZone,
    workstations: state.reducerZones.workstations,
    zones: state.reducerZones.zones,
    subzones: state.reducerZones.subzones,
    plants: state.reducerZones.plants,
  }
}

const mapDispatchToProps = {
  setTitle,
  setWraper,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
