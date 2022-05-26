import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  setModalReview,
  setWraper,
  getAll,
  deleted,
  create,
  update,
} from '../../../actions/app'
import { useParams } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Select from 'react-select'
import MaterialTable from 'material-table'

const Review = props => {
  const {
    processes,
    ordersProduction,
    ordersRequeriment,
    items,
    workstations,
    qualityRequest,
    specialProcesses,
    processesReject,
    purchaseOrdersSuppliers,
    suppliers,
    ordersWork,
    warehouseItems,
    warehouseStockZone,
    ordersReject,
    pallets,
    user,
    plants,
    zones,
    subzones,
    wood,
  } = props

  const { id } = useParams()
  const [height, setHeight] = useState(0)
  const [length, setLength] = useState(0)
  const [width, setWidth] = useState(0)
  const [amount, setAmount] = useState(0)
  const [greenDryRepair, setGreenDryRepair] = useState(null)
  const [plantSelected, setPlant] = useState(null)
  const [zoneSelected, setZone] = useState(null)
  const [subzoneSelected, setSubzone] = useState(null)
  const [palletSelected, setPallet] = useState(0)
  const [itemSelected, setItem] = useState(0)
  const [type, setType] = useState(0)
  const [arrayReject, setArrayReject] = useState([])
  const [woodSelected, setWood] = useState()

  useEffect(() => {
    props.setWraper(true)
    props
      .getAll('processes', 'GET_PROCESSES')
      .then(() => {
        props.getAll('orders/production', 'GET_ORDERS_PRODUCTION')
      })
      .then(() => {
        props.getAll('orders/reject', 'GET_ORDERS_REJECT')
      })
      .then(() => {
        props.getAll('orders/work', 'GET_ORDERS_WORK')
      })
      .then(() => {
        props.getAll('orders/requeriment', 'GET_ORDERS_REQUERIMENT')
      })
      .then(() => {
        props.getAll('items', 'GET_ITEMS')
      })
      .then(() => {
        props.getAll('zones/workstations', 'GET_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('specialProcesses', 'GET_SPECIAL_PROCESSES')
      })
      .then(() => {
        props.getAll('processes/reject', 'GET_PROCESSES_REJECT')
      })
      .then(() => {
        props.getAll(
          'specialProcesses/pallets',
          'GET_SPECIAL_PROCESSES_PALLETS'
        )
      })
      .then(() => {
        props.getAll(
          'purchaseOrders/suppliers',
          'GET_PURCHASE_ORDERS_SUPPLIERS'
        )
      })
      .then(() => {
        props.getAll('suppliers', 'GET_SUPPLIERS')
      })
      .then(() => {
        props.getAll('warehouse', 'GET_WAREHOUSE_ITEMS')
      })
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
      .then(() => {
        props.getAll(
          'warehouse/stock_zones',
          'GET_WAREHOUSE_STOCK_ZONE'
        )
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
  }, [])

  const handleSave = () => {
    /*   props
      .create('orders/history/production', 'CREATE_HISTORY', data)
      .then(() => {
        props.history.goBack()
      }) */

    console.log(arrayReject)
  }

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

  if (
    processes &&
    ordersProduction &&
    ordersRequeriment &&
    items &&
    workstations &&
    qualityRequest &&
    specialProcesses &&
    processesReject &&
    purchaseOrdersSuppliers &&
    suppliers &&
    ordersWork &&
    warehouseItems &&
    warehouseStockZone &&
    ordersReject &&
    pallets &&
    plants &&
    zones &&
    subzones &&
    wood
  ) {
    const order =
      ordersReject.find(o => o.id === parseInt(id)) !== undefined
        ? ordersReject.find(o => o.id === parseInt(id))
        : 0

    const item = items.find(item => item.id === order.product_id)

    const process =
      processes.find(process => process.id === order.process_id) || {}

    const processReject =
      processesReject.find(
        process => process.id === order.type_process
      ) || {}

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

    const handleAdd = () => {
      if (type === 1) {
        setArrayReject([
          ...arrayReject,
          {
            typeName: 'Tarima',
            type,
            pallet_id: palletSelected,
            name: pallets.find(p => p.id === palletSelected).model,
            amount,
            zone_id: subzoneSelected,
            state: greenDryRepair,
          },
        ])
      }
      if (type === 2) {
        const item = items.find(i => i.id === itemSelected)
        setArrayReject([
          ...arrayReject,
          {
            typeName: 'Madera Habilitada',
            type,
            item_id: itemSelected,
            name: `${item.height} x ${item.width} x ${item.length} - ${item.name}`,
            amount,
            zone_id: subzoneSelected,
            state: greenDryRepair,
          },
        ])
      }
      if (type === 3) {
        setArrayReject([
          ...arrayReject,
          {
            typeName: 'Madera Aserrada',
            type,
            name: `${height} x ${width} x ${length} - ${
              wood.find(w => w.id === woodSelected).name
            }`,
            length,
            height,
            width,
            amount,
            zone_id: subzoneSelected,
            state: greenDryRepair,
            wood_id: woodSelected,
          },
        ])
      }
      if (type === 4) {
        setArrayReject([
          ...arrayReject,
          {
            typeName: 'Aserrín',
            type,
            name: 'Aserrín',
            amount,
            zone_id: subzoneSelected,
            state: greenDryRepair,
          },
        ])
      }
    }

    const editable = {
      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(oldData)
            const dataDelete = arrayReject.filter(
              data => data.tableData.id !== oldData.tableData.id
            )
            setArrayReject(dataDelete)
            resolve()
          }, 1000)
        }),
    }

    return (
      <div
        className="review"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '20px',
        }}
      >
        <Card title="Rechazo">
          <div className="review__section">
            <h1>Viene de: {process.name}</h1>
            <h1>Proceso de rechazo: {processReject.name}</h1>

            {order.type !== 'pallets' ? (
              <div className="review__box">
                <h3>
                  Complemento:
                  {item.length} x {item.width} x {item.height}
                </h3>
              </div>
            ) : (
              <h3>Tarima: {order.model}</h3>
            )}
            <h3>Cantidad: {order.amount}</h3>

            <h1>Genera</h1>
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>Tipo de material:</span>
                <select
                  name="processId"
                  onChange={e => setType(parseInt(e.target.value))}
                >
                  <option value="0">Seleccionar</option>
                  <option value="1">Tarima</option>
                  <option value="2">Madera Habilitada</option>
                  <option value="3">Madera Aserrada</option>
                  <option value="4">Aserrín</option>
                </select>
              </label>
            </div>
            {type === 1 ? (
              <Select
                onChange={e => setPallet(e.value)}
                options={palletsOptions}
              />
            ) : null}

            {type === 2 ? (
              <Select
                onChange={e => setItem(e.value)}
                options={itemsOptions}
              />
            ) : null}

            {type === 3 ? (
              <>
                <Input
                  onChange={e => setLength(e.target.value)}
                  type="number"
                  name="length"
                  step="any"
                  title={`Largo cm`}
                  defaultValue={length}
                />
                <Input
                  onChange={e => setWidth(e.target.value)}
                  type="number"
                  name="width"
                  step="any"
                  title={`Ancho cm`}
                  defaultValue={width}
                />
                <Input
                  onChange={e => setHeight(e.target.value)}
                  type="number"
                  name="height"
                  step="any"
                  title={`Alto cm`}
                  defaultValue={height}
                />
                <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>Especie Madera:</span>
                    <select
                      name="processId"
                      onChange={e =>
                        setWood(parseInt(e.target.value))
                      }
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
              </>
            ) : null}
            {type === 4 ? (
              <>
                <Input
                  onChange={e => setAmount(e.target.value)}
                  type="number"
                  name="m3"
                  step="any"
                  title={`M3`}
                  defaultValue={0}
                />
              </>
            ) : (
              <>
                <Input
                  onChange={e => setAmount(e.target.value)}
                  type="number"
                  name="amount"
                  step="any"
                  title={`Cantidad`}
                  defaultValue={0}
                />
                <div className="inputGroup">
                  <label htmlFor="processId">
                    <span>Estado de la madera:</span>
                    <select
                      name="processId"
                      onChange={e =>
                        setGreenDryRepair(e.target.value)
                      }
                    >
                      <option value="">Seleccionar</option>
                      <option value="dry">Secas</option>
                      <option value="damp">Verdes</option>
                      <option value="repair">Reparación</option>
                      <option value="recovery">Recuperación</option>
                      <option value="stock">
                        Stock de seguridad
                      </option>
                    </select>
                  </label>
                </div>
              </>
            )}

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
            <Button type="button" onClick={handleAdd}>
              Agregar
            </Button>
          </div>
        </Card>
        <div>
          <MaterialTable
            localization={localization}
            data={arrayReject}
            title="Creado"
            columns={[
              { title: 'Material', field: 'typeName' },
              { title: 'Nombre', field: 'name' },
              { title: 'Cantidad', field: 'amount' },
              { title: 'Zona', field: 'zone_id' },
              {
                title: 'Estado',
                field: 'state',
                lookup: {
                  dry: 'Secas',
                  damp: 'Verdes',
                  repair: 'Reparación',
                  recovery: 'Recuperación',
                  stock: 'Stock de seguridad',
                },
              },
            ]}
            options={{
              pageSize: 50,
              pageSizeOptions: [50, 100, 150],
              emptyRowsWhenPaging: false,
            }}
            editable={editable}
          />

          <Button type="button" onClick={handleSave}>
            Enviar
          </Button>
        </div>
      </div>
    )
  } else {
    return <div>Cargando</div>
  }
}

const mapDispatchToProps = {
  setTitle,
  setModalReview,
  setWraper,
  getAll,
  deleted,
  create,
  update,
}

const mapStateToProps = state => {
  return {
    user: state.reducerApp.user,
    pallets: state.reducerPallets.pallets,
    modalReview: state.reducerApp.modalReview,
    processes: state.reducerProcesses.processes,
    ordersProduction: state.reducerOrders.ordersProduction,
    ordersWork: state.reducerOrders.ordersWork,
    ordersRequeriment: state.reducerOrders.ordersRequeriment,
    workstations: state.reducerZones.workstations,
    items: state.reducerItems.items,
    qualityRequest:
      state.reducerSpecialProcesses.specialProcessesPallets,
    specialProcesses: state.reducerSpecialProcesses.specialProcesses,
    processesReject: state.reducerProcesses.processesReject,
    purchaseOrdersSuppliers:
      state.reducerPurchaseOrders.purchaseOrdersSuppliers,
    suppliers: state.reducerSuppliers.suppliers,
    warehouseStockZone: state.reducerWarehouse.warehouseStockZone,
    warehouseItems: state.reducerWarehouse.warehouseItems,
    ordersReject: state.reducerOrders.ordersReject,
    plants: state.reducerZones.plants,
    zones: state.reducerZones.zones,
    subzones: state.reducerZones.subzones,
    wood: state.reducerWood.wood,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
