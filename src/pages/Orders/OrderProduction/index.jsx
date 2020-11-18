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
    capacities,
    material,
    raws,
  } = props
  const [startDate, setStartDate] = useState(new Date())
  const [materialId, setMaterialId] = useState(0)
  const { id } = useParams()

  const tableHeader = [
    'Proceso',
    'Fecha',
    'Capacidad Diaria',
    'Capacidad Disponible',
    'Estatus',
  ]

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
      props.get(`qualities/${orderDetails.pallet[0].qualityId}`, 'GET_QUALITY')
      props.get(`pallets/${orderDetails.palletId}`, 'GET_PALLET')
      props.getAll(`raws`, 'GET_RAWS')
    }
    // eslint-disable-next-line
  }, [orderDetails])

  if (pallet && quality) {
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
      const capacityCharge = pallet[0].capacityCharge.filter(
        charge => orderDetails.platformId === charge._id
      )
      pallet[0].items.map(item => {
        const pietabla =
          parseInt(item.amount) *
          ((parseFloat(item.height) *
            parseFloat(item.length) *
            parseFloat(item.width)) /
            144)
        itemsVolume = itemsVolume + pietabla
        itemsList.push({
          itemName: item.name[0],
          amount: item.amount,
          completed: 0,
        })
      })

      itemsVolume = parseInt(itemsVolume * capacityCharge[0].capacity)

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
          if (order.duration > 1) {
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
      const capacityCharge = pallet[0].capacityCharge.filter(
        charge => orderDetails.platformId === charge._id
      )
      // eslint-disable-next-line
      pallet[0].items.map(item => {
        const pietabla =
          parseInt(item.amount) *
          ((parseFloat(item.height) *
            parseFloat(item.length) *
            parseFloat(item.width)) /
            144)
        itemsVolume = itemsVolume + pietabla
        itemsList.push({
          itemName: item.name[0],
          amount: item.amount,
          completed: 0,
        })
      })
      itemsVolume = parseInt(itemsVolume * capacityCharge[0].capacity)

      props.update(`orders/itemsList/${id}`, 'DEFAULT', itemsList)

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
          orderId: orderDetails._id,
        })
      })

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
              `orders/orderProduction/${orderDetails._id}`,
              'CREATE_ORDERS_PRODUCTION',
              ordersProduction
            )
            .then(res => {
              props.history.push('/')
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
        {status === 1 && materialId !== 0 ? (
          <Button onClick={handleOrderProduction}>Generar</Button>
        ) : null}
        <br />

        <Table head={tableHeader}>
          {capacities
            ? capacities.map((capacity, index) => {
                const date = moment(capacity.date).format('DD-MM-YYYY')
                return (
                  <tr key={index}>
                    <td>
                      {capacity.processName
                        ? capacity.processName
                        : capacity.name}
                    </td>
                    <td>{date}</td>
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
    capacities: state.capacities,
    material: state.material,
    raws: state.raws,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
