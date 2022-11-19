import React, { useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  update,
} from '../../../actions/app'
import Input from '../../../components/Input/Input'
import Card from '../../../components/Card/Card'
import Button from '../../../components/Button/Button'
import Loading from '../../../components/Loading/Loading'

const StockEdit = props => {
  const { setTitle, pallet, raw, item, nail } = props
  const { id } = useParams()
  const query = new URLSearchParams(useLocation().search)
  const { register, handleSubmit } = useForm()

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
        'Reporte General': '/stock/report',
        'Reporte Tarimas': '/stock/report/pallets',
        'Reporte Madera Habilitada': '/stock/report/items',
        'Reporte Trozo': '/stock/report/raws',
        'Reporte Leña ': '/stock/report/firewood',
      },
    }
    setTitle(topbar)

    props.get(`pallets/${id}`, 'GET_PALLET')
    props.get(`raws/${id}`, 'GET_RAW')
    props.get(`items/${id}`, 'GET_ITEM')
    props.get(`nails/${id}`, 'GET_NAIL')
    // eslint-disable-next-line
  }, [])

  const onSubmitPallet = data => {
    if (data.option === '0') {
      const newPallet = {
        0: {
          green: parseInt(data.stock01),
          dry: parseInt(data.stock02),
        },
        1: {
          green: parseInt(data.stock11),
          dry: parseInt(data.stock12),
        },
        secutiryStock: parseInt(data.securityStock),
      }
      props
        .update(
          `pallets/stock/${id}`,
          'UPDATE_PALLET_STOCK',
          newPallet
        )
        .then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          })
          Toast.fire({
            icon: 'success',
            title: 'Se guardo correctamente',
          })
        })
        .then(() => {
          props.history.push('/stock')
        })
    } else {
      console.log(data.option)
    }
  }

  const onSubmitRaw = data => {
    const newRaw = {
      stock: parseFloat(data.stock),
    }
    props
      .update(`raws/${id}`, 'UPDATE_STOCK', newRaw)
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
        })
        Toast.fire({
          icon: 'success',
          title: 'Se guardo correctamente',
        })
      })
      .then(() => {
        props.history.push('/stockMaterial')
      })
  }

  const onSubmitItem = data => {
    const newItem = {
      stock: parseFloat(data.stock),
    }
    props
      .update(`items/${id}`, 'UPDATE_ITEM', newItem)
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
        })
        Toast.fire({
          icon: 'success',
          title: 'Se guardo correctamente',
        })
      })
      .then(() => {
        props.history.push('/stockItems')
      })
  }
  const onSubmitNail = data => {
    const newNail = {
      stock: parseFloat(data.stock),
    }
    props
      .update(`nails/${id}`, 'UPDATE_NAIL', newNail)
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
        })
        Toast.fire({
          icon: 'success',
          title: 'Se guardo correctamente',
        })
      })
      .then(() => {
        props.history.push('/stockNails')
      })
  }

  switch (query.get('type')) {
    case 'pallet':
      if (pallet) {
        return (
          <Card title="Tarima">
            <h1>{pallet[0].model}</h1>
            <form
              id="formPallet"
              className="formPallet"
              onSubmit={handleSubmit(onSubmitPallet)}
            >
              <Input
                type="number"
                title="Stock Verdes IFISA 1"
                name="stock01"
                value={pallet[0].stock[0].green}
                passRef={register({ required: true })}
              />
              <Input
                type="number"
                title="Stock Secas IFISA1"
                name="stock02"
                value={pallet[0].stock[0].dry}
                passRef={register({ required: true })}
              />
              <Input
                type="number"
                title="Stock Stock Verdes IFISA 2"
                name="stock11"
                value={pallet[0].stock[1].green}
                passRef={register({ required: true })}
              />
              <Input
                type="number"
                title="Stock Secas IFISA2"
                name="stock12"
                value={pallet[0].stock[1].dry}
                passRef={register({ required: true })}
              />
              <Input
                type="number"
                title="Stock Seguridad"
                name="securityStock"
                value={
                  pallet[0].stock.securityStock
                    ? pallet[0].stock.securityStock
                    : 0
                }
                passRef={register({ required: true })}
              />
              <label htmlFor="" className="inputGroup">
                <span>Inventario</span>
                <select
                  name="option"
                  ref={register({ required: true })}
                >
                  <option value="0">No descontar</option>
                  {/* <option value="1">Descontar</option> */}
                </select>
              </label>
              <Button type="submit">Guardar</Button>
              <Link to="/stock">
                <Button type="button" className="btn --danger">
                  Cancelar
                </Button>
              </Link>
            </form>
          </Card>
        )
      } else {
        return null
      }
    case 'raw':
      if (raw) {
        return (
          <Card title="Materia Prima">
            <h1>{raw.name}</h1>
            <form
              id="formPallet"
              className="formPallet"
              onSubmit={handleSubmit(onSubmitRaw)}
            >
              <Input
                type="number"
                step="any"
                title="Stock"
                name="stock"
                value={raw.stock}
                passRef={register({ required: true })}
              />
              <Button type="submit">Guardar</Button>
              <Link to="/stockMaterial">
                <Button type="button" className="btn --danger">
                  Cancelar
                </Button>
              </Link>
            </form>
          </Card>
        )
      } else {
        return null
      }
    case 'item':
      if (item) {
        return (
          <Card title="Complemento">
            <h1>{item.name}</h1>
            <form
              id="formPallet"
              className="formPallet"
              onSubmit={handleSubmit(onSubmitItem)}
            >
              <Input
                type="number"
                step="any"
                title="Stock"
                name="stock"
                value={item.stock}
                passRef={register({ required: true })}
              />
              <Button type="submit">Guardar</Button>
              <Link to="/stockItems">
                <Button type="button" className="btn --danger">
                  Cancelar
                </Button>
              </Link>
            </form>
          </Card>
        )
      } else {
        return null
      }
    case 'nail':
      if (nail) {
        return (
          <Card title="Complemento">
            <h1>{nail.name}</h1>
            <form
              id="formPallet"
              className="formPallet"
              onSubmit={handleSubmit(onSubmitNail)}
            >
              <Input
                type="number"
                step="any"
                title="Stock"
                name="stock"
                value={nail.stock}
                passRef={register({ required: true })}
              />
              <Button type="submit">Guardar</Button>
              <Link to="/stockNails">
                <Button type="button" className="btn --danger">
                  Cancelar
                </Button>
              </Link>
            </form>
          </Card>
        )
      } else {
        return null
      }
    default:
      return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    orderDetails: state.orderDetails,
    pallet: state.pallet,
    raw: state.raw,
    item: state.item,
    nail: state.nail,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  get,
  create,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(StockEdit)
