import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setTitle, setWraper, getAll, deleted } from '../../actions/app'
import './styles.scss'
import Loading from '../../components/Loading/Loading'
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
    setWraper(true)
    props
      .getAll('stock', 'GET_STOCK')
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
            { title: 'Model', field: 'model' },
            { title: 'Seco', field: 'dry' },
            { title: 'Humeda', field: 'damp' },
            { title: 'Reaparación', field: 'repair' },
            { title: 'Stock de Seguridad', field: 'stock' },
            {
              title: 'Total',
              field: 'total',
              render: rowData =>
                rowData.dry + rowData.damp + rowData.repair + rowData.stock,
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
          options={{ exportButton: true, exportAllData: true }}
          data={stock}
          title="Inventario Tarimas"
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
    workstations: state.reducerZones.workstations,
    zones: state.reducerZones.zones,
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
