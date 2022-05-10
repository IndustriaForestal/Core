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
  const { stock, setTitle, units, workstations, zones, plants } =
    props
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
      .getAll('stock/raws', 'GET_STOCK')
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
    const data = stock
      .filter(s => s.m3 > 0)
      .map(item => {
        if (units) {
          return {
            ...item,
            m3: `${cmToFbm(item.m3)} fbm`,
          }
        } else {
          return {
            ...item,
            m3: `${(item.m3 * 10).toFixed(2)} m3`,
          }
        }
      })

    return (
      <>
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
    units: state.reducerApp.units,
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

export default connect(mapStateToProps, mapDispatchToProps)(StockSwan)
