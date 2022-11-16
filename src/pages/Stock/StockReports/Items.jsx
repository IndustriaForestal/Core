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
  const { stockReportItems } = props

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
    props.getAll('stock/reports/items', 'GET_STOCK_REPORT_ITEMS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = [
    'PZAS',
    'Modelo, Descripción y Medidas',
    'Saldo',
    'Tar.Juegos',
    'PT',
    'Especie',
  ]

  if (stockReportItems) {
    return (
      <>
        <div>
          <div className="stock_report_title">IFISA 1</div>
          <Table
            head={tableHeader}
            footer={true}
            footerChildren={
              <tr>
                <td></td>
                <td>Total PT:</td>
                <td></td>
                <td></td>
                <td>
                  {stockReportItems
                    .filter(
                      item =>
                        item.items.filter(i => i.id === 1).length > 0
                    )
                    .reduce(
                      (a, b) =>
                        a +
                        b.items
                          .filter(i => i.id === 1)
                          .reduce((a, b) => a + b.total, 0),
                      0
                    )}
                </td>
                <td></td>
              </tr>
            }
          >
            {stockReportItems
              .filter(
                item => item.items.filter(i => i.id === 1).length > 0
              )
              .map((pallet, index) => (
                <>
                  <tr key={index}>
                    <td></td>
                    <td>{pallet.model}</td>
                  </tr>
                  {pallet.items
                    .filter(i => i.id === 1)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.amount}</td>
                        <td>
                          {item.length} x {item.width} x {item.height}
                        </td>
                        <td>{item.total}</td>
                        <td>
                          {(item.total / item.amount).toFixed(0)}
                        </td>
                        <td>{item.pt}</td>
                        <td>{item.name}</td>
                      </tr>
                    ))}
                </>
              ))}
          </Table>
        </div>
        <div>
          <div className="stock_report_title">IFISA 2</div>
          <Table
            head={tableHeader}
            footer={true}
            footerChildren={
              <tr>
                <td></td>
                <td>Total PT:</td>
                <td></td>
                <td></td>
                <td>
                  {stockReportItems
                    .filter(
                      item =>
                        item.items.filter(i => i.id === 2).length > 0
                    )
                    .reduce(
                      (a, b) =>
                        a +
                        b.items
                          .filter(i => i.id === 2)
                          .reduce((a, b) => a + b.total, 0),
                      0
                    )}
                </td>
                <td></td>
              </tr>
            }
          >
            {stockReportItems
              .filter(
                item => item.items.filter(i => i.id === 2).length > 0
              )
              .map((pallet, index) => (
                <>
                  <tr key={index}>
                    <td></td>
                    <td>{pallet.model}</td>
                  </tr>
                  {pallet.items
                    .filter(i => i.id === 2)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.amount}</td>
                        <td>
                          {item.length} x {item.width} x {item.height}
                        </td>
                        <td>{item.total}</td>
                        <td>
                          {(item.total / item.amount).toFixed(0)}
                        </td>
                        <td>{item.pt}</td>
                        <td>{item.name}</td>
                      </tr>
                    ))}
                </>
              ))}
          </Table>
        </div>

        {/*   <div className="stock_report_grid">
          <div className="stock_report_title">
            Total global:{' '}
            {(
              stockReportItems.pallets
                .filter(p => p.plant_id === 2)
                .reduce((a, b) => a + b.m3, 0) +
              stockReportItems.items
                .filter(p => p.plant_id === 2)
                .reduce((a, b) => a + b.m3, 0) +
              stockReportItems.raws
                .filter(p => p.plant_id === 2)
                .reduce((a, b) => a + b.m3, 0) +
              stockReportItems.firewood
                .filter(p => p.plant_id === 2)
                .reduce((a, b) => a + b.m3, 0)
            ).toFixed(3)}{' '}
            m3
          </div>
        </div> */}
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    stockReportItems: state.reducerStock.stockReportItems,
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
