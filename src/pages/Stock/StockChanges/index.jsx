import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  setTitle,
  setWraper,
  getAll,
  deleted,
  update,
  create,
} from '../../../actions/app'
import Cookies from 'js-cookie'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'
import Select from 'react-select'

const Nails = props => {
  const { pallets, items, zones, wood, setTitle } = props
  const [type, setType] = useState(0)
  const [idSelected, setIdSelected] = useState(0)
  const [inOut, setInOut] = useState(0)
  const [amount, setAmount] = useState(0)
  const [sucursal, setSucursal] = useState(null)
  const [greenDryRepair, setGreenDryRepair] = useState(null)
  const [woodSelected, setWood] = useState()

  useEffect(() => {
    const topbar = {
      title: 'Inventarios',
      menu: {
        Tarimas: '/stock',
        Complementos: '/stockItems',
        Clavos: '/stockNails',
        'Materia Prima': '/stockMaterial',
        'Entradas y salidas': '/stockChanges',
        Historial: '/stockHistory',
      },
    }
    setTitle(topbar)
    setWraper(true)
    props.getAll('pallets', 'GET_PALLETS')
    props.getAll('items', 'GET_ITEMS')
    props.getAll('zones/zones', 'GET_ZONES')
    props.getAll('wood', 'GET_WOOD')
    // eslint-disable-next-line
  }, [])

  const handleChangeStock = e => {
    setType(parseInt(e.target.value))
    setIdSelected(0)
  }

  if (pallets && items && zones && wood) {
    console.log(idSelected, type, inOut)
    const palletsOptions = pallets.map(pallet => {
      return {
        value: pallet.id,
        label: pallet.model,
      }
    })

    const itemsOptions = items.filter(item => {
      if (item.item_type_id !== 4) {
        return {
          value: item.id,
          label: item.heigth,
        }
      } else {
        return null
      }
    })

    const nailsOptions = items.filter(item => {
      if (item.item_type_id === 4) {
        return {
          value: item.id,
          label: item.name,
        }
      } else {
        return null
      }
    })

    const handleSaveStock = () => {
      const user = Cookies.get('name')
      console.log(
        type,
        amount,
        inOut,
        user,
        greenDryRepair,
        sucursal,
        woodSelected
      )
      if (type === 1) {
        props
          .update(`stock/pallets/${idSelected}`, 'PALLET_HISTORY', {
            type,
            amount,
            inOut,
            user_id: user,
            state: greenDryRepair,
            zone_id: sucursal,
            wood_id: woodSelected,
          })
          .then(() => {
            setType(0)
          })
      } else {
        console.log(type)
        props
          .update(`stock/items/${idSelected}`, 'PALLET_HISTORY', {
            type,
            amount,
            inOut,
            user_id: user,
            state: greenDryRepair,
            zone_id: sucursal,
            wood_id: woodSelected,
          })
          .then(() => {
            setType(0)
          })
      }
    }

    return (
      <>
        <Card title="Cambio">
          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Inventario:</span>
              <select onChange={e => handleChangeStock(e)} name="processId">
                <option value="0">Seleccionar</option>
                <option value="1">Tarima</option>
                <option value="2">Complemento</option>
                <option value="3">Clavos</option>
                {/* <option value="4">Materia Prima</option> */}
              </select>
            </label>
          </div>
        </Card>
        {type === 1 ? (
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
                <span>Tipo:</span>
                <select
                  name="processId"
                  onChange={e => setInOut(parseInt(e.target.value))}
                >
                  <option value="">Seleccionar</option>
                  <option value="0">Entrada</option>
                  {/* <option value="1">Salida</option> */}
                </select>
              </label>
            </div>
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>Zona:</span>
                <select
                  name="processId"
                  onChange={e => setSucursal(parseInt(e.target.value))}
                >
                  <option value="">Seleccionar</option>
                  {zones.map(z => (
                    <>
                      <option value={z.id}>
                        {z.id} {z.plant} {z.zone} {z.subzone}
                      </option>
                    </>
                  ))}
                </select>
              </label>
            </div>
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
                <span>Madera:</span>
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
            <Button onClick={handleSaveStock}>Guardar</Button>
          </Card>
        ) : null}
        {type === 2 ? (
          <Card title="Complementos">
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
                <span>Tipo:</span>
                <select
                  name="processId"
                  onChange={e => setInOut(parseInt(e.target.value))}
                >
                  <option value="">Seleccionar</option>
                  <option value="0">Entrada</option>
                  {/* <option value="1">Salida</option> */}
                </select>
              </label>
            </div>
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>Zona:</span>
                <select
                  name="processId"
                  onChange={e => setSucursal(parseInt(e.target.value))}
                >
                  <option value="">Seleccionar</option>
                  {zones.map(z => (
                    <>
                      <option value={z.id}>
                        {z.id} {z.plant} {z.zone} {z.subzone}
                      </option>
                    </>
                  ))}
                </select>
              </label>
            </div>
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
                <span>Madera:</span>
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
            <Button onClick={handleSaveStock}>Guardar</Button>
          </Card>
        ) : null}
        {type === 3 ? (
          <Card title="Clavos">
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>Inventario:</span>
                <Select
                  onChange={e => setIdSelected(e.value)}
                  options={nailsOptions}
                />
              </label>
            </div>
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>Tipo:</span>
                <select
                  name="processId"
                  onChange={e => setInOut(parseInt(e.target.value))}
                >
                  <option value="">Seleccionar</option>
                  <option value="0">Entrada</option>
                  {/* <option value="1">Salida</option> */}
                </select>
              </label>
            </div>
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>Zona:</span>
                <select
                  name="processId"
                  onChange={e => setSucursal(parseInt(e.target.value))}
                >
                  <option value="">Seleccionar</option>
                  {zones.map(z => (
                    <>
                      <option value={z.id}>
                        {z.id} {z.plant} {z.zone} {z.subzone}
                      </option>
                    </>
                  ))}
                </select>
              </label>
            </div>
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
                <span>Madera:</span>
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
            <Button onClick={handleSaveStock}>Guardar</Button>
          </Card>
        ) : null}
        {/* {type === 4 ? (
          <Card title="Clavos">
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>Inventario:</span>
                <Select
                  onChange={e => setIdSelected(e.value)}
                  options={rawsOptions}
                />
              </label>
            </div>
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>Tipo:</span>
                <select
                  name="processId"
                  onChange={e => setInOut(parseInt(e.target.value))}
                >
                  <option value="0">Entrada</option>
                  <option value="1">Salida</option>
                </select>
              </label>
            </div>
            <Input
              title="Cantidad"
              onChange={e => setAmount(parseInt(e.target.value))}
            />
            <Button onClick={handleSaveStock}>Guardar</Button>
          </Card>
        ) : null} */}
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    pallets: state.pallets,
    items: state.items,
    zones: state.zones,
    wood: state.wood,
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
