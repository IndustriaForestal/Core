import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { BsPlus } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import {
  setTitle,
  getAll,
  get,
  deleted,
  addItemList,
  deleteItemList,
  createNewPallet,
  cleanNewPallet,
  create,
} from '../../actions/app'
import {
  deleteObjectPallet,
  functionNewPallet,
  functionNewPalletUpdate,
} from './actions'
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
    items,
    wood,
    itemsType,
    itemsList,
    newPallet,
    specialProcesses,
    specialProcessesPallets,
    units,
    stock,
    stock2,
    complements,
    complementsPallets,
    complementsList,
    user,
  } = props
  const [filter, setFilter] = useState([])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [color, setColor] = useState(false)
  const [logo, setLogo] = useState(false)
  const [cut, setCut] = useState(false)
  const [nail, setNail] = useState(0)
  const [specialProcessList, setSpecialProcessList] = useState([])
  const { register, handleSubmit, errors } = useForm()
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useForm()

  const role = user.role

  useEffect(() => {
    const topbar = {
      title: 'Tarimas',
      menu: {
        Tarimas: '/pallets',
        /*  Complementos: '/items',
        Clavos: '/nails',
        Calidades: '/qualities', */
      },
    }
    setTitle(topbar)

    props
      .getAll('pallets', 'GET_PALLETS')
      .then(() => {
        props.getAll('qualities', 'GET_QUALITIES')
      })
      .then(() => {
        props.getAll('customers', 'GET_CUSTOMERS')
      })
      .then(() => {
        props.getAll('specialProcesses', 'GET_SPECIAL_PROCESSES')
      })
      .then(() => {
        props.getAll('wood', 'GET_WOOD')
      })
      .then(() => {
        props.getAll('items/type', 'GET_ITEMS_TYPE')
      })
      .then(() => {
        props.getAll(
          'specialProcesses/pallets',
          'GET_SPECIAL_PROCESSES_PALLETS'
        )
      })
      .then(() => props.getAll('items', 'GET_ITEMS'))
      .then(() => props.getAll('complements', 'GET_COMPLEMENTS'))
      .then(() =>
        props.getAll('complements/pallets', 'GET_COMPLEMENTS_PALLETS')
      )
      .then(() => props.getAll('stock', 'GET_STOCK'))
      .then(() => props.getAll('stock/items', 'GET_STOCK_2'))
    // eslint-disable-next-line
  }, [])

  const onSubmit = data => {
    const search = pallets.filter(pallet => pallet.model === data.model)

    if (search.length > 0 && !newPallet.id) {
      Swal.fire('Replica!', 'La tarima ya existe.', 'info')
    } else {
      setVisible(false)
      setVisible2(true)
      props.createNewPallet(data)
    }
  }
  const onSubmitItems = data => {
    console.log(data)

    const verification = items.find(
      item =>
        item.height === parseFloat(data.height) &&
        item.length === parseFloat(data.length) &&
        item.width === parseFloat(data.width) &&
        parseInt(data.wood_id) === item.wood_id &&
        parseInt(data.item_type_id) === item.item_type_id &&
        item.serve_width === data.serve_width &&
        item.serve_height === data.serve_height &&
        item.serve_length === data.serve_length
    )

    const id = verification !== undefined ? verification.id : 0
    data.id = id
    console.log(verification)

    const verificationRedux = itemsList.find(
      item =>
        item.height === data.height &&
        item.length === data.length &&
        item.width === data.width &&
        data.wood_id === item.wood_id &&
        data.item_type_id === item.item_type_id &&
        item.serve_width === data.serve_width &&
        item.serve_height === data.serve_height &&
        item.serve_length === data.serve_length
    )

    if (data.complement_id) {
      const verificationComplementsRedux = itemsList.find(
        item => item.complement_id === data.complement_id
      )
      verificationComplementsRedux !== undefined
        ? Swal.fire('La pieza ya existe!', 'No se puede repetir.', 'info')
        : props.addItemList(data)
    } else {
      verificationRedux !== undefined
        ? Swal.fire('La pieza ya existe!', 'No se puede repetir.', 'info')
        : props.addItemList(data)
    }
    setNail(0)
    console.log(verificationRedux)

    document.getElementById('formItems').reset()
  }

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
        if (newPallet.id) {
          props
            .functionNewPalletUpdate(
              newPallet,
              newPallet.id,
              specialProcessList
            )
            .then(() => props.getAll('pallets', 'GET_PALLETS'))
            .then(() => props.getAll('items', 'GET_ITEMS'))
            .then(() =>
              props.getAll(
                'specialProcesses/pallets',
                'GET_SPECIAL_PROCESSES_PALLETS'
              )
            )
            .then(() => document.getElementById('formTarima').reset())
            .then(() => setVisible3(false))
        } else {
          props
            .functionNewPallet(newPallet, itemsList, specialProcessList)
            .then(() => props.getAll('pallets', 'GET_PALLETS'))
            .then(() => props.getAll('items', 'GET_ITEMS'))
            .then(() =>
              props.getAll(
                'specialProcesses/pallets',
                'GET_SPECIAL_PROCESSES_PALLETS'
              )
            )
            .then(() => document.getElementById('formTarima').reset())
            .then(() => setVisible3(false))
        }
      }
    })
  }

  if (
    pallets &&
    qualities &&
    wood &&
    itemsType &&
    itemsList &&
    customers &&
    specialProcesses &&
    items &&
    complements &&
    complementsPallets
  ) {
    const distinctPallets = []
    const map = new Map()
    for (const item of pallets) {
      if (!map.has(item.id)) {
        map.set(item.id, true) // set any value to Map
        distinctPallets.push(item)
      }
    }

    const handleSearch = e => {
      const searchWord = e.target.value.toLowerCase()
      const filterPallets = distinctPallets.filter(pallet =>
        pallet.model.toLowerCase().includes(searchWord)
      )
      setFilter(filterPallets)
    }

    let tableData
    if (filter.length > 0) {
      tableData = filter
    } else {
      tableData = distinctPallets
    }

    const handleEditPallet = id => {
      props
        .get(`pallets/${id}`, 'UPDATE_NEW_PALLET')
        .then(() => {
          props.get(`items/pallets/${id}`, 'UPDATE_NEW_PALLET_ITEMS')
        })
        .then(() => {
          props.get(
            `complements/pallets/${id}`,
            'UPDATE_NEW_PALLET_COMPLEMENTS'
          )
        })
        .then(() => {
          setVisible(true)
        })
    }

    const handleCreateItemListSQL = data => {
      data.pallet_id = newPallet.id

      const verification = items.find(
        item =>
          item.height === parseFloat(data.height) &&
          item.length === parseFloat(data.length) &&
          item.width === parseFloat(data.width) &&
          parseInt(data.wood_id) === item.wood_id &&
          parseInt(data.item_type_id) === item.item_type_id &&
          item.serve_width === data.serve_width &&
          item.serve_height === data.serve_height &&
          item.serve_length === data.serve_length
      )

      const id = verification !== undefined ? verification.id : 0
      data.id = id
      console.log(verification)
      console.log('SQL CREATE', data)

      if (data.complement_id) {
        const verificationComplementsRedux = complementsList.find(
          item => parseInt(item.complement_id) === parseInt(data.complement_id)
        )
        verificationComplementsRedux !== undefined
          ? Swal.fire('La pieza ya existe!', 'No se puede repetir.', 'info')
          : props
              .create(
                `complements/pallets/${newPallet.id}`,
                'UPDATE_ITEMS_ID',
                data
              )
              .then(() =>
                props.get(
                  `complements/pallets/${newPallet.id}`,
                  'UPDATE_NEW_PALLET_COMPLEMENTS'
                )
              )
      } else {
        props
          .create(`items`, 'UPDATE_ITEMS_ID', data)
          .then(() =>
            props.get(
              `items/pallets/${newPallet.id}`,
              'UPDATE_NEW_PALLET_ITEMS'
            )
          )
      }
      setNail(0)
    }

    const handleDeleteItemListSQL = id => {
      console.log('SQL DELETE')
      props
        .deleted(`items/${id}/${newPallet.id}`, 'DELETE_ITEMS_ID')
        .then(() =>
          props.get(`items/pallets/${newPallet.id}`, 'UPDATE_NEW_PALLET_ITEMS')
        )
    }

    const handleDeleteComplementListSQL = id => {
      console.log('SQL DELETE')
      props
        .deleted(`complements/${id}/${newPallet.id}`, 'DELETE_ITEMS_ID')
        .then(() =>
          props.get(
            `complements/pallets/${newPallet.id}`,
            'UPDATE_NEW_PALLET_COMPLEMENTS'
          )
        )
    }

    const handleClenaEdit = () => {
      props.cleanNewPallet()
      setVisible(false)
      setVisible2(false)
      setVisible3(false)
    }

    const handleDeletePallet = id => {
      const searchPallet = stock.find(pallet => id === pallet.id)

      const totalStock =
        searchPallet.damp +
        searchPallet.dry +
        searchPallet.repair +
        searchPallet.stock

      let totalStockItems = 0

      const itemsPallet = items
        .filter(item => item.id_pallet === id)
        .map(item => {
          const itemStock = stock2.find(s => s.id === item.id)
          totalStockItems +=
            itemStock.dry + itemStock.damp + itemStock.repair + itemStock.stock
          return itemStock
        })

      console.log(itemsPallet)

      if (totalStock > 0 && totalStockItems > 0) {
        Swal.fire('La tarima tiene existencias!', 'No se puede borrar.', 'info')
      } else {
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
              .deleted(`pallets/${id}`, 'DELETE_PALLET')
              .then(() => props.getAll('pallets', 'GET_PALLETS'))
              .then(() => props.getAll('items', 'GET_ITEMS'))
          }
        })
      }
    }

    const handleAddSpecialProcess = id => {
      if (id !== '') {
        setSpecialProcessList([...specialProcessList, id])
      }
    }

    const handleDeleteSpecialProcess = id => {
      setSpecialProcessList(specialProcessList.filter(sp => sp !== id))
    }

    const handleAddSpecialProcessSQL = (id, palletId) => {
      if (id !== '') {
        // setSpecialProcessList([...specialProcessList, id])
        props
          .create(
            `specialProcesses/${palletId}`,
            'CREATE_SPECIAL_PROCESS_NEW_PALLET_SQL',
            { id }
          )
          .then(() => {
            props.getAll(
              'specialProcesses/pallets',
              'GET_SPECIAL_PROCESSES_PALLETS'
            )
          })
      }
    }

    const handleDeleteSpecialProcessSQL = (specialProcessId, palletId) => {
      props
        .deleted(
          `specialProcesses/${palletId}/${specialProcessId}`,
          'DELETE_SPECIAL_PROCESS_NEW_PALLET_SQL'
        )
        .then(() => {
          props.getAll(
            'specialProcesses/pallets',
            'GET_SPECIAL_PROCESSES_PALLETS'
          )
        })
    }

    return (
      <>
        <SearchBar onChange={handleSearch} />
        <div className="palletsContainer">
          {pallets.length > 0 ? (
            tableData.map(pallet => {
              return (
                <Card
                  key={pallet.id}
                  title={
                    customers.filter(
                      customer => customer._id === pallet.customer_id
                    )[0].name
                  }
                  tools={
                    role === 'Administrador' ? (
                      <div>
                        <AiOutlineEdit
                          className="--warning"
                          onClick={() => handleEditPallet(pallet.id)}
                        />
                        <AiOutlineDelete
                          className="--danger"
                          onClick={() => handleDeletePallet(pallet.id)}
                        />
                      </div>
                    ) : null
                  }
                >
                  <div className="palletCard">
                    <div className="palletCard__body">
                      {pallet.img !== 'undefined' ? (
                        <img
                          className="palletCard__img"
                          src={`${process.env.REACT_APP_API}docs/pallets/${pallet.img}`}
                          alt="Tarima"
                        />
                      ) : null}

                      <div className="palletCard__info">
                        <h2 className="palletCard__title">{pallet.model}</h2>
                        <h3 className="palletCard__subtitle">
                          {pallet.description}
                        </h3>
                        <h3 className="palletCard__subtitle">
                          {pallet.color_comment !== null
                            ? `Pintura ${pallet.color_comment}`
                            : null}
                        </h3>
                        <h3 className="palletCard__subtitle">
                          {pallet.logo_comment !== null
                            ? `Sello ${pallet.logo_comment}`
                            : null}
                        </h3>
                        <h4 className="palletCard__subtitle">
                          {units
                            ? (parseFloat(pallet.width) / 2.54).toFixed(2)
                            : pallet.width}{' '}
                          {units ? 'in' : 'cm'} -{' '}
                          {units
                            ? (parseFloat(pallet.height) / 2.54).toFixed(2)
                            : pallet.height}{' '}
                          {units ? 'in' : 'cm'} - {''}
                          {units
                            ? (parseFloat(pallet.length) / 2.54).toFixed(2)
                            : pallet.length}{' '}
                          {units ? 'in' : 'cm'}
                          {/* 2.54 */}
                        </h4>
                        <h4 className="palletCard__subtitle">
                          {
                            qualities.find(
                              quality => quality.id === pallet.quality_id
                            ).name
                          }
                        </h4>
                        {specialProcessesPallets.filter(
                          sp => sp.id === pallet.id
                        ).length > 0 ? (
                          <ul className="palletCard__list">
                            {specialProcessesPallets
                              .filter(sp => sp.id === pallet.id)
                              .map((sp, index) => (
                                <li key={index} className="palletCard__item">
                                  {specialProcesses.find(
                                    special =>
                                      special.id ===
                                      parseInt(sp.special_process_id)
                                  )
                                    ? specialProcesses.find(
                                        special =>
                                          special.id ===
                                          parseInt(sp.special_process_id)
                                      ).name
                                    : null}
                                </li>
                              ))}
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
                        {items
                          .filter(item => item.id_pallet === pallet.id)
                          .map(item => {
                            return (
                              <li key={item.id} className="palletCard__item">
                                {
                                  itemsType.filter(
                                    itemType =>
                                      itemType.id === item.item_type_id
                                  )[0].name
                                }{' '}
                                {item.item_type_id === 4 ? (
                                  <span>
                                    {item.amount_new} {item.nail}
                                  </span>
                                ) : (
                                  <span>
                                    {item.amount_new}{' '}
                                    {units
                                      ? (parseFloat(item.width) / 2.54).toFixed(
                                          2
                                        )
                                      : item.width}{' '}
                                    {units ? 'in' : 'cm'} -{' '}
                                    {units
                                      ? (
                                          parseFloat(item.height) / 2.54
                                        ).toFixed(2)
                                      : item.height}{' '}
                                    {units ? 'in' : 'cm'} - {''}
                                    {units
                                      ? (
                                          parseFloat(item.length) / 2.54
                                        ).toFixed(2)
                                      : item.length}{' '}
                                    {units ? 'in' : 'cm'}
                                    {item.serve_width !== null ? (
                                      <span>
                                        {' '}
                                        <HiOutlineArrowRight />
                                        {' Saque '}
                                        {units
                                          ? (
                                              parseFloat(item.serve_width) /
                                              2.54
                                            ).toFixed(2)
                                          : item.serve_width}
                                        {units ? 'in' : 'cm'} - {''}
                                        {units
                                          ? (
                                              parseFloat(item.serve_height) /
                                              2.54
                                            ).toFixed(2)
                                          : item.serve_height}{' '}
                                        {units ? 'in' : 'cm'} - {''}
                                        {units
                                          ? (
                                              parseFloat(item.serve_length) /
                                              2.54
                                            ).toFixed(2)
                                          : item.serve_length}{' '}
                                        {units ? 'in' : 'cm'} - {''}
                                        {units
                                          ? (
                                              parseFloat(item.serve_start) /
                                              2.54
                                            ).toFixed(2)
                                          : item.serve_start}{' '}
                                        {units ? 'in' : 'cm'}
                                      </span>
                                    ) : null}
                                  </span>
                                )}
                              </li>
                            )
                          })}
                        {complementsPallets
                          .filter(
                            complement => complement.pallet_id === pallet.id
                          )
                          .map(complement => (
                            <li>
                              {complement.name} - {complement.amount}
                            </li>
                          ))}
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
                          <option
                            key={customer._id}
                            value={customer._id}
                            selected={
                              newPallet &&
                              newPallet.customer_id === customer._id
                                ? true
                                : false
                            }
                          >
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
                  value={newPallet.model ? newPallet.model : null}
                  passRef={register({ required: true })}
                  className={errors.model && '--required'}
                />
                <Input
                  type="text"
                  name="description"
                  title="Descripción"
                  value={newPallet.description ? newPallet.description : null}
                  passRef={register({ required: true })}
                  className={errors.description && '--required'}
                />
                <div className="modal__grid__small">
                  <Input
                    type="text"
                    name="width"
                    value={newPallet.width ? newPallet.width : null}
                    title={`Ancho ${units ? 'in' : 'cm'}`}
                    passRef={register({ required: true })}
                    className={errors.width && '--required'}
                  />
                  <Input
                    type="text"
                    name="height"
                    value={newPallet.height ? newPallet.height : null}
                    title={`Alto ${units ? 'in' : 'cm'}`}
                    passRef={register({ required: true })}
                    className={errors.height && '--required'}
                  />
                  <Input
                    type="text"
                    name="length"
                    value={newPallet.length ? newPallet.length : null}
                    title={`Largo ${units ? 'in' : 'cm'}`}
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
                          <option
                            key={quality.id}
                            value={quality.id}
                            selected={
                              newPallet && newPallet.quality_id === quality.id
                                ? true
                                : false
                            }
                          >
                            {quality.name}
                          </option>
                        )
                      })}
                    </select>
                  </label>
                </div>
                <div className="inputGroup">
                  <label htmlFor="special_process_id">
                    <select
                      name="special_process_id"
                      onChange={
                        newPallet.id
                          ? e =>
                              handleAddSpecialProcessSQL(
                                e.target.value,
                                newPallet.id
                              )
                          : e => handleAddSpecialProcess(e.target.value)
                      }
                    >
                      <option value="">Sin requerimiento de calidad</option>
                      {specialProcesses.map(specialProcess => {
                        return (
                          <option
                            key={specialProcess.id}
                            value={specialProcess.id}
                          >
                            {specialProcess.name}
                          </option>
                        )
                      })}
                    </select>
                  </label>
                </div>
                <div className="inputGroup specialProcess__container">
                  {newPallet.id
                    ? specialProcessesPallets.filter(
                        sp => sp.id === newPallet.id
                      ).length > 0
                      ? specialProcessesPallets
                          .filter(sp => sp.id === newPallet.id)
                          .map((sp, index) => (
                            <div
                              className="specialProcess__box"
                              onClick={() =>
                                handleDeleteSpecialProcessSQL(
                                  newPallet.id,
                                  sp.special_process_id
                                )
                              }
                              key={index}
                            >
                              {specialProcesses.find(
                                special =>
                                  special.id === parseInt(sp.special_process_id)
                              )
                                ? specialProcesses.find(
                                    special =>
                                      special.id ===
                                      parseInt(sp.special_process_id)
                                  ).name
                                : null}
                            </div>
                          ))
                      : null
                    : specialProcessList.length > 0
                    ? specialProcessList.map((process, index) => {
                        console.log(process)
                        return (
                          <div
                            className="specialProcess__box"
                            onClick={() => handleDeleteSpecialProcess(process)}
                            key={index}
                          >
                            {
                              specialProcesses.find(
                                sp => parseInt(sp.id) === parseInt(process)
                              ).name
                            }
                          </div>
                        )
                      })
                    : null}
                </div>
              </div>
              <div>
                <div className="modal__grid__small__2">
                  <Input
                    type="text"
                    name="humedity_min"
                    value={
                      newPallet.humedity_min ? newPallet.humedity_min : null
                    }
                    title="Min Humedad"
                    passRef={register}
                  />
                  <Input
                    type="text"
                    name="humedity_max"
                    value={
                      newPallet.humedity_max ? newPallet.humedity_max : null
                    }
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
                  value={
                    newPallet.color_comment ? newPallet.color_comment : null
                  }
                  className={color || newPallet.color_comment ? null : 'hidde'}
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
                  value={newPallet.logo_comment ? newPallet.logo_comment : null}
                  className={logo || newPallet.logo_comment ? null : 'hidde'}
                  passRef={register}
                />
                <Input
                  type="file"
                  name="pdf"
                  title="PDF"
                  passRef={
                    newPallet.pdf === undefined
                      ? register({ required: true })
                      : register({ required: false })
                  }
                  className={errors.pdf && '--required'}
                />
                <Input
                  type="file"
                  name="image"
                  title="Imagen"
                  passRef={register}
                />
                <div className="formNail__buttons">
                  <Button
                    type="button"
                    className="btn --danger"
                    onClick={() => handleClenaEdit()}
                  >
                    Cancelar
                  </Button>
                  {newPallet.id ? (
                    <input
                      type="hidden"
                      defaultValue={newPallet.id}
                      name="id"
                      ref={register}
                    />
                  ) : null}
                  <Button type="submit" className="btn --success">
                    Siguiente
                  </Button>
                </div>
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
              onSubmit={
                newPallet && newPallet.id
                  ? handleSubmit2(handleCreateItemListSQL)
                  : handleSubmit2(onSubmitItems)
              }
            >
              <div>
                <div className="inputGroup">
                  <label htmlFor="item_type_id">
                    <span>Tipo:</span>
                    <select
                      name="item_type_id"
                      ref={register2}
                      onChange={e => setNail(parseInt(e.target.value))}
                    >
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
                {nail === 4 ? (
                  <div className="inputGroup">
                    <label htmlFor="complement_id">
                      <span>Tipo:</span>
                      <select name="complement_id" ref={register2}>
                        {complements.map(complement => {
                          return (
                            <option key={complement.id} value={complement.id}>
                              {complement.name}
                            </option>
                          )
                        })}
                      </select>
                    </label>
                  </div>
                ) : (
                  <>
                    <Input
                      type="text"
                      name="width"
                      title={`Ancho ${units ? 'in' : 'cm'}`}
                      passRef={register2({ required: true })}
                      className={errors2.width && '--required'}
                    />
                    <Input
                      type="text"
                      name="height"
                      title={`Alto ${units ? 'in' : 'cm'}`}
                      passRef={register2({ required: true })}
                      className={errors2.height && '--required'}
                    />
                    <Input
                      type="text"
                      name="length"
                      title={`Largo ${units ? 'in' : 'cm'}`}
                      passRef={register2({ required: true })}
                      className={errors2.length && '--required'}
                    />
                  </>
                )}
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
                    title={`Ancho ${units ? 'in' : 'cm'}`}
                    passRef={register2}
                  />
                  <Input
                    type="text"
                    name="serve_height"
                    title={`Alto ${units ? 'in' : 'cm'}`}
                    passRef={register2}
                  />
                  <Input
                    type="text"
                    name="serve_length"
                    title={`Largo ${units ? 'in' : 'cm'}`}
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
                    <td>Complemento</td>
                    <td>Ancho Saque</td>
                    <td>Alto Saque</td>
                    <td>Largo Saque</td>
                    <td>Inicio</td>
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
                        <td>
                          {newPallet && newPallet.id
                            ? item.amount_new
                            : item.amount}
                        </td>
                        <td>{item.width ? item.width : 'N/A'}</td>
                        <td>{item.height ? item.height : 'N/A'}</td>
                        <td>{item.length ? item.length : 'N/A'}</td>
                        <td>
                          {item.complement_id
                            ? complements &&
                              complements.find(
                                complement =>
                                  complement.id === parseInt(item.complement_id)
                              ).name
                            : 'N/A'}
                        </td>
                        <td>
                          {item.serve_width !== '' ? item.serve_width : 'N/A'}
                        </td>
                        <td>
                          {item.serve_height !== '' ? item.serve_height : 'N/A'}
                        </td>
                        <td>
                          {item.serve_length !== '' ? item.serve_length : 'N/A'}
                        </td>
                        <td>{item.start !== '' ? item.start : 'N/A'}</td>
                        <td>
                          {item.wood_id > 0
                            ? wood.find(w => w.id === parseInt(item.wood_id))
                                .name
                            : 'N/A'}
                        </td>
                        <td>
                          <Button
                            className="btn --danger"
                            onClick={
                              item.id
                                ? () => handleDeleteItemListSQL(item.id)
                                : () => handleDeleteItemList(index)
                            }
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
                  {complementsList && complementsList.length > 0
                    ? complementsList.map((complement, index) => (
                        <tr key={index}>
                          <td>Complemento</td>
                          <td>{complement.amount}</td>
                          <td>{'N/A'}</td>
                          <td>{'N/A'}</td>
                          <td>{'N/A'}</td>
                          <td>
                            {complement.complement_id
                              ? complements &&
                                complements.find(
                                  c =>
                                    c.id === parseInt(complement.complement_id)
                                ).name
                              : 'N/A'}
                          </td>
                          <td>{'N/A'}</td>
                          <td>{'N/A'}</td>
                          <td>{'N/A'}</td>
                          <td>{'N/A'}</td>
                          <td>{'N/A'}</td>
                          <td>
                            <Button
                              className="btn --danger"
                              onClick={() =>
                                handleDeleteComplementListSQL(complement.id)
                              }
                            >
                              <AiOutlineDelete />
                            </Button>
                          </td>
                        </tr>
                      ))
                    : null}
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
                <img src={URL.createObjectURL(newPallet.image[0])} alt="img" />
              ) : (
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
                    <td>Complemento</td>
                    <td>Ancho Saque</td>
                    <td>Alto Saque</td>
                    <td>Largo Saque</td>
                    <td>Inicio</td>
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
                        <td>
                          {newPallet && newPallet.id
                            ? item.amount_new
                            : item.amount}
                        </td>
                        <td>{item.width ? item.width : 'N/A'}</td>
                        <td>{item.height ? item.height : 'N/A'}</td>
                        <td>{item.length ? item.length : 'N/A'}</td>
                        <td>
                          {item.complement_id
                            ? complements &&
                              complements.find(
                                complement =>
                                  complement.id === parseInt(item.complement_id)
                              ).name
                            : 'N/A'}
                        </td>
                        <td>
                          {item.serve_width !== '' ? item.serve_width : 'N/A'}
                        </td>
                        <td>
                          {item.serve_height !== '' ? item.serve_height : 'N/A'}
                        </td>
                        <td>
                          {item.serve_length !== '' ? item.serve_length : 'N/A'}
                        </td>
                        <td>{item.start !== '' ? item.start : 'N/A'}</td>
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
        <AddButton onClick={() => setVisible(true)}>
          <BsPlus />
        </AddButton>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    pallets: state.reducerPallets.pallets,
    complementsList: state.reducerComplements.complementsList,
    pallet: state.reducerPallets.pallet,
    qualities: state.reducerQualities.qualities,
    wood: state.reducerWood.wood,
    itemsType: state.reducerItems.itemsType,
    itemsList: state.reducerItems.itemsList,
    user: state.reducerApp.user,
    newPallet: state.reducerPallets.newPallet,
    customers: state.reducerCustomers.customers,
    specialProcesses: state.reducerSpecialProcesses.specialProcesses,
    specialProcessesPallets:
      state.reducerSpecialProcesses.specialProcessesPallets,
    items: state.reducerItems.items,
    units: state.reducerApp.units,
    stock: state.reducerStock.stock,
    stock2: state.reducerStock.stock2,
    complements: state.reducerComplements.complements,
    complementsPallets: state.reducerComplements.complementsPallets,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  get,
  create,
  functionNewPalletUpdate,
  deleted,
  deleteObjectPallet,
  addItemList,
  deleteItemList,
  createNewPallet,
  functionNewPallet,
  cleanNewPallet,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pallets)
