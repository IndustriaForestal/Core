import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
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
  const { pallets, items, nails, raws, setTitle } = props
  const [type, setType] = useState(0)
  const [idSelected, setIdSelected] = useState(0)
  const [inOut, setInOut] = useState(0)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const topbar = {
      title: 'Inventarios',
      menu: {
        Tarimas: '/stock',
        Complementos: '/stockItems',
        Clavos: '/stockNails',
        'Materia Prima': '/stockMaterial',
        'Entradas y salidas': '/stockChanges',
      },
    }
    setTitle(topbar)
    setWraper(true)
    props.getAll('pallets', 'GET_PALLETS')
    props.getAll('raws', 'GET_RAWS')
    props.getAll('nails', 'GET_NAILS')
    props.getAll('items', 'GET_ITEMS')
    // eslint-disable-next-line
  }, [])

  const handleChangeStock = e => {
    setType(parseInt(e.target.value))
    setIdSelected(0)
  }

  if (pallets && items && nails && raws) {
    console.log(idSelected, type, inOut)
    const palletsOptions = pallets.map(pallet => {
      return {
        value: pallet._id,
        label: pallet.model,
      }
    })

    const itemsOptions = items.map(item => {
      return {
        value: item._id,
        label: item.name,
      }
    })

    const nailsOptions = nails.map(nail => {
      return {
        value: nail._id,
        label: nail.name,
      }
    })

    const rawsOptions = raws.map(raw => {
      return {
        value: raw._id,
        label: raw.name,
      }
    })
    const handleSaveStock = () => {
      const user = Cookies.get('name')
      props.update(`stocks/${idSelected}`, 'UPDATE_STOCK', {
        type,
        inOut,
        amount,
      })
      props.create('stocks/log', 'LOG_STOCK', {
        type,
        inOut,
        amount,
        user,
        stockId: idSelected,
      })
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
                <option value="4">Materia Prima</option>
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
                  <option value="0">Entrada</option>
                  <option value="1">Salida</option>
                </select>
              </label>
            </div>
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>IFISA:</span>
                <select name="processId">
                  <option value="0">IFISA 1</option>
                  <option value="1">IFISA 2</option>
                </select>
              </label>
            </div>
            <div className="inputGroup">
              <label htmlFor="processId">
                <span>Madera:</span>
                <select name="processId">
                  <option value="0">Secas</option>
                  <option value="1">Verdes</option>
                </select>
              </label>
            </div>
            <Input
              title="Cantidad"
              onChange={e => setAmount(parseInt(e.target.value))}
            />
            <Button>Guardar</Button>
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
        ) : null}
        {type === 4 ? (
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
        ) : null}
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
    nails: state.nails,
    raws: state.raws,
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
