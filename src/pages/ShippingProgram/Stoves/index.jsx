import React, { useEffect } from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
import 'moment/locale/es-mx'
import { connect } from 'react-redux'

import Loading from '../../../components/Loading/Loading'

import {
  getAll,
  setWraper,
  create,
  setTitle,
  deleted,
} from '../../../actions/app'

moment.locale('es')

const Stoves = props => {
  const { stolves } = props

  useEffect(() => {
    const topbar = {
      title: 'Programa de Embarques',
      menu: {
        Programa: '/shipping-program',
        Stock: '/shipping-program/stock',
        'Entrega Prov.': '/shipping-program/supplier-delivery',
        Aserrio: '/shipping-program/sawn',
        Armado: '/shipping-program/assamble',
        'Progr. Estufas': '/shipping-program/stoves',
      },
    }
    props.setTitle(topbar)
    props
      .getAll('shippingProgram/stolves', 'GET_SHIPPING_PROGRAM_STOLVES')
      .then(() => {
        props.setWraper(true)
      })
    // eslint-disable-next-line
  }, [])

  const stolvesToMysql = [
    { id: 1, name: 'ESTUFA GAS' },
    { id: 2, name: 'HT' },
    { id: 3, name: 'ESTUFA 1' },
    { id: 4, name: 'ESTUFA 2' },
    { id: 5, name: 'ESTUFA 3' },
    { id: 6, name: 'ESTUFA 4' },
  ]

  const handleSaveShipping = async (date, stolve, e) => {
    if (e.key === 'Enter') {
      console.log(date, stolve, e.target.value)
      const pallet = e.target.value
      /* inputOptions can be an object or Promise */
      const inputOptions = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            white: 'Blanco',
            yellow: 'Amarillo',
            orange: 'Naranja',
            greenYellow: 'Verde Claro',
            green: 'Verde',
          })
        }, 0)
      })

      const { value: color } = await Swal.fire({
        title: 'Select color',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: value => {
          if (!value) {
            return 'Selecciona un color'
          }
        },
      })

      if (color) {
        props
          .create('shippingProgram/stolves', 'CREATE_SHIPPING_PROGRAM', {
            date,
            stolve,
            color,
            pallet,
          })
          .then(() => {
            props.getAll(
              'shippingProgram/stolves',
              'GET_SHIPPING_PROGRAM_STOLVES'
            )
          })
          .then(() => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              },
            })

            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully',
            })
          })
      }
    }
  }

  const handleDelete = stolveId => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
    }).then(result => {
      if (result.isConfirmed) {
        props
          .deleted(
            `shippingProgram/stolves/${stolveId}`,
            'DELETE_SHIPPING_PROGRAM'
          )
          .then(() => {
            props.getAll(
              'shippingProgram/stolves',
              'GET_SHIPPING_PROGRAM_STOLVES'
            )
          })
          .then(() => {
            Swal.fire('Borrado!', 'Borrado con exito.', 'success')
          })
      }
    })
  }

  if (stolves) {
    let days = []
    for (let i = 0; i < 90; i++) {
      days.push(moment().add(i, 'days').format('YYYY-MM-DD'))
    }

    return (
      <>
        <div className="shippingProgram">
          <div className="shippingProgram__grid">
            <div className="shippingProgram__row">
              <div className="shippingProgram__cell --customer"></div>
              <div className="shippingProgram__cell --customer">Fecha</div>
              {stolvesToMysql.map(stolve => (
                <div
                  className="shippingProgram__cell --customer"
                  key={stolve.id}
                >
                  {stolve.name}
                </div>
              ))}
            </div>
            {days.map((day, index) => (
              <div className="shippingProgram__row" key={index}>
                <div className="shippingProgram__cell --sticky">
                  {moment(day).format('dddd')}
                </div>
                <div className="shippingProgram__cell --sticky">{day}</div>
                {stolvesToMysql.map(stolveSQL => {
                  const deliveryDay = stolves.filter(
                    stolve =>
                      parseInt(stolve.stolve) === stolveSQL.id &&
                      moment(stolve.date).format('YYYY-MM-DD') === day
                  )
                  console.log(day, deliveryDay)
                  return deliveryDay.length > 0 ? (
                    <div
                      key={stolveSQL.id}
                      onClick={() => handleDelete(deliveryDay[0].id)}
                      className={`shippingProgram__cell --${deliveryDay[0].color} --delete`}
                    >
                      {deliveryDay[0].pallet}
                    </div>
                  ) : (
                    <input
                      key={stolveSQL.id}
                      className="shippingProgram__cell"
                      onKeyPress={e => handleSaveShipping(day, stolveSQL.id, e)}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    stolves: state.stolves,
  }
}

const mapDispatchToProps = {
  getAll,
  setWraper,
  setTitle,
  create,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Stoves)
