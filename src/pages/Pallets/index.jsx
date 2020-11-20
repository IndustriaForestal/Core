import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { GiHammerNails, GiWoodPile, GiProcessor, GiTruck } from 'react-icons/gi'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../actions/app'
import { deleteObjectPallet } from './actions'
import Swal from 'sweetalert2'
import AddButton from '../../components/AddButton/AddButton'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading/Loading'
import SearchBar from '../../components/SearchBar/SearchBar'
import PalletImage from '../../assets/static/pallet.png'
import './styles.scss'

const Pallets = props => {
  const { pallets, setTitle } = props
  const [filter, setFilter] = useState([])

  useEffect(() => {
    const topbar = {
      title: 'Tarimas',
      menu: { Tarimas: '/pallets' },
    }
    setTitle(topbar)
    props.getAll('pallets', 'GET_PALLETS')
    // eslint-disable-next-line
  }, [])

  const handleDeletePallet = palletId => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
    }).then(result => {
      if (result.isConfirmed) {
        props.deleted(`pallets/${palletId}`, 'DELETE_PALLET')
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  const handleDeleteNail = (palletId, nailId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
    }).then(result => {
      if (result.isConfirmed) {
        props.deleteObjectPallet(
          `pallets/delete/${palletId}/${nailId}`,
          'DELETE_NAIL_PALLET'
        )
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  const handleDeleteItem = (palletId, itemId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
    }).then(result => {
      if (result.isConfirmed) {
        props.deleteObjectPallet(
          `pallets/item/delete/${palletId}/${itemId}`,
          'DELETE_ITEM_PALLET'
        )
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }
  const handleDeletePlatform = (palletId, platformId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
    }).then(result => {
      if (result.isConfirmed) {
        props.deleteObjectPallet(
          `pallets/platform/delete/${palletId}/${platformId}`,
          'DELETE_PLATFORM_PALLET'
        )
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }
  const handleDeleteSpecialProcess = (palletId, specialProcessId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
    }).then(result => {
      if (result.isConfirmed) {
        props.deleteObjectPallet(
          `pallets/specialProcess/delete/${palletId}/${specialProcessId}`,
          'DELETE_PLATFORM_PALLET'
        )
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  const handleSearch = e => {
    const filterPallets = pallets.filter(pallet =>
      pallet.model.toLowerCase().includes(e.target.value)
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
      {pallets ? (
        <>
          <SearchBar onChange={handleSearch} />
          <div className="palletsContainer">
            {pallets.length > 0 ? (
              tableData.map(pallet => {
                return (
                  <Card
                    key={pallet._id}
                    title={pallet.customerId.name}
                    tools={
                      <div>
                        <Link to={`pallets/add/${pallet._id}`}>
                          <GiHammerNails className="--success" />
                        </Link>
                        <Link to={`pallets/item/${pallet._id}`}>
                          <GiWoodPile className="--success" />
                        </Link>
                        <Link to={`pallets/specialProcess/${pallet._id}`}>
                          <GiProcessor className="--success" />
                        </Link>
                        <Link to={`pallets/platform/${pallet._id}`}>
                          <GiTruck className="--success" />
                        </Link>
                        <Link to={`pallets/${pallet._id}`}>
                          <AiOutlineEdit className="--warning" />
                        </Link>
                        <AiOutlineDelete
                          className="--danger"
                          onClick={() => handleDeletePallet(pallet._id)}
                        />
                      </div>
                    }
                  >
                    <div className="palletCard">
                      <div className="palletCard__body">
                        <img
                          className="palletCard__img"
                          src={PalletImage}
                          alt="Tarima"
                        />
                        <div className="palletCard__info">
                          <h2 className="palletCard__title">{pallet.model}</h2>
                          <h3 className="palletCard__subtitle">
                            {pallet.description}
                          </h3>
                          <h4 className="palletCard__subtitle">
                            {pallet.width} cm - {pallet.height} cm -{' '}
                            {pallet.length} cm
                          </h4>
                          <h4 className="palletCard__subtitle">
                            Calidad: {pallet.qualityId[0]}
                          </h4>
                          {pallet.specialProcess &&
                          pallet.specialProcess.length > 1 ? (
                            <ul className="palletCard__list">
                              {pallet.specialProcess.map(special => {
                                console.log(special[0])
                                return (
                                  <li
                                    className="palletCard__item"
                                    key={special[0]._id}
                                    onClick={() =>
                                      handleDeleteSpecialProcess(
                                        pallet._id,
                                        special[0]._id
                                      )
                                    }
                                  >
                                    {special[0].name}
                                  </li>
                                )
                              })}
                            </ul>
                          ) : (
                            <ul className="palletCard__list">
                              <li className="palletCard__item --nonDelete">
                                Sin procesos especiales
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                      <div className="palletCard__specs">
                        <ul className="palletCard__list">
                          {pallet.items[0].id ? (
                            pallet.items.map(item => {
                              return (
                                <li
                                  key={item.id}
                                  className="palletCard__item"
                                  onClick={() =>
                                    handleDeleteItem(pallet._id, item.id)
                                  }
                                >
                                  {item.name}: {item.amount}
                                </li>
                              )
                            })
                          ) : (
                            <li className="palletCard__item --nonDelete">
                              Sin complementos
                            </li>
                          )}
                        </ul>
                        <ul className="palletCard__list">
                          {pallet.nails[0].nailId ? (
                            pallet.nails.map(nail => {
                              return (
                                <li
                                  key={nail.nailId}
                                  className="palletCard__item"
                                  onClick={() =>
                                    handleDeleteNail(pallet._id, nail.nailId)
                                  }
                                >
                                  {nail.name}: {nail.amount}
                                </li>
                              )
                            })
                          ) : (
                            <li className="palletCard__item --nonDelete">
                              Sin clavos
                            </li>
                          )}
                        </ul>
                        <ul className="palletCard__list">
                          {pallet.capacityCharge[0]._id ? (
                            pallet.capacityCharge.map(platform => {
                              return (
                                <li
                                  key={platform._id}
                                  className="palletCard__item"
                                  onClick={() =>
                                    handleDeletePlatform(
                                      pallet._id,
                                      platform._id
                                    )
                                  }
                                >
                                  {platform.name}: {platform.capacity}
                                </li>
                              )
                            })
                          ) : (
                            <li className="palletCard__item --nonDelete">
                              Sin capacidad de carga
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </Card>
                )
              })
            ) : (
              <h2>No hay tarimas en la base de datos</h2>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
      <Link to="/pallets/create">
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
  getAll,
  deleted,
  deleteObjectPallet,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pallets)
