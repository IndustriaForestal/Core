import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  setTitle,
  setWraper,
  getAll,
  deleted,
  update,
  createFile,
} from '../../actions/app'
import { inToCm } from '../../utils'
import moment from 'moment'
import MaterialTable from 'material-table'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Loading from '../../components/Loading/Loading'

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
    qualities,
    suppliers,
    purchaseOrdersSuppliers,
    warehouseItems,
    warehouseStockZone,
  } = props
  const [type, setType] = useState(0)
  const [plantSelected, setPlant] = useState(null)
  const [zoneSelected, setZone] = useState(null)
  const [orderSupplier, setSupplier] = useState(null)
  const [orderPurchase, setOrderPurchase] = useState(null)
  const [diameters, setDiameters] = useState([])
  const [d1, setD1] = useState(0)
  const [d2, setD2] = useState(0)
  const { register, handleSubmit, errors } = useForm()
  const [palletSelected, setPallet] = useState(0)

  const addDiameter = id => {
    setDiameters([...diameters, { id, d1, d2 }])
  }

  const removeDiameter = id => {
    setDiameters(diameters.filter(d => d.id !== id))
  }

  useEffect(() => {
    const topbar = {
      title: 'Almacen',
      menu: {
        Almacen: '/warehouse',
        'Historial Almacen': '/warehouse/history',
        'Entradas Almacen': '/warehouse/changes',
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
        props.getAll(
          'stock/stock_zones/complements',
          'GET_SZ_COMPLEMENTS'
        )
      })
      .then(() => {
        props.getAll('stock/stock_zones/sawn', 'GET_SZ_SAWN')
      })
      .then(() => {
        props.getAll('stock/stock_zones/raws', 'GET_SZ_RAWS')
      })
      .then(() => {
        props.getAll('qualities', 'GET_QUALITIES')
      })
      .then(() => {
        props.getAll(
          'purchaseOrders/suppliers',
          'GET_PURCHASE_ORDERS_SUPPLIERS'
        )
      })
      .then(() => {
        props.getAll('warehouse', 'GET_WAREHOUSE_ITEMS')
      })
      .then(() => {
        props.getAll(
          'warehouse/stock_zones',
          'GET_WAREHOUSE_STOCK_ZONE'
        )
      })

    // eslint-disable-next-line
  }, [])

  const handleChangeStock = e => {
    setType(parseInt(e))
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
    suppliers &&
    qualities &&
    purchaseOrdersSuppliers &&
    warehouseItems &&
    warehouseStockZone
  ) {
    const palletsOptions = pallets.map(pallet => {
      return {
        value: pallet.id,
        label: pallet.model,
      }
    })

    const warehouseItemsOptions = warehouseItems.map(item => {
      return {
        value: item.id,
        label: item.name,
      }
    })

    const itemsOptions = items
      .filter(item => item.item_type_id !== 4)
      .filter(item =>
        palletSelected !== 0
          ? item.id_pallet === palletSelected
          : true
      )
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

    const onSubmit = data => {
      data.diameters = JSON.stringify(diameters)

      orderPurchase !== null
        ? (data.orderPurchase = orderPurchase)
        : (data.orderPurchase = null)
      props
        .createFile(
          `stock/supplier/pallets/${1}`,
          'PALLET_HISTORY',
          data
        )
        .then(() => {
          props.getAll(
            'purchaseOrders/suppliers',
            'GET_PURCHASE_ORDERS_SUPPLIERS'
          )
        })
    }

    const handleOrderSupplier = id => {
      const order = purchaseOrdersSuppliers.find(
        item => item.id === id
      )
      handleChangeStock(
        order.pallet_id !== null
          ? 1
          : order.item_id !== null
          ? 3
          : order.complement_id !== null
          ? 2
          : 5
      )
      setOrderPurchase(order.id)
      setSupplier(order.supplier_id)
    }

    const dataTableOrder = purchaseOrdersSuppliers
      .filter(order => order.ready === 0)
      .map(order => {
        return {
          ...order,
          delivery: moment(order.delivery).format('DD/MM/YYYY HH:mm'),
          amount:
            order.pallet_id !== null
              ? `${order.amount} pzas`
              : order.item_id !== null
              ? `${order.amount} pzas`
              : order.complement_id !== null
              ? `${order.amount} pzas`
              : `${order.amount} pies tabla`,
          product:
            order.pallet_id !== null
              ? order.model
              : order.item_id !== null
              ? `${order.length} x ${order.width} x ${order.height}`
              : order.complement_id !== null
              ? order.cname
              : 'Trozo',
        }
      })

    return (
      <>
        <Card title="Entrada Proveedor">
          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Inventario:</span>
              <select
                onChange={e => handleChangeStock(e.target.value)}
                name="processId"
              >
                <option value="0">Seleccionar</option>
                <option value="6">Almacen</option>
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
                    {suppliers.map(supplier =>
                      parseInt(orderSupplier) ===
                      parseInt(supplier.id) ? (
                        <option selected value={supplier.id}>
                          {supplier.name}
                        </option>
                      ) : (
                        <option value={supplier.id}>
                          {supplier.name}
                        </option>
                      )
                    )}
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
                        .filter(
                          zone => zone.plant_id === plantSelected
                        )
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
                            parseInt(subzone.zone_id) ===
                            parseInt(zoneSelected)
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
                    <option value="repair">Reaparaci??n</option>
                    <option value="stock">Stock de seguridad</option>
                  </select>
                </label>
              </div>
              <Input
                title="Cantidad"
                name="amount"
                passRef={register}
              />
              <input
                type="hidden"
                value="pallets"
                name="type_product"
                ref={register}
              />
              <Button type="submit">Guardar</Button>
            </Card>
          </form>
        ) : null}
        {type === 2 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card title="Complementos">
              <div className="inputGroup">
                <label htmlFor="supplierId">
                  <span>Proveedor:</span>

                  <select name="supplierId" ref={register}>
                    <option value="0">Seleccionar</option>
                    {suppliers.map(supplier =>
                      parseInt(orderSupplier) ===
                      parseInt(supplier.id) ? (
                        <option selected value={supplier.id}>
                          {supplier.name}
                        </option>
                      ) : (
                        <option value={supplier.id}>
                          {supplier.name}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>
              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Inventario:</span>
                  <select name="productId" ref={register}>
                    <option value="">Seleccionar</option>
                    {/* {orderPurchase !== null
                      ? nailsOptions.map(nail => (
                          <option key={data} value={data}>
                            {nail.label}
                          </option>
                        ))
                      : nailsOptions.map(nail => (
                          <option key={nail.value} value={nail.value}>
                            {nail.label}
                          </option>
                        ))} */}
                    {nailsOptions.map(nail => (
                      <option key={nail.value} value={nail.value}>
                        {nail.label}
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
                        .filter(
                          zone => zone.plant_id === plantSelected
                        )
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
                            parseInt(subzone.zone_id) ===
                            parseInt(zoneSelected)
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

              <Input
                title="Cantidad"
                name="amount"
                passRef={register}
              />
              <input
                type="hidden"
                value="complements"
                name="type_product"
                ref={register}
              />
              <Button type="submit">Guardar</Button>
            </Card>
          </form>
        ) : null}
        {type === 3 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card title="Madera Habilitada">
              <div className="inputGroup">
                <label htmlFor="supplierId">
                  <span>Proveedor:</span>
                  <select name="supplierId" ref={register}>
                    <option value="0">Seleccionar</option>
                    {suppliers.map(supplier =>
                      parseInt(orderSupplier) ===
                      parseInt(supplier.id) ? (
                        <option selected value={supplier.id}>
                          {supplier.name}
                        </option>
                      ) : (
                        <option value={supplier.id}>
                          {supplier.name}
                        </option>
                      )
                    )}
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
                  <span>Filtro Modelo:</span>
                  <select
                    name="filter"
                    onChange={e =>
                      setPallet(parseInt(e.target.value))
                    }
                  >
                    <option value="0">Todas</option>
                    {pallets.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.model}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="itemId">
                  <span>Inventario:</span>
                  <select name="productId" ref={register}>
                    <option value="">Seleccionar</option>
                    {itemsOptions.map(pallet => (
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
                        .filter(
                          zone => zone.plant_id === plantSelected
                        )
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
                            parseInt(subzone.zone_id) ===
                            parseInt(zoneSelected)
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
                    <option value="repair">Reaparaci??n</option>
                    <option value="stock">Stock de seguridad</option>
                  </select>
                </label>
              </div>
              <Input
                title="Cantidad"
                name="amount"
                passRef={register}
              />
              <input
                type="hidden"
                value="items"
                name="type_product"
                ref={register}
              />
              <Button type="submit">Guardar</Button>
            </Card>
          </form>
        ) : null}
        {type === 4 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card title="Madera Aserrada">
              <div className="inputGroup">
                <label htmlFor="supplierId">
                  <span>Proveedor:</span>
                  <select name="supplierId" ref={register}>
                    <option value="0">Seleccionar</option>
                    {suppliers.map(supplier =>
                      parseInt(orderSupplier) ===
                      parseInt(supplier.id) ? (
                        <option selected value={supplier.id}>
                          {supplier.name}
                        </option>
                      ) : (
                        <option value={supplier.id}>
                          {supplier.name}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>
              <div className="inputGroup">
                <label htmlFor="itemId">
                  <span>Madera:</span>
                  <select name="wood_id" ref={register}>
                    <option value="">Seleccionar</option>
                    {wood.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.name} Calidad{' '}
                        {
                          qualities.find(q => q.id === w.quality_id)
                            .name
                        }
                      </option>
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
              <Input
                type="number"
                name="length"
                step="any"
                title={`Largo ${units === false ? 'cm' : 'in'}`}
                passRef={register}
              />
              <Input
                type="number"
                name="width"
                step="any"
                title={`Ancho ${units === false ? 'cm' : 'in'}`}
                passRef={register}
              />
              <Input
                type="number"
                name="height"
                step="any"
                title={`Alto ${units === false ? 'cm' : 'in'}`}
                passRef={register}
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
                        .filter(
                          zone => zone.plant_id === plantSelected
                        )
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
                            parseInt(subzone.zone_id) ===
                            parseInt(zoneSelected)
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
                    <option value="repair">Reaparaci??n</option>
                    <option value="stock">Stock de seguridad</option>
                  </select>
                </label>
              </div>
              <Input
                title="Cantidad"
                name="amount"
                passRef={register}
              />
              <input
                type="hidden"
                value="sawns"
                name="type_product"
                ref={register}
              />
              <Button type="submit">Guardar</Button>
            </Card>
          </form>
        ) : null}
        {type === 5 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card title="Madera Trozo">
              <div className="inputGroup">
                <label htmlFor="supplierId">
                  <span>Proveedor:</span>
                  <select name="supplierId" ref={register}>
                    <option value="0">Seleccionar</option>
                    {suppliers.map(supplier =>
                      parseInt(orderSupplier) ===
                      parseInt(supplier.id) ? (
                        <option selected value={supplier.id}>
                          {supplier.name}
                        </option>
                      ) : (
                        <option value={supplier.id}>
                          {supplier.name}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>
              <div className="inputGroup">
                <label htmlFor="itemId">
                  <span>Madera:</span>
                  <select name="wood_id" ref={register}>
                    <option value="">Seleccionar</option>
                    {wood.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.name} Calidad{' '}
                        {
                          qualities.find(q => q.id === w.quality_id)
                            .name
                        }
                      </option>
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

              <Input
                type="number"
                name="length"
                step="any"
                title="Largo cm"
                passRef={register}
              />

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
                            onClick={() =>
                              removeDiameter(diameter.id)
                            }
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
                <Button
                  onClick={() => addDiameter(diameters.length + 1)}
                >
                  +
                </Button>
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
                        .filter(
                          zone => zone.plant_id === plantSelected
                        )
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
                            parseInt(subzone.zone_id) ===
                            parseInt(zoneSelected)
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
                    <option value="repair">Reaparaci??n</option>
                    <option value="stock">Stock de seguridad</option>
                  </select>
                </label>
              </div>
              <input
                type="hidden"
                value="raws"
                name="type_product"
                ref={register}
              />

              <Button type="submit">Guardar</Button>
            </Card>
          </form>
        ) : null}
        {type === 6 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card title="Almacen">
              <div className="inputGroup">
                <label htmlFor="supplierId">
                  <span>Proveedor:</span>
                  <select name="supplierId" ref={register}>
                    <option value="0">Seleccionar</option>
                    {suppliers.map(supplier =>
                      parseInt(orderSupplier) ===
                      parseInt(supplier.id) ? (
                        <option selected value={supplier.id}>
                          {supplier.name}
                        </option>
                      ) : (
                        <option value={supplier.id}>
                          {supplier.name}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>

              <div className="inputGroup">
                <label htmlFor="processId">
                  <span>Inventario:</span>
                  <select name="productId" ref={register}>
                    <option value="">Seleccionar</option>
                    {warehouseItemsOptions.map(pallet => (
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
                        .filter(
                          zone => zone.plant_id === plantSelected
                        )
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
                            parseInt(subzone.zone_id) ===
                            parseInt(zoneSelected)
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

              <Input
                title="Cantidad"
                name="amount"
                passRef={register}
              />
              <input
                type="hidden"
                value="warehouse"
                name="type_product"
                ref={register}
              />
              <Button type="submit">Guardar</Button>
            </Card>
          </form>
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
    qualities: state.reducerQualities.qualities,
    purchaseOrdersSuppliers:
      state.reducerPurchaseOrders.purchaseOrdersSuppliers,
    warehouseItems: state.reducerWarehouse.warehouseItems,
    warehouseStockZone: state.reducerWarehouse.warehouseStockZone,
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
