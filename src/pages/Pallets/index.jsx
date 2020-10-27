import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { GiHammerNails, GiWoodPile, GiProcessor, GiTruck } from 'react-icons/gi'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../actions/app'
import Swal from 'sweetalert2'
import AddButton from '../../components/AddButton/AddButton'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading/Loading'
import PalletImage from '../../assets/static/pallet.png'
import './styles.scss'

const Pallets = props => {
  const { pallets, setTitle } = props

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

  useEffect(() => {
    const topbar = {
      title: 'Tarimas',
      menu: { Tarimas: '/pallets' },
    }
    setTitle(topbar)
    props.getAll('pallets', 'GET_PALLETS')
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {pallets ? (
        <div className="palletsContainer">
          {pallets.length > 0 ? (
            pallets.map(pallet => {
              return (
                <Card
                  key={pallet._id}
                  title={pallet.customerId.name}
                  tools={
                    <div>
                      <Link to={`pallets`}>
                        <GiHammerNails className="--success" />
                      </Link>
                      <Link to={`pallets`}>
                        <GiWoodPile className="--success" />
                      </Link>
                      <Link to={`pallets`}>
                        <GiProcessor className="--success" />
                      </Link>
                      <Link to={`pallets`}>
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
                        pallet.specialProcess.length > 0 ? (
                          <ul className="palletCard__list">
                            <li className="palletCard__item">Lista de cosas</li>
                            <li className="palletCard__item">Lista de cosas</li>
                            <li className="palletCard__item">Lista de cosas</li>
                          </ul>
                        ) : (
                          <ul className="palletCard__list">
                            <li className="palletCard__item">
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
                              <li key={item.id} className="palletCard__item">
                                {item.name}: {item.amount}
                              </li>
                            )
                          })
                        ) : (
                          <li className="palletCard__item">Sin complementos</li>
                        )}
                      </ul>
                      <ul className="palletCard__list">
                        {pallet.nails[0].nailId ? (
                          pallet.nails.map(nail => {
                            return (
                              <li
                                key={nail.nailId}
                                className="palletCard__item"
                              >
                                {nail.name}: {nail.amount}
                              </li>
                            )
                          })
                        ) : (
                          <li className="palletCard__item">Sin clavos</li>
                        )}
                      </ul>
                      <ul className="palletCard__list">
                        {pallet.capacityCharge[0]._id ? (
                          pallet.capacityCharge.map(platform => {
                            return (
                              <li
                                key={platform._id}
                                className="palletCard__item"
                              >
                                {platform.name}: {platform.capacity}
                              </li>
                            )
                          })
                        ) : (
                          <li className="palletCard__item">
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Pallets)
