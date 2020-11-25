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
  const { pallets, setTitle } = props
  const [filter, setFilter] = useState([])

  useEffect(() => {
    const topbar = {
      title: 'Inventarios',
      menu: {
        Tarimas: '/stock',
        Complementos: '/stockItems',
        Clavos: '/stockNails',
        'Materia Prima': '/stockMaterial',
      },
    }
    setTitle(topbar)
    setWraper(true)
    props.getAll('pallets', 'GET_PALLETS')
    // eslint-disable-next-line
  }, [])

  const tableHeader = [
    'Nombre',
    '1 Verdes',
    '1 Secas',
    '2 Verdes',
    '2 Secas',
    'Acciones',
  ]
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
          tableData.map(pallet => (
            <tr key={pallet._id}>
              <td>{pallet.model}</td>
              <td>{pallet.stock[0].green}</td>
              <td>{pallet.stock[0].dry}</td>
              <td>{pallet.stock[1].green}</td>
              <td>{pallet.stock[1].dry}</td>
              <td>
                <Link to={`stock/update/${pallet._id}?type=pallet`}>
                  <Button className="btn --warning">
                    <AiOutlineEdit />
                  </Button>
                </Link>
              </td>
            </tr>
          ))
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
  }
}

const mapDispatchToProps = {
  setTitle,
  setWraper,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
