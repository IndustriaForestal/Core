import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'

import {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  update,
} from '../../../actions/app'
import {
  updateItemList,
  updateOrderProduction,
  updateRawStock,
  updateNailsStock,
  updatePalletsStock,
  updateItemsStock,
  updateItemListOne,
  updateItemListReady,
  completeOrderProduction,
  addReadyToOrderProduction,
} from '../actions'

import Loading from '../../../components/Loading/Loading'
import './styles.scss'

import CompletedTemporal from '../../../components/CompletedTemporal'

import Pendu from '../../../components/Pendu'
import Recepcion from '../../../components/Recepcion'
// orderId === shipmentId
const OrderProductionItem = props => {
  const { orderId, index } = useParams()
  const query = new URLSearchParams(useLocation().search)
  const { orderDetails, pallets, raws, processes, items, material } = props
  const processId = query.get('processId')

  useEffect(() => {
    const topbar = {
      title: 'Orden de producción',
      menu: { 'Orden de producción': '/orderProduction' },
    }
    setTitle(topbar)
    props.get(`orders/shipments/${orderId}`, 'GET_ORDER')
    props.getAll(`raws`, 'GET_RAWS')
    props.getAll('processes', 'GET_PROCESSES')
    props.getAll('items', 'GET_ITEMS')
    props.getAll('nails', 'GET_NAILS')
    props.getAll('material', 'GET_MATERIAL')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (orderDetails !== undefined) {
      props.getAll(`pallets`, 'GET_PALLETS')
    }
    // eslint-disable-next-line
  }, [orderDetails])

  if (orderDetails && pallets && processes) {
    const orderProduction = orderDetails.shipments.filter(
      shipment => shipment._id === orderId
    )[0].ordersProduction[index]

    switch (processId) {
      case '5f99cbc174cd296d5bb5b73d':
        return (
          <CompletedTemporal
            shipmentId={orderId}
            index={index}
            materialId={orderProduction.materialId}
            raws={raws}
            orderProduction={orderProduction}
            material={material}
          />
        )
      case '5f99cbc474cd296d5bb5b73e':
        return (
          <CompletedTemporal
            shipmentId={orderId}
            index={index}
            materialId={orderProduction.materialId}
            raws={raws}
            orderProduction={orderProduction}
            material={material}
          />
        )
      case '5f99cbc874cd296d5bb5b73f':
        return (
          <CompletedTemporal
            shipmentId={orderId}
            index={index}
            materialId={orderProduction.materialId}
            raws={raws}
            orderProduction={orderProduction}
            material={material}
          />
        )
      case '5f99cbd374cd296d5bb5b741':
        return (
          <CompletedTemporal
            shipmentId={orderId}
            index={index}
            materialId={orderProduction.materialId}
            raws={raws}
            orderProduction={orderProduction}
            material={material}
          />
        )
      case '5f99cbd474cd296d5bb5b742':
        return (
          <CompletedTemporal
            shipmentId={orderId}
            index={index}
            materialId={orderProduction.materialId}
            raws={raws}
            orderProduction={orderProduction}
            material={material}
          />
        )
      case '5f99cbd874cd296d5bb5b743':
        return (
          <Pendu
            orderId={orderId}
            index={index}
            itemsList={orderDetails.itemsList}
            materialId={orderDetails.materialId}
            raws={raws}
            items={items}
          />
        )
      case '5f99cbda74cd296d5bb5b744':
        return (
          <CompletedTemporal
            shipmentId={orderId}
            index={index}
            materialId={orderProduction.materialId}
            raws={raws}
            orderProduction={orderProduction}
            material={material}
          />
        )
      case '5f99cbdc74cd296d5bb5b745':
        return (
          <Recepcion
            shipmentId={orderId}
            index={index}
            materialId={orderProduction.materialId}
            raws={raws}
            orderProduction={orderProduction}
            material={material}
          />
        )
      default:
        return <h1>ERROR FATAL!</h1>
    }
  } else {
    return <Loading />
  }

  /* if (orderDetails && pallet && processes) {
    if (query.get('itemsList')) {
      const aserrio = orderDetails.ordersProduction.filter(
        op =>
          op.processId === '5f99cbda74cd296d5bb5b744' ||
          op.processId === '5f99cbd874cd296d5bb5b743'
      )
      const startAserrio = moment(aserrio[0].date).format('DD-MM-YYYY')
      const endAserrio = moment(aserrio[aserrio.length - 1].date).format(
        'DD-MM-YYYY'
      )

      if (orderDetails.itemsList) {
        return (
          <>
            <Card title="Aserrio / Pendu">
              <Title className="title --small">{`${startAserrio} - ${endAserrio}`}</Title>
              {orderDetails.itemsList.filter(item => item.completed === 0)
                .length === 0 ? (
                <Button
                  onClick={() => handleComplete('5f99cbda74cd296d5bb5b744')}
                >
                  Completar
                </Button>
              ) : null}
            </Card>
            {orderDetails.itemsList.map((item, index) => {
              if (item.completed === 0) {
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

                    {item.ready && item.amount - item.ready === 0 ? (
                      <Button onClick={() => handleCompleteItem(index)}>
                        Completado
                      </Button>
                    ) : (
                      <Button onClick={() => handleSave(index)}>Guardar</Button>
                    )}
                  </Card>
                )
              } else {
                return null
              }
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

            {(orderDetails.ordersProduction[index].ready &&
              capacity[0].capacity -
                orderDetails.ordersProduction[index].ready ===
                0) ||
            (orderDetails.ordersProduction[index].processId !==
              '5f99cbd474cd296d5bb5b742' &&
              orderDetails.ordersProduction[index].processId !==
                '5f99cbd374cd296d5bb5b741') ? (
              <Button
                onClick={() =>
                  handleComplete(orderDetails.ordersProduction[index].processId)
                }
              >
                Completado
              </Button>
            ) : (
              <>
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
                <Button onClick={() => handleSave(index)}>Guardar</Button>{' '}
              </>
            )}
          </Card>
        )
      } else {
        return <h2>Type 0</h2>
      }
    }
  } else {
    return <Loading />
  } */
}

const mapStateToProps = state => {
  return {
    orderDetails: state.orderDetails,
    pallets: state.pallets,
    pallet: state.pallet,
    raws: state.raws,
    processes: state.processes,
    items: state.items,
    nails: state.nails,
    material: state.material,
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
  updateRawStock,
  updateNailsStock,
  updateItemsStock,
  updatePalletsStock,
  updateItemListOne,
  updateItemListReady,
  completeOrderProduction,
  addReadyToOrderProduction,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductionItem)
