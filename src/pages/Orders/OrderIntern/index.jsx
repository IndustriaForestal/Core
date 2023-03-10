import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'

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
  createNotificationManual,
  setSocket,
} from '../../../actions/app'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import Title from '../../../components/Title/Title'
import Input from '../../../components/Input/Input'
import Card from '../../../components/Card/Card'

import './styles.scss'

const OrderIntern = props => {
  const { id } = useParams()
  const { orderDetails, pallet, quality, setTitle, socket } = props
  const [startDate, setStartDate] = useState(new Date())
  const [hoursLeft, setHoursLeft] = useState(12)
  const [checkedClean, setCheckedClean] = useState(false)
  const [checkedBake, setCheckedBake] = useState(false)
  const [timeCleanTemp, setTimeCleanTemp] = useState(0)
  const [timeBake, setTimeBake] = useState(0)
  const [peopleClean, setPeopleClean] = useState(0)

  const [initialHours] = useState(12)
  const [travelDate, setTravelDate] = useState(0)
  const [timeClean, setTimeClean] = useState(0)

  const [hoursTravel, setHoursTravel] = useState(0)

  console.log(id)

  useEffect(() => {
    const topbar = {
      title: 'Pedidos',
      menu: { Pedidos: '/orders' },
    }
    setTitle(topbar)
    props.get(`orders/${id}`, 'GET_ORDER')
    // eslint-disable-next-line
  }, [])

  // ! Rervisar funcionamiento pedido rapido

  useEffect(() => {
    if (orderDetails !== undefined) {
      props.get(`qualities/${orderDetails.pallets[0].qualityId}`, 'GET_QUALITY')
      // props.get(`pallets/${orderDetails.palletId}`, 'GET_PALLET')
    }
    // eslint-disable-next-line
  }, [orderDetails])

  const tableHeader = [
    'Horas',
    'Restante Viaje',
    'Restante Limpieza',
    'Restante Estufado',
    'Estatus',
  ]
  const tableHeader2 = [
    'Horas',
    'Hrs. Viaje',
    'Personal Limpieza',
    'Hrs. Estufado',
  ]

  const handleTravel = e => {
    let value = e.target.value
    if (value === '') {
      value = 0
    }
    setTravelDate(initialHours - value)
    setHoursTravel(value)
  }

  const handleClean = () => {
    setCheckedClean(!checkedClean)
    const process = quality[0].process.filter(
      process => process.processId === '5f99cbc474cd296d5bb5b73e'
    )

    const people = process[0].people

    if (!checkedClean) {
      setPeopleClean(people)
      if (quality[0].name === 'A') {
        setTimeClean(9)
        setTimeCleanTemp(9)
        setHoursLeft(hoursLeft - 9)
      }
      if (quality[0].name === 'B') {
        setTimeClean(5)
        setTimeCleanTemp(5)
        setHoursLeft(hoursLeft - 5)
      }
      if (quality[0].name === 'C') {
        setTimeClean(2)
        setTimeCleanTemp(2)
        setHoursLeft(hoursLeft - 2)
      }
    } else {
      setHoursLeft(hoursLeft + timeClean)
      setTimeClean(0)
      setPeopleClean(0)
    }
  }

  const handleBake = () => {
    setCheckedBake(!checkedBake)
  }

  const peopleCleanChange = e => {
    let value = e.target.value
    if (value === '') {
      value = 1
    }
    const newTime = (timeCleanTemp * peopleClean) / value
    setTimeClean(newTime)
  }

  const handlePeopleBake = e => {
    let value = e.target.value
    if (value === '') {
      value = 1
    }
    setTimeBake(value)
  }

  const handleGenerate = () => {
    const timeCleanFinal = parseInt(hoursTravel) + parseInt(timeClean)
    const timeBakeFinal =
      parseInt(hoursTravel) + parseInt(timeClean) + parseInt(timeBake)

    let ordersProduction = [
      {
        date:
          moment(startDate)
            .subtract(hoursTravel, 'hours')
            .format('YYYY-MM-DDTHH:mm:00') + 'Z',
        use: 1,
        postion: 1,
        processId: '5f99cbc174cd296d5bb5b73d',
        processName: 'Embarque',
        type: 1,
        count: 1,
        completed: 0,
        orderId: '5f99cbc174cd296d5bb5b73d',
        specialProcessId: null,
        materialId: '5fa07756ce9a4996368fb090',
      },
    ]

    if (checkedClean) {
      ordersProduction.push({
        date:
          moment(startDate)
            .subtract(timeCleanFinal, 'hours')
            .format('YYYY-MM-DDTHH:mm:00') + 'Z',
        use: 1,
        postion: 2,
        processId: '5f99cbc474cd296d5bb5b73e',
        processName: 'Limpieza',
        type: 1,
        count: 1,
        completed: 0,
        orderId: '5f99cbc174cd296d5bb5b73d',
        specialProcessId: null,
        peopleClean,
        materialId: '5fa07756ce9a4996368fb090',
      })
    }

    if (checkedBake) {
      ordersProduction.push({
        date:
          moment(startDate)
            .subtract(timeBakeFinal, 'hours')
            .format('YYYY-MM-DDTHH:mm:00') + 'Z',
        use: 1,
        postion: 3,
        processId: '5f99cbd374cd296d5bb5b741',
        processName: 'Estufado',
        type: 1,
        count: 1,
        completed: 0,
        orderId: '5f99cbc174cd296d5bb5b73d',
        specialProcessId: null,
        timeBake,
        materialId: '5fa07756ce9a4996368fb090',
      })
    }

    const shipment = orderDetails.shipments.filter(
      shipment => shipment.type === 1 && shipment.procesed === 0
    )[0]

    console.log(shipment)

    const order = {
      materialId: '5f99cbc874cd296d5bb5b73f',
    }

    props
      .update(
        `orders/orderProduction/${shipment._id}`,
        'CREATE_ORDERS_PRODUCTION',
        ordersProduction
      )
      .then(() => {
        props.createNotificationManual({
          text: 'Nuevo Pedido Producci??n',
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
      .then(() => {
        props.update(
          `orders/shipmentMaterial/${shipment._id}`,
          'CREATE_ORDERS_PRODUCTION',
          order
        )
      })

    /*  const orderFast = {
      palletId: orderDetails.palletId,
      deliveryDate: moment(startDate).format('YYYY-MM-DDT06:00:00') + 'Z',
      travel:
        moment(startDate)
          .subtract(hoursTravel, 'hours')
          .format('YYYY-MM-DDTHH:mm:00') + 'Z',
      clean:
        moment(startDate)
          .subtract(timeCleanFinal, 'hours')
          .format('YYYY-MM-DDTHH:mm:00') + 'Z',
      peopleClean,
      bake:
        moment(startDate)
          .subtract(timeBakeFinal, 'hours')
          .format('YYYY-MM-DDTHH:mm:00') + 'Z',
      timeBake,
    } */

    console.log(ordersProduction)

    /*  Swal.fire({
      title: '??Est??s seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
    }).then(result => {
      if (result.isConfirmed) {
        props
          .update(
            `orders/orderFast/${orderDetails._id}`,
            'CREATE_ORDERS_PRODUCTION',
            orderFast
          )
          .then(() => {
            props.createNotificationManual({
              text: 'Nuevo Pedido Rapido',
              link: `/orders/details/${orderDetails._id}`,
              date: moment().format('YYYY-MM-DDThh:mm:ss') + 'Z',
            })
          })
          .then(() => {
            socket.emit('notification')
          })
          .then(() => {
            props.history.push('/')
          })
      }
    }) */
  }

  return (
    <Card title="Pedido 12 horas">
      {pallet ? (
        <>
          <Title className="title --small">{pallet[0].model}</Title>
          <Title className="title --small">{pallet[0].customerId.name}</Title>
        </>
      ) : null}

      <p>Entrega</p>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <Input type="number" title="Viaje horas" onInput={handleTravel} />
      <label htmlFor="">
        Limpieza
        <input
          type="checkbox"
          onChange={handleClean}
          defaultChecked={checkedClean}
        />
      </label>
      {checkedClean ? (
        <>
          <p>{timeClean > 0 ? timeClean.toFixed(2) : null}</p>
          <Input
            title="Personal Limpieza"
            value={peopleClean}
            onChange={peopleCleanChange}
          />
        </>
      ) : null}
      <label htmlFor="">
        Estufado
        <input
          type="checkbox"
          onChange={handleBake}
          defaultChecked={checkedBake}
        />
      </label>
      {checkedBake ? (
        <Input title="Estufado Tiempo" onChange={handlePeopleBake} />
      ) : null}

      <Table head={tableHeader}>
        <tr>
          <td>{initialHours}</td>
          <td>{travelDate}</td>
          <td>{parseFloat(travelDate - timeClean).toFixed(2)}</td>
          <td>{parseFloat(travelDate - timeClean - timeBake).toFixed(2)}</td>
          <td>
            {travelDate - timeClean - timeBake >= 0 ? (
              <AiOutlineCheckCircle className="--success" />
            ) : (
              <AiOutlineClose className="--danger" />
            )}
          </td>
        </tr>
      </Table>
      <Table head={tableHeader2}>
        <tr>
          <td>{initialHours}</td>
          <td>{hoursTravel}</td>
          <td>{peopleClean}</td>
          <td>{timeBake}</td>
        </tr>
      </Table>
      {travelDate - timeClean - timeBake >= 0 ? (
        <Button onClick={handleGenerate}>Generar</Button>
      ) : null}
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    orderDetails: state.orderDetails,
    order: state.order,
    quality: state.quality,
    pallet: state.pallet,
    capacities: state.capacities,
    material: state.material,
    raws: state.raws,
    socket: state.socket,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  get,
  create,
  update,
  deleted,
  searchCapacities,
  createNotificationManual,
  setSocket,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderIntern)
