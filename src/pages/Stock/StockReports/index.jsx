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
        Reporte: '/stock/report',
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
    return (
      <>
        <div className="stock_report_grid">
          <div className="stock_report_title">IFISA 1</div>
          <Table head={tableHeader}>
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
