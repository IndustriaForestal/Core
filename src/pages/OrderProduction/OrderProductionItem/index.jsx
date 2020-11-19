import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  update,
} from '../../../actions/app'
import { updateItemList, updateOrderProduction } from '../actions'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Title from '../../../components/Title/Title'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading/Loading'
import './styles.scss'

const OrderProductionItem = props => {
  const { orderId, index } = useParams()
  const query = new URLSearchParams(useLocation().search)
  const { orderDetails, pallet } = props
  const [saveValue, setSaveValue] = useState(0)
  const [saveObservations, setSaveObservations] = useState()

  useEffect(() => {
    const topbar = {
      title: 'Orden de producción',
      menu: { 'Orden de producción': '/orderProduction' },
    }
    setTitle(topbar)
    props.get(`orders/${orderId}`, 'GET_ORDER')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (orderDetails !== undefined) {
      props.get(`pallets/${orderDetails.palletId}`, 'GET_PALLET')
    }
    // eslint-disable-next-line
  }, [orderDetails])

  const handleSave = index => {
    if (query.get('itemsList')) {
      const item = pallet[0].items.filter(item => {
        return item.name[0] === orderDetails.itemsList[index].itemName
      })
      const itemVol =
        item[0].height[0] *
        item[0].length[0] *
        item[0].width[0] *
        parseInt(saveValue)
      console.log(item)
      console.log(itemVol)
    } else {
      console.log('Order List')
    }
  }

  const handleCompleteItem = () => {}

  const handleComplete = () => {}

  if (orderDetails && pallet) {
    if (query.get('itemsList')) {
      console.log(orderDetails)
      const aserrio = orderDetails.ordersProduction.filter(
        op => op.processId === '5f99cbda74cd296d5bb5b744'
      )
      const startAserrio = moment(aserrio[0].date).format('DD-MM-YYYY')
      const endAserrio = moment(aserrio[aserrio.length - 1].date).format(
        'DD-MM-YYYY'
      )

      if (orderDetails.itemsList) {
        return (
          <>
            <Card title="Aserrio">
              <Title className="title --small">{`${startAserrio} - ${endAserrio}`}</Title>
            </Card>
            {orderDetails.itemsList.map((item, index) => {
              return (
                <Card title="Orden Aserrio" key={index}>
                  <Title className="title --small">{item.itemName}</Title>
                  <Title>Cantidad: {item.amount}</Title>
                  <p>
                    Restantes:
                    {item.ready ? item.amount - item.ready : item.amount}
                  </p>
                  <Input
                    type="number"
                    title="Agregar"
                    onChange={e => setSaveValue(parseInt(e.target.value))}
                  />
                  <Input
                    type="text"
                    title="Observaciones"
                    onChange={e => setSaveObservations(e.target.value)}
                  />
                  <Button onClick={() => handleSave(index)}>Guardar</Button>
                  {item.ready && item.amount - item.ready === 0 ? (
                    <Button>Completado</Button>
                  ) : null}
                </Card>
              )
            })}
          </>
        )
      } else {
        return <h2>Loading</h2>
      }
    } else {
      if (orderDetails.orderType === 0) {
        const capacity = pallet[0].capacityCharge.filter(
          cp => cp._id === orderDetails.platformId
        )
        console.log(capacity)
        console.log(orderDetails.ordersProduction[index])
        return (
          <Card title="Orden de Producción">
            <Title>{pallet[0].model}</Title>
            <Title>
              {orderDetails.ordersProduction[index].processName
                ? orderDetails.ordersProduction[index].processName
                : orderDetails.ordersProduction[index].name}
            </Title>
            <Title>
              {moment(orderDetails.ordersProduction[index].date).format(
                'DD-MM-YYYY'
              )}
            </Title>
            <Title>Cantidad: {capacity[0].capacity}</Title>
            <p>
              Restantes:
              {orderDetails.ordersProduction[index].ready
                ? capacity[0].capacity -
                  orderDetails.ordersProduction[index].ready
                : capacity[0].capacity}
            </p>
            <Input
              type="number"
              title="Agregar"
              onChange={e => setSaveValue(parseInt(e.target.value))}
            />
            <Input
              type="text"
              title="Observaciones"
              onChange={e => setSaveObservations(e.target.value)}
            />
            <Button onClick={() => handleSave(index)}>Guardar</Button>
            {orderDetails.ordersProduction[index].ready &&
            capacity[0].capacity -
              orderDetails.ordersProduction[index].ready ===
              0 ? (
              <Button>Completado</Button>
            ) : null}
          </Card>
        )
      } else {
        return <h2>Type 0</h2>
      }
    }
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    orderDetails: state.orderDetails,
    pallet: state.pallet,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  get,
  create,
  update,
  updateItemList,
  updateOrderProduction,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductionItem)
