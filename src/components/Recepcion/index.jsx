import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

import { get } from '../../actions/app'
import {
  updateItemListOne,
  updateRawStock,
  completeOrderProductionSingle,
} from '../../pages/OrderProduction/actions'
import Card from '../Card/Card'

import Button from '../Button/Button'
import 'react-datepicker/dist/react-datepicker.css'

const Recepcion = props => {
  const history = useHistory()
  const {
    shipmentId,
    index,
    materialId,
    raws,
    orderProduction,
    material,
  } = props

  const materialReception = raws.filter(
    raw => raw.name === material.filter(m => m._id === materialId)[0].name
  )[0]

  console.log(materialReception)

  const handleComplete = () => {
    props
      .completeOrderProductionSingle(index, shipmentId)
      .then(() => {
        props.get(`orders/shipments/${shipmentId}`, 'GET_ORDER')
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
      .then(() => {
        history.push('/orderProduction')
      })
  }
  return (
    <>
      <Card title="Recepción">
        <div>
          {parseFloat(orderProduction.count).toFixed(2)} m3 -{' '}
          {materialReception.name}
        </div>
        <Button className="btn --success" onClick={handleComplete}>
          Completar
        </Button>
      </Card>
    </>
  )
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
  updateItemListOne,
  completeOrderProductionSingle,
  updateRawStock,
  get,
}

export default connect(mapStateToProps, mapDispatchToProps)(Recepcion)
