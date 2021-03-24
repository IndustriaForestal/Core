import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setTitle, setWraper, getAll, create } from '../../../actions/app'

const ShippingProgramStock = props => {
  const { pallets, setTitle, shippingProgramStock } = props

  useEffect(() => {
    const topbar = {
      title: 'Programa de Embarques',
      menu: {
        Programa: '/shipping-program',
        Stock: '/shipping-program/stock',
        'Entrega Prov.': '/shipping-program/supplier-delivery',
        Aserrio: '/shipping-program/sawn',
        Armado: '/shipping-program/assamble',
        'Progr. Estufas': '/shipping-program/stoves',
      },
    }
    setTitle(topbar)
    setWraper(true)
    props.getAll('pallets', 'GET_PALLETS').then(() => {
      props.getAll('shippingProgram/stock', 'GET_SHIPPING_PROGRAM_STOCK')
    })
    // eslint-disable-next-line
  }, [])

  const handleUpdateStock = (e, pallet, key) => {
    if (e.key === 'Enter') {
      console.log(e)
      pallet[key] = parseInt(e.target.value)
      props
        .create(
          'shippingProgram/stock',
          'UPDATE_SHIPPING_PROGRAM_STOCK',
          pallet
        )
        .then(() => {
          props.getAll('pallets', 'GET_PALLETS').then(() => {
            props.getAll('shippingProgram/stock', 'GET_SHIPPING_PROGRAM_STOCK')
          })
        })
    }
  }

  const compare = (a, b) => {
    const orderA = a.model
    const orderB = b.model

    let comparison = 0
    if (orderA > orderB) {
      comparison = 1
    } else if (orderA < orderB) {
      comparison = -1
    }
    return comparison
  }

  if (pallets && shippingProgramStock) {
    const stock = pallets.sort(compare).map(pallet => {
      const stock = shippingProgramStock.filter(
        stock => stock.palletId === pallet.model
      )

      if (stock.length > 0) {
        return {
          ...stock,
          stockAut: stock[0].stock_aut,
          orders: stock[0].orders,
          stock: stock[0].stock,
          suppliers: stock[0].suppliers,
          prodIfisa: stock[0].prod_ifisa,
          total:
            stock[0].prod_ifisa +
            stock[0].suppliers +
            stock[0].stock +
            stock[0].orders +
            stock[0].stock_aut,
          model: pallet.model,
        }
      } else {
        return {
          model: pallet.model,
          stockAut: 0,
          orders: 0,
          stock: 0,
          suppliers: 0,
          prodIfisa: 0,
          total: 0,
        }
      }
    })

    return (
      <table className="excel">
        <thead>
          <tr>
            <th>batb</th>
            <th>STOCK AUT</th>
            <th>PEDIDOS</th>
            <th>INVENTARIO</th>
            <th>PROVEEDORES</th>
            <th>PROD. IFISA</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((s, index) => (
            <tr key={index}>
              <td>{s.model}</td>
              <td>
                <input
                  type="number"
                  defaultValue={s.stockAut}
                  onKeyPress={e => handleUpdateStock(e, s, 'stockAut')}
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={s.orders}
                  onKeyPress={e => handleUpdateStock(e, s, 'orders')}
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={s.stock}
                  onKeyPress={e => handleUpdateStock(e, s, 'stock')}
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={s.suppliers}
                  onKeyPress={e => handleUpdateStock(e, s, 'suppliers')}
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={s.prodIfisa}
                  onKeyPress={e => handleUpdateStock(e, s, 'prodIfisa')}
                />
              </td>
              <td>{s.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  } else {
    return <> Cargando </>
  }
}

const mapStateToProps = state => {
  return {
    pallets: state.pallets,
    shippingProgramStock: state.shippingProgramStock,
  }
}

const mapDispatchToProps = {
  setTitle,
  setWraper,
  getAll,
  create,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingProgramStock)
