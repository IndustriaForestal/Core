import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { setTitle, getAll, deleted, cleanStock } from '../../../actions/app'
import './styles.scss'
import MaterialTable from 'material-table'
import { cmToIn } from '../../../utils'

const Nails = props => {
  const { stock, setTitle, units, user, workstations, zones, plants } = props
  const [workstation, setWorkstation] = useState(0)
  const [plant, setPlant] = useState(0)
  const [zone, setZone] = useState(0)
  useEffect(() => {
    if (user.role === 'Administrador') {
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
    }

    props
      .getAll('stock/items', 'GET_STOCK')
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

  const location = useLocation()

  if (
    user.accessScreen.find(s => `/${s.pathname}` === location.pathname) !==
      undefined ||
    user.role === 'Administrador'
  ) {
    if (stock && workstations && zones && plants) {
      const stockItems = stock
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
              { title: 'Tipo', field: 'item_type_name' },
              { title: 'Especie', field: 'wood_name' },
              { title: 'Alto', field: 'height' },
              { title: 'Largo', field: 'length' },
              { title: 'Ancho', field: 'width' },
              { title: 'Seco', field: 'dry' },
              { title: 'Humeda', field: 'damp' },

              {
                title: 'Total',
                field: 'total',
                render: rowData => rowData.dry + rowData.damp + rowData.repair,
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
            data={stockItems}
            title="Madera Habilitada"
            options={{
              exportButton: true,
            }}
          />
        </>
      )
    } else {
      return <h1>Cargando</h1>
    }
  } else {
    return (
      <h1>
        Error 401, No tiene acceso a esta pantalla, contacte a su supervisor
      </h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    stock: state.reducerStock.stock,
    role: state.reducerApp.role,
    units: state.reducerApp.units,
    user: state.reducerApp.user,
    workstations: state.reducerZones.workstations,
    zones: state.reducerZones.zones,
    plants: state.reducerZones.plants,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  cleanStock,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
