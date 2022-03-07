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
import { inToCm } from '../../../utils'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'
import Select from 'react-select'
import MaterialTable from 'material-table'

const Nails = props => {
  const {
    pallets,
    items,
    plants,
    zones,
    subzones,
    wood,
    setTitle,
    sawn,
    stockZoneSawn,
    stockZoneItems,
    stockZone,
    stockZoneRaws,
    stockZoneComplements,
    complements,
    units,
    user,
  } = props
  const [type, setType] = useState(0)
  const [idSelected, setIdSelected] = useState(0)
  const [inOut, setInOut] = useState(0)
  const [amount, setAmount] = useState(0)
  const [greenDryRepair, setGreenDryRepair] = useState(null)
  const [woodSelected, setWood] = useState()
  const [plantSelected, setPlant] = useState(null)
  const [zoneSelected, setZone] = useState(null)
  const [subzoneSelected, setSubzone] = useState(null)
  const [height, setHeight] = useState(0)
  const [length, setLength] = useState(0)
  const [width, setWidth] = useState(0)
  const [inputOut, setAmountInputOut] = useState(0)
  const [diameters, setDiameters] = useState([])
  const [d1, setD1] = useState(0)
  const [d2, setD2] = useState(0)

  const addDiameter = id => {
    setDiameters([...diameters, { id, d1, d2 }])
  }

  const removeDiameter = id => {
    setDiameters(diameters.filter(d => d.id !== id))
  }

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
      },
    }
    setTitle(topbar)
    setWraper(true)
    props
      .getAll('pallets', 'GET_PALLETS')
      .then(() => {
        props.getAll('items', 'GET_ITEMS')
      })
      .then(() => {
        props.getAll('complements', 'GET_COMPLEMENTS')
      })
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('zones/zones', 'GET_ZONES')
      })
      .then(() => {
        props.getAll('zones/subzones', 'GET_SUBZONES')
      })
      .then(() => {
        props.getAll('wood', 'GET_WOOD')
      })
      .then(() => {
        props.getAll('stock/sawn', 'GET_STOCK')
      })
      .then(() => {
        props.getAll('stock/stock_zones', 'GET_SZ')
      })
      .then(() => {
        props.getAll('stock/stock_zones/items', 'GET_SZ_ITEMS')
      })
      .then(() => {
        props.getAll('stock/stock_zones/complements', 'GET_SZ_COMPLEMENTS')
      })
      .then(() => {
        props.getAll('stock/stock_zones/sawn', 'GET_SZ_SAWN')
      })
      .then(() => {
        props.getAll('stock/stock_zones/raws', 'GET_SZ_RAWS')
      })
    // eslint-disable-next-line
  }, [])

  const localization = {
    pagination: {
      labelDisplayedRows: '{from}-{to} de {count}',
      labelRowsSelect: 'Filas',
      firstAriaLabel: 'Primera',
      firstTooltip: 'Primera',
      previousAriaLabel: 'Anterior',
      previousTooltip: 'Anterior',
      nextAriaLabel: 'Siguiente',
      nextTooltip: 'Siguiente',
      lastAriaLabel: 'Ultimo',
      lastTooltip: 'Ultimo',
    },
    toolbar: {
      searchTooltip: 'Buscar',
      searchPlaceholder: 'Buscar',
    },
  }

  const handleChangeStock = e => {
    setType(parseInt(e.target.value))
    setIdSelected(0)
  }

  if (
    pallets &&
    items &&
    zones &&
    wood &&
    plants &&
    subzones &&
    sawn &&
    stockZoneSawn &&
    stockZoneItems &&
    stockZone &&
    stockZoneRaws &&
    stockZoneComplements &&
    complements
  ) {
    const palletsOptions = pallets.map(pallet => {
      return {
        value: pallet.id,
        label: pallet.model,
      }
    })

    const itemsOptions = items
      .filter(item => item.item_type_id !== 4)
      .map(item => {
        return {
          value: item.id,
          label: `${item.height} x ${item.width} x ${item.length} - ${
            item.name !== null ? item.name : 'N/A'
          }  `,
        }
      })

    const nailsOptions = complements.map(complement => {
      return {
        value: complement.id,
        label: complement.name,
      }
    })

    const handleSaveStockPallet = () => {
      props
        .create(`stock/pallets/${idSelected}`, 'PALLET_HISTORY', {
          type,
          amount,
          inOut,
          user_id: user.id,
          state: greenDryRepair,
          zone_id: subzoneSelected,
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        .then(() => {
          setType(0)
        })
        .then(() => {
          props.getAll('stock/stock_zones', 'GET_SZ')
        })
    }

    const handleSaveStockItem = () => {
      props
        .create(`stock/items/${idSelected}`, 'PALLET_HISTORY', {
          amount,
          user_id: user.id,
          state: greenDryRepair,
          zone_id: subzoneSelected,
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        .then(() => {
          setType(0)
        })
        .then(() => {
          props.getAll('stock/stock_zones/items', 'GET_SZ_ITEMS')
        })
    }

    const handleSaveStockNail = () => {
      props
        .create(`stock/nails/${idSelected}`, 'PALLET_HISTORY', {
          amount,
          user_id: user.id,
          state: 'stock',
          zone_id: 1,
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        .then(() => {
          setType(0)
        })
        .then(() => {
          props.getAll('stock/stock_zones/complements', 'GET_SZ_COMPLEMENTS')
        })
    }

    const handleSaveStockSawn = () => {
      const user = sessionStorage.getItem('id')

      let heighConverted
      let lengthConverted
      let widthConverted

      if (units === true) {
        console.log('Conversor')
        heighConverted = inToCm(parseFloat(height)).toFixed(3)
        lengthConverted = inToCm(parseFloat(length)).toFixed(3)
        widthConverted = inToCm(parseFloat(width)).toFixed(3)
      } else {
        heighConverted = height
        lengthConverted = length
        widthConverted = width
      }
      const verification = sawn.find(
        s =>
          parseFloat(s.height) === parseFloat(heighConverted) &&
          parseFloat(s.length) === parseFloat(lengthConverted) &&
          parseFloat(s.width) === parseFloat(widthConverted) &&
          parseInt(s.wood_id) === parseInt(woodSelected) &&
          s.state === greenDryRepair
      )

      const id = verification !== undefined ? verification.id : 0

      console.log(id, heighConverted, lengthConverted, widthConverted)

      props
        .create(`stock/sawn/${id}`, 'PALLET_HISTORY', {
          height,
          length,
          width,
          amount,
          wood_id: woodSelected,
          user_id: user.id,
          state: greenDryRepair,
          zone_id: subzoneSelected,
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        .then(() => {
          setType(0)
        })
        .then(() => {
          props.getAll('stock/sawn', 'GET_STOCK')
        })
        .then(() => {
          props.getAll('stock/stock_zones/sawn', 'GET_SZ_SAWN')
        })
    }

    const hanldeUpdateStockZoneSawn = stock => {
      const user = sessionStorage.getItem('id')
      const negativeInput = parseInt(inputOut) * -1
      inputOut > stock.amount
        ? console.log('Mayor')
        : parseInt(stock.amount) - inputOut === 0
        ? props
            .create(`stock/sawn/${stock.sawn_id}`, 'PALLET_HISTORY', {
              amount: negativeInput,
              user_id: user.id,
              zone_id: stock.zone_id,
              sz: stock.id,
              delete: true,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .then(() => {
              props.getAll('stock/stock_zones/sawn', 'GET_SZ_SAWN')
            })
        : props
            .create(`stock/sawn/${stock.sawn_id}`, 'PALLET_HISTORY', {
              amount: negativeInput,
              user_id: user.id,
              zone_id: stock.zone_id,
              sz: stock.id,
              delete: false,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .then(() => {
              props.getAll('stock/stock_zones/sawn', 'GET_SZ_SAWN')
            })
    }

    const handleSaveStockRaw = () => {
      /* let volumen1 = length * d1 * amountRaw * 0.07854
      let volumen2 = length * d2 * amountRaw * 0.07854 */

      props
        .create(`stock/raws`, 'PALLET_HISTORY', {
          diameters,
          amount: 1,
          length,
          wood_id: woodSelected,
          user_id: user.id,
          state: greenDryRepair,
          zone_id: subzoneSelected,
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        .then(() => {
          props.getAll('stock/stock_zones/items', 'GET_SZ_ITEMS')
        })
        .then(() => {
          props.getAll('stock/stock_zones/sawn', 'GET_SZ_SAWN')
        })
        .then(() => {
          props.getAll('stock/stock_zones/raws', 'GET_SZ_RAWS')
        })
    }

    const hanldeUpdateStockZone = stock => {
      const user = sessionStorage.getItem('id')
      const negativeInput = parseInt(inputOut) * -1
      inputOut > stock.amount
        ? console.log('Mayor')
        : parseInt(stock.amount) - inputOut === 0
        ? props
            .create(`stock/pallets/${stock.pallet_id}`, 'PALLET_HISTORY', {
              amount: negativeInput,
              user_id: user.id,
              state: stock.state,
              zone_id: stock.zone_id,
              sz: stock.id,
              delete: true,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .then(() => {
              props.getAll('stock/stock_zones', 'GET_SZ')
            })
        : props
            .create(`stock/pallets/${stock.pallet_id}`, 'PALLET_HISTORY', {
              amount: negativeInput,
              user_id: user.id,
              state: stock.state,
              zone_id: stock.zone_id,
              sz: stock.id,
              delete: false,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .then(() => {
              props.getAll('stock/stock_zones', 'GET_SZ')
            })
    }

    const hanldeUpdateStockZoneNails = stock => {
      const user = sessionStorage.getItem('id')
      const negativeInput = parseInt(inputOut) * -1
      inputOut > stock.amount
        ? console.log('Mayor')
        : parseInt(stock.amount) - inputOut === 0
        ? props
            .create(`stock/nails/${stock.complement_id}`, 'PALLET_HISTORY', {
              amount: negativeInput,
              user_id: user.id,
              state: 'stock',
              zone_id: 1,
              sz: stock.id,
              delete: false,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .then(() => {
              props.getAll(
                'stock/stock_zones/complements',
                'GET_SZ_COMPLEMENTS'
              )
            })
        : props
            .create(`stock/nails/${stock.complement_id}`, 'PALLET_HISTORY', {
              amount: negativeInput,
              user_id: user.id,
              state: 'stock',
              zone_id: 1,
              sz: stock.id,
              delete: false,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .then(() => {
              props.getAll(
                'stock/stock_zones/complements',
                'GET_SZ_COMPLEMENTS'
              )
            })
    }

    const hanldeUpdateStockZoneItems = stock => {
      const user = sessionStorage.getItem('id')
      const negativeInput = parseInt(inputOut) * -1
      inputOut > stock.amount
        ? console.log('Mayor')
        : parseInt(stock.amount) - inputOut === 0
        ? props
            .create(`stock/items/${stock.item_id}`, 'PALLET_HISTORY', {
              amount: negativeInput,
              user_id: user.id,
              state: stock.state,
              zone_id: stock.zone_id,
              sz: stock.id,
              delete: true,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .then(() => {
              props.getAll('stock/stock_zones/items', 'GET_SZ_ITEMS')
            })
        : props
            .create(`stock/items/${stock.item_id}`, 'PALLET_HISTORY', {
              amount: negativeInput,
              user_id: user.id,
              state: stock.state,
              zone_id: stock.zone_id,
              sz: stock.id,
              delete: false,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .then(() => {
              props.getAll('stock/stock_zones/items', 'GET_SZ_ITEMS')
            })
    }

    const hanldeUpdateStockZoneRaws = stock => {
      const user = sessionStorage.getItem('id')
      const negativeInput = parseInt(inputOut) * -1
      inputOut > stock.m3
        ? console.log('Mayor')
        : parseInt(stock.amount) - inputOut === 0
        ? props
            .create(`stock/raws`, 'PALLET_HISTORY', {
              amount: negativeInput,
              user_id: user.id,
              zone_id: stock.zone_id,
              sz: stock.id,
              delete: true,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .then(() => {
              props.getAll('stock/stock_zones/raws', 'GET_SZ_RAWS')
            })
        : props
            .create(`stock/raws`, 'PALLET_HISTORY', {
              amount: negativeInput,
              user_id: user.id,
              zone_id: stock.zone_id,
              sz: stock.id,
              delete: false,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .then(() => {
              props.getAll('stock/stock_zones/raws', 'GET_SZ_RAWS')
            })
    }

    const stockZoneNailsFiltered = stockZoneComplements

    const stockZoneItemsFiltered = stockZoneItems.filter(
      item => item.item_type_id !== 4
    )

    return (
      <>
        <Card title="Entradas y Salidas">
          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Tipo:</span>
              <select
                name="processId"
                onChange={e => setInOut(parseInt(e.target.value))}
              >
                <option value="">Seleccionar</option>
                <option value="0">Entrada</option>
                <option value="1">Salida</option>
              </select>
            </label>
          </div>
          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Inventario:</span>
              <select onChange={e => handleChangeStock(e)} name="processId">
                <option value="0">Seleccionar</option>
                <option value="1">Tarima</option>
                <option value="2">Complementos</option>
                <option value="3">Madera Habilitada</option>
                <option value="4">Madera Aserrada</option>
                <option value="5">Madera Trozo</option>
              </select>
            </label>
          </div>
        </Card>
        {type === 1 ? (
          inOut === 0 ? (
            <Card title="Tarima">
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Inventario:</span>
                  <Select
                    onChange={e => setIdSelected(e.value)}
                    options={palletsOptions}
                  />
                </label>
              </div>

              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Planta:</span>
                  <select
                    name="processId"
                    onChange={e => setPlant(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {plants.map(plant => (
                      <option key={plant.id} value={plant.id}>
                        {plant.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {plantSelected !== null ? (
                <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>Zona:</span>
                    <select
                      name="processId"
                      onChange={e => setZone(e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      {zones
                        .filter(zone => zone.plant_id === plantSelected)
                        .map(zone => (
                          <option key={zone.id} value={zone.id}>
                            {zone.name}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              ) : null}

              {zoneSelected !== null ? (
                <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>SubZona:</span>
                    <select
                      name="processId"
                      onChange={e => setSubzone(e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      {subzones
                        .filter(
                          subzone =>
                            parseInt(subzone.zone_id) === parseInt(zoneSelected)
                        )
                        .map(subzone => (
                          <option key={subzone.id} value={subzone.id}>
                            {subzone.id}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              ) : null}
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Estado de la madera:</span>
                  <select
                    name="processId"
                    onChange={e => setGreenDryRepair(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="dry">Secas</option>
                    <option value="damp">Verdes</option>
                    <option value="repair">Reaparación</option>
                    <option value="stock">Stock de seguridad</option>
                  </select>
                </label>
              </div>
              <Input
                title="Cantidad"
                onChange={e => setAmount(parseInt(e.target.value))}
              />
              <Button onClick={handleSaveStockPallet}>Guardar</Button>
            </Card>
          ) : inOut === 1 ? (
            <MaterialTable
              localization={localization}
              data={stockZone}
              title="Disponible"
              columns={[
                { title: 'Subzona', field: 'zone_id' },
                { title: 'Modelo', field: 'model' },
                { title: 'Disponible', field: 'amount' },
                {
                  title: 'Cantidad a retirar',
                  field: 'amount',
                  render: rowData => (
                    <>
                      <input
                        type="text"
                        onInput={e => setAmountInputOut(e.target.value)}
                      />
                      <Button onClick={() => hanldeUpdateStockZone(rowData)}>
                        Guardar
                      </Button>
                    </>
                  ),
                },
              ]}
            />
          ) : null
        ) : null}
        {type === 2 ? (
          inOut === 0 ? (
            <Card title="Complementos">
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Inventario:</span>
                  <Select
                    onChange={e => setIdSelected(e.value)}
                    options={nailsOptions}
                  />
                </label>
              </div>

              <Input
                title="Cantidad"
                onChange={e => setAmount(parseInt(e.target.value))}
              />
              <Button onClick={handleSaveStockNail}>Guardar</Button>
            </Card>
          ) : inOut === 1 ? (
            <MaterialTable
              localization={localization}
              data={stockZoneNailsFiltered}
              title="Disponible"
              columns={[
                { title: 'Clavo', field: 'name' },
                { title: 'Disponible', field: 'amount' },
                {
                  title: 'Cantidad a retirar',
                  field: 'amount',
                  render: rowData => (
                    <>
                      <input
                        type="text"
                        onInput={e => setAmountInputOut(e.target.value)}
                      />
                      <Button
                        onClick={() => hanldeUpdateStockZoneNails(rowData)}
                      >
                        Guardar
                      </Button>
                    </>
                  ),
                },
              ]}
            />
          ) : null
        ) : null}
        {type === 3 ? (
          inOut === 0 ? (
            <Card title="Madera Habilitada">
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Inventario:</span>
                  <Select
                    onChange={e => setIdSelected(e.value)}
                    options={itemsOptions}
                  />
                </label>
              </div>

              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Planta:</span>
                  <select
                    name="processId"
                    onChange={e => setPlant(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {plants.map(plant => (
                      <option key={plant.id} value={plant.id}>
                        {plant.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {plantSelected !== null ? (
                <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>Zona:</span>
                    <select
                      name="processId"
                      onChange={e => setZone(e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      {zones
                        .filter(zone => zone.plant_id === plantSelected)
                        .map(zone => (
                          <option key={zone.id} value={zone.id}>
                            {zone.name}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              ) : null}

              {zoneSelected !== null ? (
                <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>SubZona:</span>
                    <select
                      name="processId"
                      onChange={e => setSubzone(e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      {subzones
                        .filter(
                          subzone =>
                            parseInt(subzone.zone_id) === parseInt(zoneSelected)
                        )
                        .map(subzone => (
                          <option key={subzone.id} value={subzone.id}>
                            {subzone.id}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              ) : null}

              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Estado de la madera:</span>
                  <select
                    name="processId"
                    onChange={e => setGreenDryRepair(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="dry">Secas</option>
                    <option value="damp">Verdes</option>
                    <option value="repair">Reaparación</option>
                  </select>
                </label>
              </div>
              <Input
                title="Cantidad"
                onChange={e => setAmount(parseInt(e.target.value))}
              />
              <Button onClick={handleSaveStockItem}>Guardar</Button>
            </Card>
          ) : inOut === 1 ? (
            <MaterialTable
              localization={localization}
              data={stockZoneItemsFiltered}
              title="Disponible"
              columns={[
                { title: 'SubZona', field: 'zone_id' },
                {
                  title: 'Pieza',
                  field: 'height',
                  render: rowData =>
                    `${rowData.height} x ${rowData.width} x ${rowData.length} - ${rowData.name}`,
                },
                { title: 'Disponible', field: 'amount' },
                {
                  title: 'Cantidad a retirar',
                  field: 'amount',
                  render: rowData => (
                    <>
                      <input
                        type="text"
                        onInput={e => setAmountInputOut(e.target.value)}
                      />
                      <Button
                        onClick={() => hanldeUpdateStockZoneItems(rowData)}
                      >
                        Guardar
                      </Button>
                    </>
                  ),
                },
              ]}
            />
          ) : null
        ) : null}
        {type === 4 ? (
          inOut === 0 ? (
            <Card title="Madera Aserrada">
              <Input
                onChange={e => setLength(e.target.value)}
                type="number"
                name="length"
                step="any"
                title={`Largo ${units === false ? 'cm' : 'in'}`}
              />
              <Input
                onChange={e => setWidth(e.target.value)}
                type="number"
                name="width"
                step="any"
                title={`Ancho ${units === false ? 'cm' : 'in'}`}
              />
              <Input
                onChange={e => setHeight(e.target.value)}
                type="number"
                name="height"
                step="any"
                title={`Alto ${units === false ? 'cm' : 'in'}`}
              />
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Planta:</span>
                  <select
                    name="processId"
                    onChange={e => setPlant(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {plants.map(plant => (
                      <option key={plant.id} value={plant.id}>
                        {plant.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {plantSelected !== null ? (
                <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>Zona:</span>
                    <select
                      name="processId"
                      onChange={e => setZone(e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      {zones
                        .filter(zone => zone.plant_id === plantSelected)
                        .map(zone => (
                          <option key={zone.id} value={zone.id}>
                            {zone.name}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              ) : null}

              {zoneSelected !== null ? (
                <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>SubZona:</span>
                    <select
                      name="processId"
                      onChange={e => setSubzone(e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      {subzones
                        .filter(
                          subzone =>
                            parseInt(subzone.zone_id) === parseInt(zoneSelected)
                        )
                        .map(subzone => (
                          <option key={subzone.id} value={subzone.id}>
                            {subzone.id}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              ) : null}

              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Especie Madera:</span>
                  <select
                    name="processId"
                    onChange={e => setWood(parseInt(e.target.value))}
                  >
                    <option value="">Seleccionar</option>
                    {wood.map(w => (
                      <>
                        <option value={w.id}>{w.name}</option>
                      </>
                    ))}
                  </select>
                </label>
              </div>
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Estado de la madera:</span>
                  <select
                    name="processId"
                    onChange={e => setGreenDryRepair(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="dry">Secas</option>
                    <option value="damp">Verdes</option>
                    <option value="repair">Reaparación</option>
                  </select>
                </label>
              </div>
              <Input
                title="Cantidad"
                onChange={e => setAmount(parseInt(e.target.value))}
              />
              <Button onClick={handleSaveStockSawn}>Guardar</Button>
            </Card>
          ) : inOut === 1 ? (
            <MaterialTable
              localization={localization}
              data={stockZoneSawn.filter(i => i.item_type_id !== 4)}
              title="Disponible"
              columns={[
                { title: 'SubZona', field: 'zone_id' },
                {
                  title: 'Pieza',
                  field: 'height',
                  render: rowData =>
                    `${rowData.height} x ${rowData.width} x ${rowData.length} - ${rowData.name}`,
                },
                { title: 'Disponible', field: 'amount' },
                {
                  title: 'Cantidad a retirar',
                  field: 'amount',
                  render: rowData => (
                    <>
                      <input
                        type="text"
                        onInput={e => setAmountInputOut(e.target.value)}
                      />
                      <Button
                        onClick={() => hanldeUpdateStockZoneSawn(rowData)}
                      >
                        Guardar
                      </Button>
                    </>
                  ),
                },
              ]}
            />
          ) : null
        ) : null}
        {type === 5 ? (
          inOut === 0 ? (
            <Card title="Madera Trozo">
              <table>
                <thead>
                  <tr>
                    <th>Diametro 1</th>
                    <th>Diametro 2</th>
                  </tr>
                </thead>
                <tbody>
                  {diameters.map(diameter => {
                    return (
                      <tr key={diameter.id}>
                        <td>{diameter.d1}</td>
                        <td>{diameter.d2}</td>
                        <td>
                          <Button
                            className="btn --danger"
                            onClick={() => removeDiameter(diameter.id)}
                          >
                            X
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Input
                  onChange={e => setD1(e.target.value)}
                  type="number"
                  name="d1"
                  step="any"
                  title="Diametro 1 cm"
                  className={'input__width'}
                />
                <Input
                  className={'input__width'}
                  onChange={e => setD2(e.target.value)}
                  type="number"
                  name="d2"
                  step="any"
                  title="Diametro 2 cm"
                />
                <Button onClick={() => addDiameter(diameters.length + 1)}>
                  +
                </Button>
              </div>
              <Input
                onChange={e => setLength(e.target.value)}
                type="number"
                name="length"
                step="any"
                title="Largo cm"
              />

              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Planta:</span>
                  <select
                    name="processId"
                    onChange={e => setPlant(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {plants.map(plant => (
                      <option key={plant.id} value={plant.id}>
                        {plant.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {plantSelected !== null ? (
                <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>Zona:</span>
                    <select
                      name="processId"
                      onChange={e => setZone(e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      {zones
                        .filter(zone => zone.plant_id === plantSelected)
                        .map(zone => (
                          <option key={zone.id} value={zone.id}>
                            {zone.name}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              ) : null}

              {zoneSelected !== null ? (
                <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>SubZona:</span>
                    <select
                      name="processId"
                      onChange={e => setSubzone(e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      {subzones
                        .filter(
                          subzone =>
                            parseInt(subzone.zone_id) === parseInt(zoneSelected)
                        )
                        .map(subzone => (
                          <option key={subzone.id} value={subzone.id}>
                            {subzone.id}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              ) : null}

              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Especie Madera:</span>
                  <select
                    name="processId"
                    onChange={e => setWood(parseInt(e.target.value))}
                  >
                    <option value="">Seleccionar</option>
                    {wood.map(w => (
                      <>
                        <option value={w.id}>{w.name}</option>
                      </>
                    ))}
                  </select>
                </label>
              </div>
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Estado de la madera:</span>
                  <select
                    name="processId"
                    onChange={e => setGreenDryRepair(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="dry">Secas</option>
                    <option value="damp">Verdes</option>
                    <option value="repair">Reaparación</option>
                  </select>
                </label>
              </div>
              <Button onClick={handleSaveStockRaw}>Guardar</Button>
            </Card>
          ) : inOut === 1 ? (
            <MaterialTable
              localization={localization}
              data={stockZoneRaws.filter(i => i.item_type_id !== 4 && i.m3 > 0)}
              title="Disponible"
              columns={[
                { title: 'SubZona', field: 'zone_id' },
                {
                  title: 'Pieza',
                  field: 'm3',
                  render: rowData => `${rowData.m3} - ${rowData.name}`,
                },
                {
                  title: 'Cantidad a retirar',
                  field: 'amount',
                  render: rowData => (
                    <>
                      <input
                        type="text"
                        onInput={e => setAmountInputOut(e.target.value)}
                      />
                      <Button
                        onClick={() => hanldeUpdateStockZoneRaws(rowData)}
                      >
                        Guardar
                      </Button>
                    </>
                  ),
                },
              ]}
            />
          ) : null
        ) : null}
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    pallets: state.reducerPallets.pallets,
    items: state.reducerItems.items,
    complements: state.reducerComplements.complements,
    sawn: state.reducerStock.stock,
    plants: state.reducerZones.plants,
    zones: state.reducerZones.zones,
    subzones: state.reducerZones.subzones,
    wood: state.reducerWood.wood,
    stockZone: state.reducerStock.stockZone,
    stockZoneItems: state.reducerStock.stockZoneItems,
    stockZoneSawn: state.reducerStock.stockZoneSawn,
    stockZoneRaws: state.reducerStock.stockZoneRaws,
    stockZoneComplements: state.reducerStock.stockZoneComplements,
    units: state.reducerApp.units,
    user: state.reducerApp.user,
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
