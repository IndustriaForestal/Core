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
  const { stockReportPallets } = props

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
    props.getAll('stock/reports/pallets', 'GET_STOCK_REPORT_PALLETS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = [
    'Exitencia Total',
    'Modelo, Descripción y Medidas',
    'Cub x Pieza',
    'Cub Tarimas',
    'Especie',
    'Estado',
    'Cliente',
  ]

  if (stockReportPallets) {
    const dataIfisa1 = stockReportPallets
      .filter(item => item.plant_id === 1)
      .map(item => ({
        'Existencia Total': item.total,
        Modelo: item.model,
        'Cub x Pieza': item.pt,
        'Cub Tarimas': item.ptTotal,
        Especie: item.wood_name,
        Estado: item.state === 'damp' ? 'Humedo' : 'Seco',
        Cliente: item.c_name,
      }))
    const dataIfisa2 = stockReportPallets
      .filter(item => item.plant_id === 2)
      .map(item => ({
        'Existencia Total': item.total,
        Modelo: item.model,
        'Cub x Pieza': item.pt,
        'Cub Tarimas': item.ptTotal,
        Especie: item.wood_name,
        Estado: item.state === 'damp' ? 'Humedo' : 'Seco',
        Cliente: item.c_name,
      }))

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
                <td>
                  {stockReportPallets
                    .filter(item => item.plant_id === 1)
                    .reduce((a, b) => a + parseFloat(b.ptTotal), 0)
                    .toFixed(3)}
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            }
          >
            {stockReportPallets
              .filter(item => item.plant_id === 1)
              .map((pallet, index) => (
                <>
                  <tr key={index}>
                    <td>{pallet.total}</td>
                    <td>{pallet.model}</td>
                    <td>{pallet.pt}</td>
                    <td>{pallet.ptTotal}</td>
                    <td>{pallet.wood_name}</td>
                    <td>
                      {pallet.state === 'damp' ? 'Humedo' : 'Seco'}
                    </td>
                    <td>{pallet.c_name}</td>
                  </tr>
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
                <td>
                  {stockReportPallets
                    .filter(item => item.plant_id === 2)
                    .reduce((a, b) => a + parseFloat(b.ptTotal), 0)
                    .toFixed(3)}
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            }
          >
            {stockReportPallets
              .filter(item => item.plant_id === 2)
              .map((pallet, index) => (
                <>
                  <tr key={index}>
                    <td>{pallet.total}</td>
                    <td>{pallet.model}</td>
                    <td>{pallet.pt}</td>
                    <td>{pallet.ptTotal}</td>
                    <td>{pallet.wood_name}</td>
                    <td>
                      {pallet.state === 'damp' ? 'Humedo' : 'Seco'}
                    </td>
                    <td>{pallet.c_name}</td>
                  </tr>
                </>
              ))}
          </Table>
        </div>
        <div>
          <CSVLink data={dataIfisa1} filename={'ifisa1_tarimas.csv'}>
            <Button>Reporte IFISA 1</Button>
          </CSVLink>
          <CSVLink data={dataIfisa2} filename={'ifisa2_tarimas.csv'}>
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
    stockReportPallets: state.reducerStock.stockReportPallets,
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
