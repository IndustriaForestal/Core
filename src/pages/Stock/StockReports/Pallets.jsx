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
        Reporte: '/stock/report',
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
  ]

  if (stockReportPallets) {
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
                  </tr>
                </>
              ))}
          </Table>
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
