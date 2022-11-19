import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  setTitle,
  setWraper,
  getAll,
  deleted,
  update,
  create,
} from '../../../actions/app'
import Loading from '../../../components/Loading/Loading'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import { CSVLink } from 'react-csv'

const Nails = props => {
  const { stockReport } = props

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
        'Reporte General': '/stock/report',
        'Reporte Tarimas': '/stock/report',
        'Reporte Madera Habilitada': '/stock/report',
      },
    }
    setTitle(topbar)
    setWraper(true)
    props.getAll('stock/reports/stock_full', 'GET_STOCK_REPORT')
    // eslint-disable-next-line
  }, [])

  let tableHeader = ['Especie de madera', 'Cubicación']
  let tableHeaderRaw = ['Especie de madera', 'Longitud', 'Cubicación']

  if (stockReport) {
    const dataIfisa1 = [
      {
        'Especie de madera': 'Tarima',
        Longitud: '',
        Cubicación: '',
      },
      ...stockReport.pallets
        .filter(p => p.plant_id === 1 || p.plant_id === null)
        .map(p => {
          return {
            'Especie de madera': p.wood_name,
            Longitud: '',
            Cubicación: p.m3.toFixed(3),
          }
        }),
      {
        'Especie de madera': 'Madera Habilitada',
        Longitud: '',
        Cubicación: '',
      },
      ...stockReport.items
        .filter(p => p.plant_id === 1 || p.plant_id === null)
        .map(p => {
          return {
            'Especie de madera': p.wood_name,
            Longitud: '',
            Cubicación: p.m3.toFixed(3),
          }
        }),
      {
        'Especie de madera': 'Trozo',
        Longitud: '',
        Cubicación: '',
      },
      ...stockReport.raws
        .filter(p => p.plant_id === 1 || p.plant_id === null)
        .map(p => {
          return {
            'Especie de madera': p.wood_name,
            Longitud: p.length,
            Cubicación: p.m3.toFixed(3),
          }
        }),
      {
        'Especie de madera': 'Leña',
        Longitud: '',
        Cubicación: '',
      },
      ...stockReport.firewood
        .filter(p => p.plant_id === 1 || p.plant_id === null)
        .map(p => {
          return {
            'Especie de madera': p.wood_name,
            Longitud: '',
            Cubicación: p.m3.toFixed(3),
          }
        }),
    ]

    const dataIfisa2 = [
      {
        'Especie de madera': 'Tarima',
        Longitud: '',
        Cubicación: '',
      },
      ...stockReport.pallets
        .filter(p => p.plant_id === 2 || p.plant_id === null)
        .map(p => {
          return {
            'Especie de madera': p.wood_name,
            Longitud: '',
            Cubicación: p.m3.toFixed(3),
          }
        }),
      {
        'Especie de madera': 'Madera Habilitada',
        Longitud: '',
        Cubicación: '',
      },
      ...stockReport.items
        .filter(p => p.plant_id === 2 || p.plant_id === null)
        .map(p => {
          return {
            'Especie de madera': p.wood_name,
            Longitud: '',
            Cubicación: p.m3.toFixed(3),
          }
        }),
      {
        'Especie de madera': 'Trozo',
        Longitud: '',
        Cubicación: '',
      },
      ...stockReport.raws
        .filter(p => p.plant_id === 2 || p.plant_id === null)
        .map(p => {
          return {
            'Especie de madera': p.wood_name,
            Longitud: p.length,
            Cubicación: p.m3.toFixed(3),
          }
        }),
      {
        'Especie de madera': 'Leña',
        Longitud: '',
        Cubicación: '',
      },
      ...stockReport.firewood
        .filter(p => p.plant_id === 2 || p.plant_id === null)
        .map(p => {
          return {
            'Especie de madera': p.wood_name,
            Longitud: '',
            Cubicación: p.m3.toFixed(3),
          }
        }),
    ]

    return (
      <>
        <div className="stock_report_grid">
          <div className="stock_report_title">IFISA 1</div>
          <Table head={tableHeader}>
            <tr>
              <td colSpan="7">Tarima</td>
            </tr>
            {stockReport.pallets.filter(
              p => p.plant_id === 1 || p.plant_id === null
            ).length > 0 ? (
              stockReport.pallets
                .filter(p => p.plant_id === 1 || p.plant_id === null)
                .map(item => (
                  <tr key={item._id}>
                    <td>{item.wood_name}</td>
                    <td>{item.m3.toFixed(3)} m3</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7">No hay registros</td>
              </tr>
            )}
            <tr>
              <td colSpan="7">
                Total:{' '}
                {stockReport.pallets
                  .filter(p => p.plant_id === 1)
                  .reduce((a, b) => a + b.m3, 0)
                  .toFixed(3) || 0}{' '}
                m3
              </td>
            </tr>
          </Table>
          <Table head={tableHeader}>
            <tr>
              <td colSpan="7">Madera Habilitada</td>
            </tr>
            {stockReport.items.filter(
              p => p.plant_id === 1 || p.plant_id === null
            ).length > 0 ? (
              stockReport.items
                .filter(p => p.plant_id === 1 || p.plant_id === null)
                .map(item => (
                  <tr key={item._id}>
                    <td>{item.wood_name}</td>
                    <td>{item.m3.toFixed(3)} m3</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7">No hay registros</td>
              </tr>
            )}
            <tr>
              <td colSpan="7">
                Total:{' '}
                {stockReport.items
                  .filter(p => p.plant_id === 1)
                  .reduce((a, b) => a + b.m3, 0)
                  .toFixed(3) || 0}{' '}
                m3
              </td>
            </tr>
          </Table>
          <Table head={tableHeaderRaw}>
            <tr>
              <td colSpan="7">Trozo</td>
            </tr>
            {stockReport.raws.filter(
              p => p.plant_id === 1 || p.plant_id === null
            ).length > 0 ? (
              stockReport.raws
                .filter(p => p.plant_id === 1 || p.plant_id === null)
                .map(item => (
                  <tr key={item._id}>
                    <td>{item.wood_name}</td>
                    <td>{item.length}</td>
                    <td>{item.m3.toFixed(3)} m3</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7">No hay registros</td>
              </tr>
            )}
            <tr>
              <td colSpan="7">
                Total:{' '}
                {stockReport.raws
                  .filter(p => p.plant_id === 1)
                  .reduce((a, b) => a + b.m3, 0)
                  .toFixed(3) || 0}{' '}
                m3
              </td>
            </tr>
          </Table>
          <Table head={tableHeader}>
            <tr>
              <td colSpan="7">Leña</td>
            </tr>
            {stockReport.firewood.filter(
              p => p.plant_id === 1 || p.plant_id === null
            ).length > 0 ? (
              stockReport.firewood
                .filter(p => p.plant_id === 1 || p.plant_id === null)
                .map(item => (
                  <tr key={item._id}>
                    <td>{item.wood_name}</td>
                    <td>{item.m3.toFixed(3)} m3</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7">No hay registros</td>
              </tr>
            )}
            <tr>
              <td colSpan="7">
                Total:{' '}
                {stockReport.firewood
                  .filter(p => p.plant_id === 1)
                  .reduce((a, b) => a + b.m3, 0)
                  .toFixed(3) || 0}{' '}
                m3
              </td>
            </tr>
          </Table>
        </div>
        <div className="stock_report_grid">
          <div className="stock_report_title">IFISA 2</div>
          <Table head={tableHeader}>
            <tr>
              <td colSpan="7">Tarima</td>
            </tr>
            {stockReport.pallets.filter(
              p => p.plant_id === 2 || p.plant_id === null
            ).length > 0 ? (
              stockReport.pallets
                .filter(p => p.plant_id === 2 || p.plant_id === null)
                .map(item => (
                  <tr key={item._id}>
                    <td>{item.wood_name}</td>
                    <td>{item.m3.toFixed(3)} m3</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7">No hay registros</td>
              </tr>
            )}
            <tr>
              <td colSpan="7">
                Total:{' '}
                {stockReport.pallets
                  .filter(p => p.plant_id === 2)
                  .reduce((a, b) => a + b.m3, 0)
                  .toFixed(3) || 0}{' '}
                m3
              </td>
            </tr>
          </Table>
          <Table head={tableHeader}>
            <tr>
              <td colSpan="7">Madera Habilitada</td>
            </tr>
            {stockReport.items.filter(
              p => p.plant_id === 2 || p.plant_id === null
            ).length > 0 ? (
              stockReport.items
                .filter(p => p.plant_id === 2 || p.plant_id === null)
                .map(item => (
                  <tr key={item._id}>
                    <td>{item.wood_name}</td>
                    <td>{item.m3.toFixed(3)} m3</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7">No hay registros</td>
              </tr>
            )}
            <tr>
              <td colSpan="7">
                Total:{' '}
                {stockReport.items
                  .filter(p => p.plant_id === 2)
                  .reduce((a, b) => a + b.m3, 0)
                  .toFixed(3) || 0}{' '}
                m3
              </td>
            </tr>
          </Table>
          <Table head={tableHeaderRaw}>
            <tr>
              <td colSpan="7">Trozo</td>
            </tr>
            {stockReport.raws.filter(
              p => p.plant_id === 2 || p.plant_id === null
            ).length > 0 ? (
              stockReport.raws
                .filter(p => p.plant_id === 2 || p.plant_id === null)
                .map(item => (
                  <tr key={item._id}>
                    <td>{item.wood_name}</td>
                    <td>{item.length}</td>
                    <td>{item.m3.toFixed(3)} m3</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7">No hay registros</td>
              </tr>
            )}
            <tr>
              <td colSpan="7">
                Total:{' '}
                {stockReport.raws
                  .filter(p => p.plant_id === 2)
                  .reduce((a, b) => a + b.m3, 0)
                  .toFixed(3) || 0}{' '}
                m3
              </td>
            </tr>
          </Table>
          <Table head={tableHeader}>
            <tr>
              <td colSpan="7">Leña</td>
            </tr>
            {stockReport.firewood.filter(
              p => p.plant_id === 2 || p.plant_id === null
            ).length > 0 ? (
              stockReport.firewood
                .filter(p => p.plant_id === 2 || p.plant_id === null)
                .map(item => (
                  <tr key={item._id}>
                    <td>{item.wood_name}</td>
                    <td>{item.m3.toFixed(3)} m3</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7">No hay registros</td>
              </tr>
            )}
            <tr>
              <td colSpan="7">
                Total:{' '}
                {stockReport.firewood
                  .filter(p => p.plant_id === 2)
                  .reduce((a, b) => a + b.m3, 0)
                  .toFixed(3) || 0}{' '}
                m3
              </td>
            </tr>
          </Table>
        </div>
        <div className="stock_report_grid">
          <div className="stock_report_title">
            Total global:{' '}
            {(
              stockReport.pallets
                .filter(p => p.plant_id === 2)
                .reduce((a, b) => a + b.m3, 0) +
              stockReport.items
                .filter(p => p.plant_id === 2)
                .reduce((a, b) => a + b.m3, 0) +
              stockReport.raws
                .filter(p => p.plant_id === 2)
                .reduce((a, b) => a + b.m3, 0) +
              stockReport.firewood
                .filter(p => p.plant_id === 2)
                .reduce((a, b) => a + b.m3, 0)
            ).toFixed(3)}{' '}
            m3
          </div>
        </div>
        <div>
          <CSVLink data={dataIfisa1} filename={'ifisa1_general.csv'}>
            <Button>Reporte IFISA 1</Button>
          </CSVLink>
          <CSVLink data={dataIfisa2} filename={'ifisa2_general.csv'}>
            <Button>Reporte IFISA 2</Button>
          </CSVLink>
        </div>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    stockReport: state.reducerStock.stockReport,
  }
}

const mapDispatchToProps = {
  setTitle,
  setWraper,
  getAll,
  deleted,
  update,
  create,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
