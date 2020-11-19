import React, { useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
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
  const { setTitle, pallet } = props
  const { id } = useParams()
  const query = new URLSearchParams(useLocation().search)
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    const topbar = {
      title: 'Inventarios',
      menu: {
        Tarimas: '/stock',
        Complementos: '/stockItems',
        Clavos: '/stockNails',
        'Materia Prima': '/stockMaterial',
      },
    }
    setTitle(topbar)

    props.get(`pallets/${id}`, 'GET_PALLET')
    // eslint-disable-next-line
  }, [])

  const onSubmitPallet = data => {
    console.log(data)
    const newPallet = {
      0: {
        green: parseInt(data.stock01),
        dry: parseInt(data.stock02),
      },
      1: { green: parseInt(data.stock11), dry: parseInt(data.stock12) },
    }
    console.log(newPallet, pallet)
    props.update(`pallets/stock/${id}`, 'UPDATE_PALLET_STOCK', newPallet)
  }

  if (pallet && id === pallet[0]._id) {
    switch (query.get('type')) {
      case 'pallet':
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
              <label htmlFor="" className="inputGroup">
                <span>Inventario</span>
                <select name="option" ref={register({ required: true })}>
                  <option value="0">No descontar</option>
                  <option value="1">Descontar</option>
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
      default:
        return <h1>No</h1>
    }
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    orderDetails: state.orderDetails,
    pallet: state.pallet,
    item: state.item,
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
