import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'
import { AiOutlineCheckCircle, AiOutlineClose } from 'react-icons/ai'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { searchCapacities } from '../actions'
import {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  update,
  updateNotification,
  createNotificationManual,
  setSocket,
} from '../../../actions/app'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import Title from '../../../components/Title/Title'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading/Loading'
import './styles.scss'

const Order = props => {
  const {
    orderDetails,
    setTitle,
    quality,
    pallet,
    pallets,
    capacities,
    material,
    raws,
    socket,
  } = props
  const [startDate, setStartDate] = useState(new Date())
  const [materialId, setMaterialId] = useState(0)
  const [pendu, setPendu] = useState(0)
  const { id } = useParams()

  const tableHeader = ['Proceso', 'Fecha', 'Capacidad', 'Disponible', 'Status']

  useEffect(() => {
    const topbar = {
      title: 'Pedidos',
      menu: { Pedidos: '/orders' },
    }
    setTitle(topbar)
    props.get(`orders/${id}`, 'GET_ORDER')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (orderDetails !== undefined) {
      props.get(`qualities/${orderDetails.pallets[0].qualityId}`, 'GET_QUALITY')
      props.get(`pallets/${orderDetails.pallets[0].palletId}`, 'GET_PALLET')
      props.getAll(`raws`, 'GET_RAWS')
    }
    // eslint-disable-next-line
  }, [orderDetails])

  if (quality && pallet) {
    const shipment = orderDetails.shipments.filter(
      shipment => shipment.procesed === 0
    )

    let finalProcess = []

    quality[0].process.sort(compare).map(process => {
      finalProcess.push(process)

      // eslint-disable-next-line
      return pallet[0].specialProcess.map(specialProcess => {
        if (process.processId === specialProcess.processId) {
          specialProcess.capacity = specialProcess.capacity[0]
          specialProcess.duration = specialProcess.duration[0]
          finalProcess.push(specialProcess)
        }
      })
    })

    const humedity = humedity => {
      if (humedity > 20 && humedity <= 24) {
        return 1
      } else if (humedity >= 25 && humedity <= 29) {
        return 1.5
      } else if (humedity >= 30 && humedity <= 35) {
        return 2
      } else if (humedity >= 36 && humedity <= 43) {
        return 3
      }
    }

    function compare(a, b) {
      const orderA = a.position
      const orderB = b.position

      let comparison = 0
      if (orderA > orderB) {
        comparison = 1
      } else if (orderA < orderB) {
        comparison = -1
      }
      return comparison
    }

    let itemsList = []

    const searchOrderProduction = date => {
      let ordersProduction = []
      let itemsVolume = 0
      let startDate = moment(date)
      let searchOrderProduction = finalProcess

      shipment[0].pallets.map(pallet => {
        pallet.items.map(item => {
          const pietabla =
            parseInt(item.amount) *
            pallet.amount *
            ((parseFloat(item.height) *
              parseFloat(item.length) *
              parseFloat(item.width)) /
              61024)
          itemsVolume = itemsVolume + pietabla
          itemsList.push({
            itemName: item.name[0],
            amount: parseInt(item.amount) * pallet.amount,
            completed: 0,
          })
        })
      })
      console.log(shipment, 'Shipment')
      searchOrderProduction.map(order => {
        if (order.type === '0') {
          while (itemsVolume > 0) {
            startDate =
              moment(startDate)
                .subtract(1, 'days')
                .format('YYYY-MM-DDT06:00:00') + 'Z'
            order.capacity = parseInt(order.capacity)
            if (itemsVolume > order.capacity) {
              ordersProduction.push({
                date: startDate,
                use: order.capacity,
                ...order,
                itemsList,
              })
            } else {
              ordersProduction.push({
                date: startDate,
                use: itemsVolume,
                ...order,
                itemsList,
              })
            }
            itemsVolume = itemsVolume - order.capacity
          }
        } else {
          if (
            order.processName === 'Estufado' ||
            order.processName === 'Pre Secado'
          ) {
            const contador = humedity(parseInt(shipment[0].humedity))
            for (let index = 0; index < contador; index++) {
              startDate =
                moment(startDate)
                  .subtract(1, 'days')
                  .format('YYYY-MM-DDT06:00:00') + 'Z'
              ordersProduction.push({
                date: startDate,
                use: 1,
                ...order,
              })
            }
          } else if (order.duration > 1) {
            for (let index = 0; index < order.duration; index++) {
              startDate =
                moment(startDate)
                  .subtract(1, 'days')
                  .format('YYYY-MM-DDT06:00:00') + 'Z'
              ordersProduction.push({
                date: startDate,
                use: 1,
                ...order,
              })
            }
            return startDate
          } else {
            startDate =
              moment(startDate)
                .subtract(1, 'days')
                .format('YYYY-MM-DDT06:00:00') + 'Z'
            ordersProduction.push({
              date: startDate,
              use: 1,
              ...order,
            })
            return startDate
          }
        }

        return startDate
      })

      return ordersProduction
    }

    const handleSearch = date => {
      props.searchCapacities(searchOrderProduction(date))
      props.getAll(`material`, 'GET_MATERIAL')
    }

    let status = 1

    if (capacities) {
      capacities.map(capacity => {
        if (capacity.capacity - capacity.count <= 0) {
          status = 0
        }
        return status
      })
    }

    const handleMaterial = e => {
      if (e.target.value !== '0') {
        setMaterialId(
          e.target.options[e.target.options.selectedIndex].dataset.id
        )
      } else {
        setMaterialId(0)
      }
      const slicer = finalProcess.findIndex(
        capacity => capacity.processId === e.target.value
      )

      if (slicer > 0) {
        finalProcess = finalProcess.slice(0, slicer + 1)
        props.searchCapacities(searchOrderProduction(startDate))
      }
    }

    const purchaseOrder = () => {
      let itemsVolume = 0

      console.log(itemsList)

      itemsList = []

      console.log(itemsList)

      shipment[0].pallets.map(pallet => {
        pallet.items.map(item => {
          const pietabla =
            parseInt(item.amount) *
            pallet.amount *
            ((parseFloat(item.height) *
              parseFloat(item.length) *
              parseFloat(item.width)) /
              61024)
          itemsVolume = itemsVolume + pietabla
          itemsList.push({
            itemName: item.name[0],
            amount: parseInt(item.amount) * pallet.amount,
            completed: 0,
          })
        })
      })
      
      console.log(itemsList)
     

      props.update(`orders/itemsList/${shipment[0]._id}`, 'DEFAULT', itemsList)

      // * Crea la orden de compra de ser necesaria

      if (materialId === '5fa07756ce9a4996368fb090') {
        const stock = raws.filter(raw => raw.name === 'Trozo')
        let amount = 0
        itemsList.material = 'Trozo'
        stock[0].stock = parseFloat(stock[0].stock)
        if (itemsVolume > stock[0].stock) {
          amount = itemsVolume - stock[0].stock
          const rawOrder = {
            orderId: orderDetails._id,
            rawId: stock[0]._id,
            name: stock[0].name,
            date: moment().format('YYYY-MM-DDT06:00:00') + 'Z',
            amount,
          }
          props.create('orders/purchase', rawOrder)
        }
      } else if (materialId === '5fa0721ace9a4996368fb08b') {
        const stock = raws.filter(raw => raw.name === 'Cuarton')
        let amount = 0
        itemsList.material = 'Cuarton'
        stock[0].stock = parseFloat(stock[0].stock)
        if (itemsVolume > stock[0].stock) {
          amount = itemsVolume - stock[0].stock
          const rawOrder = {
            orderId: orderDetails._id,
            rawId: stock[0]._id,
            name: stock[0].name,
            date: moment().format('YYYY-MM-DDT06:00:00') + 'Z',
            amount,
          }

          props.create('orders/purchase', 'CREATE_PURCHASE', rawOrder)
        }
      }
    }

    const handleOrderProduction = () => {
      // eslint-disable-next-line
      let ordersProduction = []

      capacities.map(order => {
        delete order._id
        ordersProduction.push({
          ...order,
          count: order.use,
          completed: 0,
          orderId: shipment[0]._id,
          materialId,
        })
      })

      if (pendu === 1) {
        console.log('Pendu en lugar de aserrio')
        ordersProduction.map(op => {
          if (op.processId === '5f99cbda74cd296d5bb5b744') {
            op.processId = '5f99cbd874cd296d5bb5b743'
            op.processName = 'Pendu'
          }
        })
      }

      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Este proceso no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear',
      }).then(result => {
        if (result.isConfirmed) {
          purchaseOrder()
          props
            .update(
              `orders/orderProduction/${shipment[0]._id}`,
              'CREATE_ORDERS_PRODUCTION',
              ordersProduction
            )
            .then(() => {
              const order = {
                materialId,
              }
              props.update(
                `orders/shipmentMaterial/${shipment[0]._id}`,
                'CREATE_ORDERS_PRODUCTION',
                order
              )
            })
            .then(() => {
              props.createNotificationManual({
                text: 'Nuevo Pedido Producción',
                link: `/orders/details/${orderDetails._id}`,
                date: moment().format('YYYY-MM-DDThh:mm:ss') + 'Z',
              })
            })
            .then(() => {
              props.history.push('/')
            })
            .then(() => {
              socket.emit('notification')
            })
        }
      })
    }

    return (
      <Card title="Pedido Producción">
        <Title className="--small">{pallet[0].customerId.name}</Title>
        <Title className="--small">{pallet[0].model}</Title>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
        <Button onClick={() => handleSearch(startDate)}>Consulta</Button>
        {/* <Button onClick={handleOrderProduction}>Generar</Button> */}
        {material ? (
          <div className="inputGroup">
            <label htmlFor="materialId">
              <span>Inicia su proceso en:</span>
              <select name="materialId" onChange={handleMaterial}>
                <option value="0">Seleccionar...</option>
                {material.map(materialOne => {
                  return (
                    <option
                      key={materialOne._id}
                      value={materialOne.processId}
                      data-id={materialOne._id}
                    >
                      {materialOne.name}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
        ) : null}
        {/* Validacion capacidades disponibles */}
        {status === 1 && materialId !== 0 ? (
          <Button onClick={handleOrderProduction}>Generar</Button>
        ) : null}

        <br />

        {materialId === '5fa0721ace9a4996368fb08b' ? (
          <div className="inputGroup">
            <label htmlFor="materialId">
              <span>Inicio:</span>
              <select
                name="materialId"
                onChange={e => setPendu(parseInt(e.target.value))}
              >
                <option value="0">Aserrio</option>
                <option value="1">Pendu</option>
              </select>
            </label>
          </div>
        ) : null}

        <Table head={tableHeader}>
          {capacities
            ? capacities.map((capacity, index) => {
                const date = moment(capacity.date).format('DD-MM-YYYY')
                /*  const endDate = moment(capacity.endDate).format('DD-MM-YYYY') */
                return (
                  <tr key={index}>
                    <td>
                      {capacity.processName
                        ? capacity.processName
                        : capacity.name}
                    </td>
                    <td>
                      {date} {/* - {endDate} */}
                    </td>

                    <td>{capacity.capacity}</td>
                    <td>{capacity.capacity - capacity.count}</td>
                    <td>
                      {capacity.capacity - capacity.count - capacity.use >=
                      0 ? (
                        <AiOutlineCheckCircle className="--success" />
                      ) : (
                        <AiOutlineClose className="--danger" />
                      )}
                    </td>

                    {/* Mustra información de la capacidad de producción diaria  */}
                  </tr>
                )
              })
            : null}
        </Table>
      </Card>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    orderDetails: state.orderDetails,
    quality: state.quality,
    pallet: state.pallet,
    pallets: state.pallets,
    capacities: state.capacities,
    material: state.material,
    raws: state.raws,
    socket: state.socket,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  get,
  searchCapacities,
  create,
  update,
  updateNotification,
  createNotificationManual,
  setSocket,
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
