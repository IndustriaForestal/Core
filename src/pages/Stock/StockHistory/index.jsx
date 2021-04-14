import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../../actions/app'
import Table from '../../../components/Table/Table'
import AddButton from '../../../components/AddButton/AddButton'
import Loading from '../../../components/Loading/Loading'
import SearchBar from '../../../components/SearchBar/SearchBar'

const StockHistory = props => {
  const { stockLog, pallets, raws, nails, items, setTitle, role } = props
  const [filter, setFilter] = useState([])

  useEffect(() => {
    let topbar
    role === 'Administrador'
      ? (topbar = {
          title: 'Inventarios',
          menu: {
            Tarimas: '/stock',
            Complementos: '/stockItems',
            Clavos: '/stockNails',
            'Materia Prima': '/stockMaterial',
            'Entradas y salidas': '/stockChanges',
            Historial: '/stockHistory',
          },
        })
      : (topbar = {
          title: 'Inventarios',
          menu: {
            Tarimas: '/stock',
            Complementos: '/stockItems',
            Clavos: '/stockNails',
            'Materia Prima': '/stockMaterial',
            Historial: '/stockHistory',
          },
        })
    setTitle(topbar)
    props.getAll('stock', 'GET_STOCKLOG')
    props.getAll('pallets', 'GET_PALLETS')
    props.getAll('raws', 'GET_RAWS')
    props.getAll('nails', 'GET_NAILS')
    props.getAll('items', 'GET_ITEMS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = [
    'Tipo',
    'Inventario',
    'Cantidad',
    'Usurio',
    'Fecha',
    'Planta',
    'Tipo Tarima',
  ]

  const handleSearch = e => {
    const searchWord = e.target.value.toLowerCase()
    let newTableDate = []
       // eslint-disable-next-line
    pallets.map(pallet => {
      if (pallet.model.toLowerCase() === searchWord) {
        newTableDate.push(pallet._id)
      }
    })
       // eslint-disable-next-line
    nails.map(nail => {
      if (nail.name.toLowerCase() === searchWord) {
        newTableDate.push(nail.name)
      }
    })
       // eslint-disable-next-line
    items.map(item => {
      if (item.name.toLowerCase() === searchWord) {
        newTableDate.push(item.name)
      }
    })
       // eslint-disable-next-line
    raws.map(raw => {
      if (raw.name.toLowerCase() === searchWord) {
        newTableDate.push(raw.name)
      }
    })

    setFilter(newTableDate)
  }

  let dataTable = []
  if (filter.length === 1) {
    dataTable = stockLog.filter(log => log.productId === filter[0])
  } else {
    dataTable = stockLog
  }

  if (pallets && raws && nails && items && stockLog) {
    return (
      <>
        <SearchBar onChange={handleSearch} />
        <Table head={tableHeader} id="tableSearch">
          {stockLog ? (
            dataTable.map(item => (
              <tr key={item._id}>
                <td>{item.inOut}</td>
                <td>
                  {item.collection === 'pallets'
                    ? `Tarima - ${
                        pallets.filter(
                          pallet => pallet._id === item.productId
                        )[0]
                          ? pallets.filter(
                              pallet => pallet._id === item.productId
                            )[0].model
                          : 'Eliminada'
                      }`
                    : /*  console.log(
                        pallets.filter(pallet => pallet._id === item.productId),
                        item._id
                      ) */
                      null}
                  {item.collection === 'items'
                    ? `Complemento - ${
                        items.filter(itemx => itemx._id === item.productId)[0]
                          ? items.filter(
                              itemx => itemx._id === item.productId
                            )[0].name
                          : 'Eliminado'
                      }`
                    : null}
                  {item.collection === 'nails'
                    ? `Clavos - ${
                        nails.filter(nail => nail._id === item.productId)[0]
                          ? nails.filter(nail => nail._id === item.productId)[0]
                              .name
                          : 'Eliminado'
                      }`
                    : null}
                  {item.collection === 'raws'
                    ? `Materia Prima - ${
                        raws.filter(raw => raw._id === item.productId)[0].name
                      }`
                    : null}
                </td>
                <td>{item.amount}</td>
                <td>{item.user}</td>
                <td>{new Date(item.date).toLocaleString()}</td>
                <td>
                  {item.sucursal === 0 ? 'IFISA 1' : null}
                  {item.sucursal === 1 ? 'IFISA 2' : null}
                  {item.sucursal !== 0 && item.sucursal !== 1 ? 'N/A' : null}
                </td>
                <td>
                  {item.state === 0 ? 'Secas' : null}
                  {item.state === 1 ? 'Verdes' : null}
                  {item.state === 2 ? 'Reaparación' : null}
                  {item.state !== 0 && item.state !== 1 && item.state !== 2
                    ? 'N/A'
                    : null}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay registros</td>
            </tr>
          )}
        </Table>
        <Link to="/items/create">
          <AddButton>
            <BsPlus />
          </AddButton>
        </Link>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    stockLog: state.stockLog,
    pallets: state.pallets,
    nails: state.nails,
    items: state.items,
    raws: state.raws,
    role: state.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(StockHistory)
