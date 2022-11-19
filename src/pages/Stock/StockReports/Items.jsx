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
        'Reporte General': '/stock/report',
        'Reporte Tarimas': '/stock/report/pallets',
        'Reporte Madera Habilitada': '/stock/report/items',
        'Reporte Trozo': '/stock/report/raws',
        'Reporte Leña ': '/stock/report/firewood',
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
    const dataIfisa1 = []
    const dataIfisa2 = []

    stockReportItems
      .filter(item => item.items.filter(i => i.id === 1).length > 0)
      .map(pallet => {
        dataIfisa1.push({
          PZAS: '',
          'Modelo, Descripción y Medidas': pallet.model,
          Saldo: '',
          'Tar.Juegos': '',
          PT: '',
          Especie: '',
        })

        pallet.items
          .filter(i => i.id === 1)
          .map(item => {
            dataIfisa1.push({
              PZAS: item.amount,
              'Modelo, Descripción y Medidas': `${item.length} x ${item.width} x ${item.height}`,
              Saldo: item.total,
              'Tar.Juegos': (item.total / item.amount).toFixed(0),
              PT: item.pt,
              Especie: item.name,
            })
          })
      })

    stockReportItems
      .filter(item => item.items.filter(i => i.id === 2).length > 0)
      .map(pallet => {
        dataIfisa2.push({
          PZAS: '',
          'Modelo, Descripción y Medidas': pallet.model,
          Saldo: '',
          'Tar.Juegos': '',
          PT: '',
          Especie: '',
        })

        pallet.items
          .filter(i => i.id === 2)
          .map(item => {
            dataIfisa2.push({
              PZAS: item.amount,
              'Modelo, Descripción y Medidas': `${item.length} x ${item.width} x ${item.height}`,
              Saldo: item.total,
              'Tar.Juegos': (item.total / item.amount).toFixed(0),
              PT: item.pt,
              Especie: item.name,
            })
          })
      })

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
        <div>
          <CSVLink
            data={dataIfisa1}
            filename={'ifisa1_madera_habilitada.csv'}
          >
            <Button>Reporte IFISA 1</Button>
          </CSVLink>
          <CSVLink
            data={dataIfisa2}
            filename={'ifisa2_madera_habilitada.csv'}
          >
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
