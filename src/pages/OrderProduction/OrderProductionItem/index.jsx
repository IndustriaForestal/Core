import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Swal from 'sweetalert2'
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
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Title from '../../../components/Title/Title'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading/Loading'
import './styles.scss'

const OrderProductionItem = props => {
  const { orderId, index } = useParams()
  const query = new URLSearchParams(useLocation().search)
  const { orderDetails, pallet, raws, processes, items, nails } = props
  const [saveValue, setSaveValue] = useState(0)
  const [saveObservations, setSaveObservations] = useState()

  useEffect(() => {
    const topbar = {
      title: 'Orden de producción',
      menu: { 'Orden de producción': '/orderProduction' },
    }
    setTitle(topbar)
    props.get(`orders/${orderId}`, 'GET_ORDER')
    props.getAll(`raws`, 'GET_RAWS')
    props.getAll('processes', 'GET_PROCESSES')
    props.getAll('items', 'GET_ITEMS')
    props.getAll('nails', 'GET_NAILS')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (orderDetails !== undefined) {
      props.get(`pallets/${orderDetails.palletId}`, 'GET_PALLET')
    }
    // eslint-disable-next-line
  }, [orderDetails])

  const volumen = (item, materialId) => {
    if (materialId === '5fa0721ace9a4996368fb08b') {
      // pie tabla, descontar de cuarton
      const itemVol =
        ((item[0].height[0] * item[0].length[0] * item[0].width[0]) / 144) *
        parseInt(saveValue)
      return itemVol
    } else if (materialId === '5fa07756ce9a4996368fb090') {
      // metros cubicos, descontar de trozo
      const itemVol =
        ((item[0].height[0] * item[0].length[0] * item[0].width[0]) / 61024) *
        parseInt(saveValue)
      return itemVol
    }
  }

  const compareVolume = (volumenToDiscount, materialId) => {
    if (materialId === 'trozo') {
      if (raws[0].stock >= parseFloat(volumenToDiscount)) {
        return true
      } else {
        return false
      }
    } else {
      if (raws[1].stock >= parseFloat(volumenToDiscount)) {
        return true
      } else {
        return false
      }
    }
  }

  const verifyStock = (collection, id, amount, pallet) => {
    const stockItem = collection.filter(item => item._id === id)

    console.log(stockItem, id, amount)
    if (pallet && pallet === 'verdes') {
      if (stockItem[0].stock[0].green >= amount) {
        return true
      } else {
        return false
      }
    } else if (pallet && pallet === 'secas') {
      if (stockItem[0].stock[0].dry >= amount) {
        return true
      } else {
        return false
      }
    } else {
      if (stockItem[0].stock >= amount) {
        return true
      } else {
        return false
      }
    }
  }

  const handleSave = index => {
    const materialId = orderDetails.ordersProduction[0].materialId
    if (query.get('itemsList')) {
      const item = pallet[0].items.filter(item => {
        return item.name[0] === orderDetails.itemsList[index].itemName
      })
      const volumenToDiscount = volumen(item, materialId)
      let materialToCompare
      if (materialId === '5fa0721ace9a4996368fb08b') {
        materialToCompare = 'cuarton'
      } else {
        materialToCompare = 'trozo'
      }
      const compareVolumeFinal = compareVolume(
        volumenToDiscount,
        materialToCompare
      )

      if (compareVolumeFinal) {
        const volumen = volumenToDiscount * -1
        if (materialToCompare === 'trozo') {
          props.updateRawStock(volumen, '5fb0465176f9482b59574121')
        } else {
          props.updateRawStock(volumen, '5fb0465376f9482b59574122')
        }
        props
          .updateItemsStock(saveValue, item[0].id, saveObservations)
          .then(() => {
            props.get(`orders/${orderId}`, 'GET_ORDER')
          })

        props
          .updateItemListReady(index, orderId, saveValue)
          .then(() => {
            props.get(`orders/${orderId}`, 'GET_ORDER')
          })
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
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'No hay suficiente materia prima',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        })
      }
      //agregar a stock de items
    } else {
      //5f99cbd474cd296d5bb5b742 Aramdo
      //5f99cbd374cd296d5bb5b741 Estufado
      index = parseInt(index)
      console.log('Order List')
      if (orderDetails.ordersProduction[index + 1].completed === 1) {
        //Camparando si el proceso es de aramdo o estufado
        if (
          orderDetails.ordersProduction[index].processId ===
            '5f99cbd474cd296d5bb5b742' ||
          orderDetails.ordersProduction[index].processId ===
            '5f99cbd374cd296d5bb5b741'
        ) {
          //Modificar Stocks de Pallets
          console.log('Modificar Stocks')
          if (
            orderDetails.ordersProduction[index].processId ===
            '5f99cbd474cd296d5bb5b742'
          ) {
            console.log('Armado')
            let status
            pallet[0].items.map(item => {
              if (
                verifyStock(items, item.id, item.amount * saveValue) === true
              ) {
                return (status = true)
              } else {
                return (status = false)
              }
            })
            pallet[0].nails.map(nail => {
              if (
                verifyStock(nails, nail.nailId, nail.amount * saveValue) ===
                true
              ) {
                return (status = true)
              } else {
                return (status = false)
              }
            })

            if (status) {
              pallet[0].items.map(item =>
                props.updateItemsStock(item.amount * saveValue * -1, item.id)
              )
              pallet[0].nails.map(nail =>
                props.updateNailsStock(
                  nail.amount * saveValue * -1,
                  nail.nailId
                )
              )
              const capacity = pallet[0].capacityCharge.filter(
                cp => cp._id === orderDetails.platformId
              )
              props.updatePalletsStock(capacity, pallet[0]._id, 'green')
              props
                .addReadyToOrderProduction(index, orderId, saveValue)
                .then(() => {
                  props.get(`orders/${orderId}`, 'GET_ORDER')
                })
                .then(() => console.log('Proceso terminado'))
                .catch(err => console.log(err))
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'No hay suficiente material',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
              })
            }

            console.log(status)
          } else {
            const capacity = pallet[0].capacityCharge.filter(
              cp => cp._id === orderDetails.platformId
            )
            if(verifyStock(pallet, pallet[0]._id, capacity[0].capacity, 'verdes') === true){
              props.updatePalletsStock(capacity[0].capacity * -1, pallet[0]._id, 'green')
              props.updatePalletsStock(capacity[0].capacity, pallet[0]._id, 'dry')
              handleComplete('Estufado')
            }else{
              Swal.fire({
                title: 'Error!',
                text: 'No hay suficiente material',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
              })
            }
          }
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'El proceso anterior aún no finaliza',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        })
      }
    }
  }

  const handleCompleteItem = index => {
    props
      .updateItemListOne(index, orderId)
      .then(() => {
        props.get(`orders/${orderId}`, 'GET_ORDER')
      })
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
  }

  const handleComplete = processId => {
    // const orderReady = processes.filter(process => process.name === processName)
    const arrayIndex = orderDetails.ordersProduction.map((op, index) => {
      if (op.processId === processId) {
        /* if(op.processName === 'Estufado'){
          const capacity = pallet[0].capacityCharge.filter(
            cp => cp._id === orderDetails.platformId
          )
          props.updatePalletsStock(capacity[0].capacity * -1, pallet[0]._id, 'dry')
        } */
        return index
      } else {
        return null
      }
    })
    const arrayIndexHack = arrayIndex.filter(a => a !== null)
    props
      .completeOrderProduction(arrayIndexHack, orderId)
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
        props.history.goBack()
      })
  }

  const handleCompleteOrderProduction = index => {
    props
      .completeOrderProduction(index, orderId)
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
        props.history.goBack()
      })
  }

  if (orderDetails && pallet && processes) {
    if (query.get('itemsList')) {
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
              {orderDetails.itemsList.filter(item => item.completed === 0)
                .length === 0 ? (
                <Button onClick={() => handleComplete('Aserrio')}>
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
                    {/*   <Input
                      type="text"
                      title="Observaciones"
                      onChange={e => setSaveObservations(e.target.value)}
                    /> */}

                    {item.ready && item.amount - item.ready === 0 ? (
                      <Button onClick={() => handleComplete(index)}>
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
                  handleComplete(
                    orderDetails.ordersProduction[index].processId
                  )
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
                {}
                <Input
                  type="number"
                  title="Agregar"
                  onChange={e => setSaveValue(parseInt(e.target.value))}
                />
                {/*     <Input
            type="text"
            title="Observaciones"
            onChange={e => setSaveObservations(e.target.value)}
          /> */}
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
  }
}

const mapStateToProps = state => {
  return {
    orderDetails: state.orderDetails,
    pallet: state.pallet,
    raws: state.raws,
    processes: state.processes,
    items: state.items,
    nails: state.nails,
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
