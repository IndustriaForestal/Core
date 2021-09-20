import React, {  useState } from 'react'

import { connect } from 'react-redux'
import Swal from 'sweetalert2'

import { get } from '../../actions/app'
import {
  updateItemListOne,
  updateRawStock,
} from '../../pages/OrderProduction/actions'
import Card from '../Card/Card'
import Input from '../Input/Input'
import Title from '../Title/Title'
import Button from '../Button/Button'
import 'react-datepicker/dist/react-datepicker.css'

const Pendu = props => {
  const [saveValue, setSaveValue] = useState(0)

  const [rawId, setRawId] = useState(0)
  const { orderId, itemsList, materialId, raws, items } = props

  console.log(raws)

  const volumen = item => {
    if (materialId === '5fa0721ace9a4996368fb08b') {
      // pie tabla, descontar de cuarton
      const itemVol =
        ((item.height * item.length * item.width) / 144) * parseInt(saveValue)
      if (raws[1].stock >= parseFloat(itemVol)) {
        setRawId('5fb0465376f9482b59574122')
        return itemVol
      } else {
        return 0
      }
    } else if (materialId === '5fa07756ce9a4996368fb090') {
      // metros cubicos, descontar de trozo
      const itemVol =
        ((item.height * item.length * item.width) / 61024) * parseInt(saveValue)
      if (raws[0].stock >= parseFloat(itemVol)) {
        setRawId('5fb0465176f9482b59574121')
        return itemVol
      } else {
        return 0
      }
    }
  }

  const handleSave = itemId => {
    const item = items.filter(item => item._id === itemId)
    if (volumen(item[0]) > 0) {
      props.updateRawStock(volumen(item[0]), rawId)
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'No hay suficiente materia prima',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      })
    }
  }

  const handleComplete = index => {
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
  return (
    <>
      {itemsList.map((item, index) => {
        if (item.completed === 0) {
          return (
            <Card title="Orden Pendu" key={index}>
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
                <Button onClick={() => handleComplete(index)}>
                  Completado
                </Button>
              ) : (
                <Button onClick={() => handleSave(item.itemId)}>Guardar</Button>
              )}
            </Card>
          )
        } else {
          return null
        }
      })}
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
  updateRawStock,
  get,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pendu)
