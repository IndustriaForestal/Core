import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import {
  setTitle,
  setWraper,
  getAll,
  deleted,
  update,
  createFile,
} from '../../../actions/app'
import { inToCm } from '../../../utils'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'
import Select from 'react-select'

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
    suppliers,
  } = props
  const [type, setType] = useState(0)
  const [idSelected, setIdSelected] = useState(0)
  const [supplier, setSupplier] = useState(0)
  const [humedad, setHumedad] = useState(0)
  const [noForestal, setNoForestal] = useState(0)
  const [pdf, setPdf] = useState()
  const [amount, setAmount] = useState(0)
  const [greenDryRepair, setGreenDryRepair] = useState(null)
  const [woodSelected, setWood] = useState()
  const [plantSelected, setPlant] = useState(null)
  const [zoneSelected, setZone] = useState(null)
  const [subzoneSelected, setSubzone] = useState(null)
  const [height, setHeight] = useState(0)
  const [length, setLength] = useState(0)
  const [width, setWidth] = useState(0)
  const [amountRaw, setAmountRaw] = useState(0)
  const [d1, setD1] = useState(0)
  const [d2, setD2] = useState(0)

  const { register, handleSubmit, errors } = useForm()

  useEffect(() => {
    const topbar = {
      title: 'Entrada Proveedores',
      menu: {
        'Entrada Proveedores': '/stockSuppliers',
        'Historial Entrada Proveedores': '/stockSuppliersHistory',
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
        props.getAll('suppliers', 'GET_SUPPLIERS')
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
    complements &&
    suppliers
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
      const formData = new FormData()

      formData.append('supplier_id', supplier)
      formData.append('humedad', humedad)
      formData.append('noForestal', noForestal)
      formData.append('pdf', pdf)
      formData.append('type', type)
      formData.append('amount', amount)
      formData.append('inOut', 0)
      formData.append('user_id', user.id)
      formData.append('state', greenDryRepair)
      formData.append('date', moment().format('YYYY-MM-DD HH:mm:ss'))

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }

      props.createFile(
        `stock/supplier/pallets/${idSelected}`,
        'PALLET_HISTORY',
        formData
      )
    }

    const handleSaveStockItem = () => {
      const formData = new FormData()

      formData.append('supplier_id', supplier)
      formData.append('humedad', humedad)
      formData.append('noForestal', noForestal)
      formData.append('pdf', pdf)
      formData.append('type', type)
      formData.append('amount', amount)
      formData.append('inOut', 0)
      formData.append('user_id', user.id)
      formData.append('state', greenDryRepair)
      formData.append('zone_id', subzoneSelected)
      formData.append('date', moment().format('YYYY-MM-DD HH:mm:ss'))

      props
        .createFile(`stock/items/${idSelected}`, 'PALLET_HISTORY', formData)
        .then(() => {
          setType(0)
        })
        .then(() => {
          props.getAll('stock/stock_zones/items', 'GET_SZ_ITEMS')
        })
    }

    const handleSaveStockNail = () => {
      props
        .createFile(`stock/nails/${idSelected}`, 'PALLET_HISTORY', {
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
        .createFile(`stock/sawn/${id}`, 'PALLET_HISTORY', {
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

    const handleSaveStockRaw = () => {
      /* let volumen1 = length * d1 * amountRaw * 0.07854
      let volumen2 = length * d2 * amountRaw * 0.07854 */
      const volumen = length * d1 * d2 * amountRaw * 0.7854

      props
        .createFile(`stock/raws`, 'PALLET_HISTORY', {
          m3: volumen,
          amount,
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

    const onSubmit = data => {
      console.log(data)
      props.createFile(
        `stock/supplier/pallets/${1}`,
        'PALLET_HISTORY',
        data
      )
    }

    return (
      <>
        <Card title="Entrada Proveedor">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card title="Tarima">
              <div className="inputGroup">
                <label htmlFor="supplierId">
                  <span>Proveedor:</span>
                  <select name="supplierId" ref={register}>
                    <option value="0">Seleccionar</option>
                    {suppliers.map(supplier => (
                      <option value={supplier.id}>{supplier.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <Input
                type="text"
                passRef={register}
                name="damp"
                title={`Porcentaje de humedad`}
              />
              <Input
                type="text"
                passRef={register}
                name="forest"
                title={`# Forestal`}
              />
              <Input
                type="file"
                passRef={register}
                name="pdf"
                title={`Archivo Forestal`}
              />
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Inventario:</span>
                  <select name="productId" ref={register}>
                    <option value="">Seleccionar</option>
                    {palletsOptions.map(pallet => (
                      <option key={pallet.value} value={pallet.value}>
                        {pallet.label}
                      </option>
                    ))}
                  </select>
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
                  <label htmlFor="zoneId">
                    <span>SubZona:</span>
                    <select name="zoneId" ref={register}>
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
                  <select name="type" ref={register}>
                    <option value="">Seleccionar</option>
                    <option value="dry">Secas</option>
                    <option value="damp">Verdes</option>
                    <option value="repair">Reaparación</option>
                    <option value="stock">Stock de seguridad</option>
                  </select>
                </label>
              </div>
              <Input title="Cantidad" name="amount" passRef={register} />
              <input type="hidden" value="pallets" name="type_product" ref={register} />
              <Button type="submit">Guardar</Button>
            </Card>
          </form>
        ) : null}
        {type === 2 ? (
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
        ) : null}
        {type === 3 ? (
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
        ) : null}
        {type === 4 ? (
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
        ) : null}
        {type === 5 ? (
          <Card title="Madera Trozo">
            <Input
              onChange={e => setD1(e.target.value)}
              type="number"
              name="d1"
              step="any"
              title="Diametro 1 cm"
            />
            <Input
              onChange={e => setD2(e.target.value)}
              type="number"
              name="d2"
              step="any"
              title="Diametro 2 cm"
            />
            <Input
              onChange={e => setLength(e.target.value)}
              type="number"
              name="length"
              step="any"
              title="Largo cm"
            />
            <Input
              onChange={e => setAmountRaw(e.target.value)}
              type="number"
              name="amount"
              step="any"
              title="Cantidad"
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
    suppliers: state.reducerSuppliers.suppliers,
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
  createFile,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
