import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { GiHammerNails, GiWoodPile, GiProcessor, GiTruck } from 'react-icons/gi'
import { BsPlus } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import {
  setTitle,
  getAll,
  deleted,
  addItemList,
  deleteItemList,
  createNewPallet,
} from '../../actions/app'
import { deleteObjectPallet, functionNewPallet } from './actions'
import Swal from 'sweetalert2'
import Rodal from 'rodal'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading/Loading'
import SearchBar from '../../components/SearchBar/SearchBar'
import PalletImage from '../../assets/static/pallet.png'
import Input from '../../components/Input/Input'

// include styles
import 'rodal/lib/rodal.css'
import './styles.scss'

const Pallets = props => {
  const {
    pallets,
    qualities,
    setTitle,
    customers,
    role,
    wood,
    itemsType,
    itemsList,
    newPallet,
    specialProcesses,
  } = props
  const [filter, setFilter] = useState([])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [color, setColor] = useState(false)
  const [logo, setLogo] = useState(false)
  const [cut, setCut] = useState(false)
  const [unit, setUnits] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useForm()

  const onSubmit = data => {
    const search = pallets.filter(pallet => pallet.model === data.model)

    if (search.length > 0) {
      Swal.fire('Replica!', 'La tarima ya existe.', 'info')
    } else {
      setVisible(false)
      setVisible2(true)
      props.createNewPallet(data)
    }
  }
  const onSubmitItems = data => {
    props.addItemList(data)
    document.getElementById('formItems').reset()
  }

  useEffect(() => {
    const topbar = {
      title: 'Tarimas',
      menu: {
        Tarimas: '/pallets',
        Complementos: '/items',
        Clavos: '/nails',
        Calidades: '/qualities',
      },
    }
    setTitle(topbar)
    props.getAll('pallets', 'GET_PALLETS').then(() => {
      props.getAll('qualities', 'GET_QUALITIES').then(() => {
        props.getAll('customers', 'GET_CUSTOMERS').then(() => {
          props.getAll('specialProcesses', 'GET_SPECIAL_PROCESSES')
        })
      })
    })
    // eslint-disable-next-line
  }, [])

  const handleDeleteItemList = id => {
    props.deleteItemList(id)
  }

  const handleSaveNewPallet = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
    }).then(result => {
      if (result.isConfirmed) {
        props
          .functionNewPallet(newPallet, itemsList)
          .then(() => props.getAll('pallets', 'GET_PALLETS'))
          .then(() => document.getElementById('formTarima').reset())
          .then(() => setVisible3(false))
      }
    })
  }

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
        props
          .deleteObjectPallet(
            `pallets/platform/delete/${palletId}/${platformId}`,
            'DELETE_PLATFORM_PALLET'
          )
          .then(() => Swal.fire('Borrado!', 'Borrado con exito.', 'success'))
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
      {pallets &&
      qualities &&
      wood &&
      itemsType &&
      itemsList &&
      customers &&
      specialProcesses ? (
        <>
          <SearchBar onChange={handleSearch} />
          <FormControlLabel
            control={
              <Switch
                value="checkedA"
                inputProps={{ 'aria-label': 'cm / in' }}
                color="primary"
                onChange={() => setUnits(!unit)}
              />
            }
            label="cm / in"
          />
          <div className="palletsContainer">
            {pallets.length > 0 ? (
              tableData.map(pallet => {
                return (
                  <Card
                    key={pallet._id}
                    title={pallet.customerId ? pallet.customerId.name : null}
                    tools={
                      role === 'Administrador' ? (
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
                      ) : null
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
                            {pallet.width} in - {pallet.height} in - {''}
                            {pallet.length} in
                          </h4>
                          <h4 className="palletCard__subtitle">
                            Calidad: {pallet.qualityId[0]}
                          </h4>
                          {pallet.specialProcess &&
                          pallet.specialProcess.length > 0 ? (
                            <ul className="palletCard__list">
                              {pallet.specialProcess.map(special => {
                                if (special.length > 0) {
                                  return (
                                    <li
                                      className="palletCard__item"
                                      key={special[0]._id}
                                      onClick={
                                        role === 'Administrador'
                                          ? () =>
                                              handleDeleteSpecialProcess(
                                                pallet._id,
                                                special[0]._id
                                              )
                                          : null
                                      }
                                    >
                                      {special[0].name}
                                    </li>
                                  )
                                }
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
                            pallet.items.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  className="palletCard__item"
                                  onClick={
                                    role === 'Administrador'
                                      ? () =>
                                          handleDeleteItem(pallet._id, item.id)
                                      : null
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
                            pallet.nails.map((nail, index) => {
                              return (
                                <li
                                  key={index}
                                  className="palletCard__item"
                                  onClick={
                                    role === 'Administrador'
                                      ? () =>
                                          handleDeleteNail(
                                            pallet._id,
                                            nail.nailId
                                          )
                                      : null
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
                                  onClick={
                                    role === 'Administrador'
                                      ? () =>
                                          handleDeletePlatform(
                                            pallet._id,
                                            platform._id
                                          )
                                      : null
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
              <h2>Sin registros</h2>
            )}
          </div>
          <Rodal
            visible={visible}
            height={500}
            width={800}
            onClose={() => setVisible(false)}
          >
            <div>Información Tarima</div>
            <div>
              <form
                id="formTarima"
                className="modal__grid"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <div className="inputGroup">
                    <label htmlFor="customer_id">
                      <span>Cliente</span>
                      <select name="customer_id" ref={register}>
                        {customers.map(customer => {
                          return (
                            <option key={customer._id} value={customer._id}>
                              {customer.name}
                            </option>
                          )
                        })}
                      </select>
                    </label>
                  </div>
                  <Input
                    type="text"
                    name="model"
                    title="Modelo"
                    passRef={register({ required: true })}
                    className={errors.model && '--required'}
                  />
                  <Input
                    type="text"
                    name="description"
                    title="Descripción"
                    passRef={register({ required: true })}
                    placeholder={errors.description && 'Campo requerido'}
                  />
                  <div className="modal__grid__small">
                    <Input
                      type="text"
                      name="width"
                      title={`Ancho ${unit ? 'in' : 'cm'}`}
                      passRef={register({ required: true })}
                      className={errors.width && '--required'}
                    />
                    <Input
                      type="text"
                      name="height"
                      title={`Alto ${unit ? 'in' : 'cm'}`}
                      passRef={register({ required: true })}
                      className={errors.height && '--required'}
                    />
                    <Input
                      type="text"
                      name="length"
                      title={`Largo ${unit ? 'in' : 'cm'}`}
                      passRef={register({ required: true })}
                      className={errors.length && '--required'}
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="quality_id">
                      <span>Calidad</span>
                      <select name="quality_id" ref={register}>
                        {qualities.map(quality => {
                          return (
                            <option key={quality._id} value={quality._id}>
                              {quality.name}
                            </option>
                          )
                        })}
                      </select>
                    </label>
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="special_process_id">
                      <select name="special_process_id" ref={register}>
                        <option value="">Sin Proceso Especial</option>
                        {specialProcesses.map(specialProcess => {
                          return (
                            <option
                              key={specialProcess._id}
                              value={specialProcess._id}
                            >
                              {specialProcess.name}
                            </option>
                          )
                        })}
                      </select>
                    </label>
                  </div>
                </div>
                <div>
                  <div className="modal__grid__small__2">
                    <Input
                      type="text"
                      name="humedity_min"
                      title="Min Humedad"
                      passRef={register}
                    />
                    <Input
                      type="text"
                      name="humedity_max"
                      title="Max Humedad"
                      passRef={register}
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="color">
                      <span>Pintura</span>
                      <input
                        name="color"
                        type="checkbox"
                        onChange={() => setColor(!color)}
                      />
                    </label>
                  </div>

                  <Input
                    type="text"
                    name="color_commnet"
                    title="Cometario"
                    className={color ? null : 'hidde'}
                    passRef={register}
                  />
                  <div className="inputGroup">
                    <label htmlFor="logo">
                      <span>Sello</span>
                      <input
                        name="logo"
                        type="checkbox"
                        onChange={() => setLogo(!logo)}
                      />
                    </label>
                  </div>

                  <Input
                    type="text"
                    name="logo_commnet"
                    title="Cometario"
                    className={logo ? null : 'hidde'}
                    passRef={register}
                  />
                  <Input
                    type="file"
                    name="pdf"
                    title="PDF"
                    passRef={register({ required: true })}
                    className={errors.pdf && '--required'}
                  />
                  <Input
                    type="file"
                    name="image"
                    title="Imagen"
                    passRef={register}
                  />
                </div>
                <div className="formNail__buttons">
                  <Button type="submit" className="btn --success">
                    Siguiente
                  </Button>
                </div>
              </form>
            </div>
          </Rodal>
          <Rodal
            visible={visible2}
            height={500}
            width={1100}
            onClose={() => setVisible2(false)}
          >
            <div>Complementos</div>
            <div className="modal__grid">
              <form
                id="formItems"
                className="formTarima modal__grid__3"
                onSubmit={handleSubmit2(onSubmitItems)}
              >
                <div>
                  <div className="inputGroup">
                    <label htmlFor="item_type_id">
                      <span>Tipo:</span>
                      <select name="item_type_id" ref={register2}>
                        {itemsType.map(type => {
                          return (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          )
                        })}
                      </select>
                    </label>
                  </div>
                  <Input
                    type="number"
                    name="amount"
                    title="Cantidad"
                    passRef={register2({ required: true })}
                    className={errors2.amount && '--required'}
                  />
                  <Input
                    type="text"
                    name="width"
                    title={`Ancho ${unit ? 'in' : 'cm'}`}
                    passRef={register2({ required: true })}
                    className={errors2.width && '--required'}
                  />
                  <Input
                    type="text"
                    name="height"
                    title={`Alto ${unit ? 'in' : 'cm'}`}
                    passRef={register2({ required: true })}
                    className={errors2.height && '--required'}
                  />
                  <Input
                    type="text"
                    name="length"
                    title={`Largo ${unit ? 'in' : 'cm'}`}
                    passRef={register2({ required: true })}
                    className={errors2.length && '--required'}
                  />
                </div>
                <div>
                  <div className="inputGroup">
                    <label htmlFor="color">
                      <span>Saque</span>
                      <input
                        name="color"
                        type="checkbox"
                        onChange={() => setCut(!cut)}
                      />
                    </label>
                  </div>
                  <div className={`modal__grid__small ${cut ? null : 'hidde'}`}>
                    <Input
                      type="text"
                      name="serve_width"
                      title={`Ancho ${unit ? 'in' : 'cm'}`}
                      passRef={register2}
                    />
                    <Input
                      type="text"
                      name="serve_height"
                      title={`Alto ${unit ? 'in' : 'cm'}`}
                      passRef={register2}
                    />
                    <Input
                      type="text"
                      name="serve_length"
                      title={`Largo ${unit ? 'in' : 'cm'}`}
                      passRef={register2}
                    />
                    <Input
                      type="text"
                      name="start"
                      title="Inicio"
                      passRef={register2}
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="wood_id">
                      <span>Madera:</span>
                      <select name="wood_id" ref={register2}>
                        <option value="0">N/A</option>
                        {wood.map(w => {
                          return (
                            <option key={w.id} value={w.id}>
                              {w.name}
                            </option>
                          )
                        })}
                      </select>
                    </label>
                  </div>
                  <div className="formNail__buttons">
                    <Button type="submit" className="btn --success">
                      Agregar
                    </Button>
                  </div>
                </div>
              </form>
              <div className="tablePallet">
                <table className="tablePallet__container">
                  <thead>
                    <tr>
                      <td>Tipo</td>
                      <td>Cant</td>
                      <td>Ancho</td>
                      <td>Alto</td>
                      <td>Largo</td>
                      <td>Ancho Saque</td>
                      <td>Alto Saque</td>
                      <td>Largo Saque</td>
                      <td>Madera</td>
                      <td>Acciones</td>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsList.length > 0 ? (
                      itemsList.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {
                              itemsType.find(
                                itemType =>
                                  itemType.id === parseInt(item.item_type_id)
                              ).name
                            }
                          </td>
                          <td>{item.amount}</td>
                          <td>{item.width}</td>
                          <td>{item.height}</td>
                          <td>{item.length}</td>
                          <td>
                            {item.serve_width !== '' ? item.serve_width : 'N/A'}
                          </td>
                          <td>
                            {item.serve_height !== ''
                              ? item.serve_height
                              : 'N/A'}
                          </td>
                          <td>
                            {item.serve_length !== ''
                              ? item.serve_length
                              : 'N/A'}
                          </td>
                          <td>
                            {item.wood_id > 0
                              ? wood.find(w => w.id === parseInt(item.wood_id))
                                  .name
                              : 'N/A'}
                          </td>
                          <td>
                            <Button
                              className="btn --danger"
                              onClick={() => handleDeleteItemList(index)}
                            >
                              <AiOutlineDelete />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10">Sin Complementos</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div>
                <Button
                  type="button"
                  className="btn --info"
                  onClick={() => {
                    setVisible(true)
                    setVisible2(false)
                  }}
                >
                  Atras
                </Button>

                <Button
                  type="button"
                  className="btn --success"
                  onClick={() => {
                    if (itemsList.length > 0) {
                      setVisible3(true)
                      setVisible2(false)
                    } else {
                      Swal.fire(
                        'Cuidado!',
                        'No hay complementos en la tarima.',
                        'info'
                      )
                    }
                  }}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </Rodal>
          <Rodal
            visible={visible3}
            height={500}
            width={1100}
            onClose={() => setVisible3(false)}
          >
            <div>Finalizado</div>
            <div className="modal__grid">
              <div>
                {newPallet.image && newPallet.image.length > 0 ? (
                  <img
                    src={URL.createObjectURL(newPallet.image[0])}
                    alt="img"
                  />
                ) : (
                  // console.log(URL.createObjectURL(newPallet.image[0]))
                  <img src={PalletImage} alt="img" />
                )}
                <h4>
                  Cliente:
                  {newPallet.customer_id
                    ? customers.filter(
                        customer => customer._id === newPallet.customer_id
                      )[0].name
                    : null}
                </h4>
                <h4>Modelo: {newPallet.model}</h4>
                <h4>Ancho: {newPallet.width}</h4>
                <h4>Alto: {newPallet.height}</h4>
                <h4>Largo: {newPallet.length}</h4>
              </div>
              <div className="tablePallet">
                <table className="tablePallet__container">
                  <thead>
                    <tr>
                      <td>Tipo</td>
                      <td>Cant</td>
                      <td>Ancho</td>
                      <td>Alto</td>
                      <td>Largo</td>
                      <td>Ancho Saque</td>
                      <td>Alto Saque</td>
                      <td>Largo Saque</td>
                      <td>Madera</td>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsList.length > 0 ? (
                      itemsList.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {
                              itemsType.find(
                                itemType =>
                                  itemType.id === parseInt(item.item_type_id)
                              ).name
                            }
                          </td>
                          <td>{item.amount}</td>
                          <td>{item.width}</td>
                          <td>{item.height}</td>
                          <td>{item.length}</td>
                          <td>
                            {item.serve_width !== '' ? item.serve_width : 'N/A'}
                          </td>
                          <td>
                            {item.serve_height !== ''
                              ? item.serve_height
                              : 'N/A'}
                          </td>
                          <td>
                            {item.serve_length !== ''
                              ? item.serve_length
                              : 'N/A'}
                          </td>
                          <td>
                            {item.wood_id > 0
                              ? wood.find(w => w.id === parseInt(item.wood_id))
                                  .name
                              : 'N/A'}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9">Sin Complementos</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <Button
              type="button"
              className="btn --success"
              onClick={() => handleSaveNewPallet()}
            >
              Guardar
            </Button>
            <Button
              type="button"
              className="btn --info"
              onClick={() => {
                setVisible2(true)
                setVisible3(false)
              }}
            >
              Atras
            </Button>
          </Rodal>
        </>
      ) : (
        <Loading />
      )}
      <AddButton onClick={() => setVisible(true)}>
        <BsPlus />
      </AddButton>
    </>
  )
}

const mapStateToProps = state => {
  return {
    pallets: state.pallets,
    qualities: state.qualities,
    wood: state.wood,
    itemsType: state.itemsType,
    itemsList: state.itemsList,
    role: state.role,
    newPallet: state.newPallet,
    customers: state.customers,
    specialProcesses: state.specialProcesses,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  deleteObjectPallet,
  addItemList,
  deleteItemList,
  createNewPallet,
  functionNewPallet,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pallets)
