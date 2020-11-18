import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineEdit,
} from 'react-icons/ai'
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
import Table from '../../../components/Table/Table'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import Title from '../../../components/Title/Title'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading/Loading'
import './styles.scss'

const OrderProductionItem = props => {
  const { orderId, index } = useParams()
  const query = new URLSearchParams(useLocation().search)
  const tableHeader = ['Proceso', 'Solicitados', 'Restantes', 'Ingresar']
  const { orderDetails, pallet } = props
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

  if (orderDetails && pallet) {
    if (query.get('itemsList')) {
      console.log(orderDetails)
      if (orderDetails.itemsList) {
        return (
          <Card title="Orden Aserrio">
            <Table head={tableHeader}>
              {orderDetails.itemsList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.itemName}</td>
                    <td>{item.amount}</td>
                    <td>{item.ready ? item.amount - item.ready : item.amount}</td>
                    <td><Input type="text"  /></td>
                    <td><Input type="text"  /></td>
                  </tr>
                )
              })}
            </Table>
          </Card>
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
            <Input title="Observaciones" type="text" name="obsercations" />
            <Button>Completado</Button>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductionItem)
