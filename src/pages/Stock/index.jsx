import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { setTitle, setWraper, getAll, deleted } from '../../actions/app'
import Table from '../../components/Table/Table'
import AddButton from '../../components/AddButton/AddButton'
import Button from '../../components/Button/Button'
import SearchBar from '../../components/SearchBar/SearchBar'
import './styles.scss'

const Nails = props => {
  const { pallets, setTitle, role } = props
  const [filter, setFilter] = useState([])

  useEffect(() => {
    let topbar
    role === 'Administrador'
      ? (topbar = {
          title: 'Inventarios Generales',
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
          title: 'Inventarios Generales',
          menu: {
            Tarimas: '/stock',
            Complementos: '/stockItems',
            Clavos: '/stockNails',
            'Materia Prima': '/stockMaterial',
            Historial: '/stockHistory',
          },
        })

    setTitle(topbar)
    setWraper(true)
    props.getAll('pallets', 'GET_PALLETS')
    // eslint-disable-next-line
  }, [])
  let tableHeader
  role === 'Administrador'
    ? (tableHeader = [
        'Nombre',
        'IFISA 1 Verdes',
        'IFISA 2 Verdes',
        'Total Verdes',
        'IFISA 1 Secas',
        'IFISA 2 Secas',
        'Total Secas',
        'IFISA 1 Reapracion',
        'IFISA 2 Reapracion',
        'Total Raparacion',
        'Total',
        'Stock Seguridad',
        'Acciones',
      ])
    : (tableHeader = [
        'Nombre',
        'IFISA 1 Verdes',
        'IFISA 2 Verdes',
        'Total Verdes',
        'IFISA 1 Secas',
        'IFISA 2 Secas',
        'Total Secas',
        'IFISA 1 Reapracion',
        'IFISA 2 Reapracion',
        'Total Raparacion',
        'Stock Seguridad',
        'Total',
      ])

  const handleSearch = e => {
    const searchWord = e.target.value.toLowerCase()
    const filterPallets = pallets.filter(pallet =>
      pallet.model.toLowerCase().includes(searchWord)
    )
    setFilter(filterPallets)
  }

  let tableData
  if (filter.length > 0) {
    tableData = filter
  } else {
    tableData = pallets
  }

  return (
    <>
      <SearchBar onChange={handleSearch} />
      <Table head={tableHeader}>
        {tableData ? (
          tableData.map(pallet => {
            let r1 = 0,
              r2 = 0
            if (pallet.stock[0].repair !== undefined) {
              r1 = pallet.stock[0].repair
            }
            if (pallet.stock[1].repair !== undefined) {
              r2 = pallet.stock[1].repair
            }
            return (
              <tr key={pallet._id}>
                <td>{pallet.model}</td>
                <td>{pallet.stock[0].green}</td>
                <td>{pallet.stock[1].green}</td>
                <td>{pallet.stock[0].green + pallet.stock[1].green}</td>
                <td>{pallet.stock[0].dry}</td>
                <td>{pallet.stock[1].dry}</td>
                <td>{pallet.stock[0].dry + pallet.stock[1].dry}</td>
                <td>
                  {pallet.stock[0].repair !== undefined
                    ? pallet.stock[0].repair
                    : 0}
                </td>
                <td>
                  {pallet.stock[1].repair !== undefined
                    ? pallet.stock[1].repair
                    : 0}
                </td>
                <td>{r1 + r2}</td>
                <td>
                  {pallet.stock[0].dry +
                    pallet.stock[1].dry +
                    pallet.stock[0].green +
                    pallet.stock[1].green +
                    r1 +
                    r2}
                </td>
                <td>{pallet.stock.secutiryStock ? pallet.stock.secutiryStock : 0 }</td>
                {role === 'Administrador' ? (
                  <td>
                    <Link to={`stock/update/${pallet._id}?type=pallet`}>
                      <Button className="btn --warning">
                        <AiOutlineEdit />
                      </Button>
                    </Link>
                  </td>
                ) : null}
              </tr>
            )
          })
        ) : (
          <tr>
            <td colSpan="7">No hay registros</td>
          </tr>
        )}
      </Table>
      <Link to="/nails/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    pallets: state.pallets,
    role: state.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  setWraper,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
