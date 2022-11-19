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
  const { stockReportRaws } = props

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
    props.getAll('stock/reports/raws', 'GET_STOCK_REPORT_RAWS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = ['Largo', 'No. Piezas', 'P/T', 'Especie', 'M3']

  if (stockReportRaws) {
    const dataIfisa1 = stockReportRaws.raws
      .filter(item => item.plant_id === 1)
      .map(pallet => ({
        Largo: pallet.length,
        'No. Piezas': pallet.total,
        'P/T': pallet.pt,
        Especie: pallet.name,
        M3: pallet.m3,
      }))

    const dataIfisa2 = stockReportRaws.raws
      .filter(item => item.plant_id === 2)
      .map(pallet => ({
        Largo: pallet.length,
        'No. Piezas': pallet.total,
        'P/T': pallet.pt,
        Especie: pallet.name,
        M3: pallet.m3,
      }))

    const dataIfisa1Wood = stockReportRaws.rawsWood
      .filter(item => item.plant_id === 1)
      .map(pallet => ({
        Especie: pallet.name,
        'P/T': pallet.pt,
        M3: pallet.m3,
      }))
    const dataIfisa2Wood = stockReportRaws.rawsWood
      .filter(item => item.plant_id === 2)
      .map(pallet => ({
        Especie: pallet.name,
        'P/T': pallet.pt,
        M3: pallet.m3,
      }))

    return (
      <>
        <div>
          <div className="stock_report_title">IFISA 1</div>
          <Table
            head={tableHeader}
            footer
            footerChildren={
              <tr>
                <td></td>
                <td></td>
                <td>
                  {stockReportRaws.raws
                    .filter(item => item.plant_id === 1)
                    .reduce((a, b) => a + parseFloat(b.pt), 0)
                    .toFixed(3)}{' '}
                  PT
                </td>
                <td></td>
                <td>
                  {stockReportRaws.raws
                    .filter(item => item.plant_id === 1)
                    .reduce((a, b) => a + parseFloat(b.m3), 0)
                    .toFixed(3)}{' '}
                  m3
                </td>
              </tr>
            }
          >
            {stockReportRaws.raws
              .filter(item => item.plant_id === 1)
              .map((pallet, index) => (
                <>
                  <tr key={index}>
                    <td>{pallet.length}</td>
                    <td>{pallet.total}</td>
                    <td>{pallet.pt}</td>
                    <td>{pallet.name}</td>
                    <td>{pallet.m3}</td>
                  </tr>
                </>
              ))}
          </Table>
          <Table
            head={['Especie', 'P/T', 'M3']}
            footer
            footerChildren={
              <tr>
                <td></td>
                <td>
                  {stockReportRaws.rawsWood
                    .filter(item => item.plant_id === 1)
                    .reduce((a, b) => a + parseFloat(b.pt), 0)
                    .toFixed(3)}{' '}
                  PT
                </td>
                <td>
                  {stockReportRaws.rawsWood
                    .filter(item => item.plant_id === 1)
                    .reduce((a, b) => a + parseFloat(b.m3), 0)
                    .toFixed(3)}{' '}
                  m3
                </td>
              </tr>
            }
          >
            {stockReportRaws.rawsWood
              .filter(item => item.plant_id === 1)
              .map((pallet, index) => (
                <>
                  <tr key={index}>
                    <td>{pallet.name}</td>
                    <td>{pallet.pt}</td>
                    <td>{pallet.m3}</td>
                  </tr>
                </>
              ))}
          </Table>
        </div>
        <div>
          <div className="stock_report_title">IFISA 2</div>
          <Table
            head={tableHeader}
            footer
            footerChildren={
              <tr>
                <td></td>
                <td></td>
                <td>
                  {stockReportRaws.raws
                    .filter(item => item.plant_id === 2)
                    .reduce((a, b) => a + parseFloat(b.pt), 0)
                    .toFixed(3)}{' '}
                  PT
                </td>
                <td></td>
                <td>
                  {stockReportRaws.raws
                    .filter(item => item.plant_id === 2)
                    .reduce((a, b) => a + parseFloat(b.m3), 0)
                    .toFixed(3)}{' '}
                  m3
                </td>
              </tr>
            }
          >
            {stockReportRaws.raws
              .filter(item => item.plant_id === 2)
              .map((pallet, index) => (
                <>
                  <tr key={index}>
                    <td>{pallet.length}</td>
                    <td>{pallet.total}</td>
                    <td>{pallet.pt}</td>
                    <td>{pallet.name}</td>
                    <td>{pallet.m3}</td>
                  </tr>
                </>
              ))}
          </Table>
          <Table
            head={['Especie', 'P/T', 'M3']}
            footer
            footerChildren={
              <tr>
                <td></td>
                <td>
                  {stockReportRaws.rawsWood
                    .filter(item => item.plant_id === 2)
                    .reduce((a, b) => a + parseFloat(b.pt), 0)
                    .toFixed(3)}{' '}
                  PT
                </td>
                <td>
                  {stockReportRaws.rawsWood
                    .filter(item => item.plant_id === 2)
                    .reduce((a, b) => a + parseFloat(b.m3), 0)
                    .toFixed(3)}{' '}
                  m3
                </td>
              </tr>
            }
          >
            {stockReportRaws.rawsWood
              .filter(item => item.plant_id === 2)
              .map((pallet, index) => (
                <>
                  <tr key={index}>
                    <td>{pallet.name}</td>
                    <td>{pallet.pt}</td>
                    <td>{pallet.m3}</td>
                  </tr>
                </>
              ))}
          </Table>
        </div>
        <div>
          <CSVLink data={dataIfisa1} filename={'ifisa1_trozo.csv'}>
            <Button>Reporte IFISA 1</Button>
          </CSVLink>
          <CSVLink data={dataIfisa2} filename={'ifisa2_trozo.csv'}>
            <Button>Reporte IFISA 2</Button>
          </CSVLink>
          <CSVLink
            data={dataIfisa1Wood}
            filename={'ifisa1_trozo_especie.csv'}
          >
            <Button>Reporte IFISA 1 por especie</Button>
          </CSVLink>
          <CSVLink
            data={dataIfisa2Wood}
            filename={'ifisa2_trozo_especie.csv'}
          >
            <Button>Reporte IFISA 2 por especie</Button>
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
    stockReportRaws: state.reducerStock.stockReportRaws,
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
