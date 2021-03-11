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

const Sawn = props => {
  const { supplierDelivery, suppliers } = props

  useEffect(() => {
    const topbar = {
      title: 'Programa de Embarques',
      menu: {
        Programa: '/shipping-program',
        Stock: '/shipping-program/stock',
        'Entrega Prov.': '/shipping-program/supplier-delivery',
        Aserrio: '/shipping-program/sawn',
        Armado: '/shipping-program/armed',
        'Progr. Estufas': '/shipping-program/stoves',
      },
    }
    props.setTitle(topbar)
    props
      .getAll(
        'shippingProgram/supplier-delivery',
        'GET_SHIPPING_PROGRAM_SUPPLIER_DELIVERY'
      )
      .then(() => {
        props.getAll('suppliers', 'GET_SUPPLIERS')
      })
      .then(() => {
        props.setWraper(true)
      })
  }, [])

  const handleSaveShipping = async (date, supplier, e) => {
    if (e.key === 'Enter') {
      console.log(date, supplier, e.target.value)
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
          .create(
            'shippingProgram/supplier-delivery',
            'CREATE_SHIPPING_PROGRAM',
            {
              date,
              supplier,
              color,
              pallet,
            }
          )
          .then(() => {
            props.getAll(
              'shippingProgram/supplier-delivery',
              'GET_SHIPPING_PROGRAM_SUPPLIER_DELIVERY'
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

  const handleDelete = deliveryId => {
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
            `shippingProgram/supplier-delivery/${deliveryId}`,
            'DELETE_SHIPPING_PROGRAM'
          )
          .then(() => {
            props.getAll(
              'shippingProgram/supplier-delivery',
              'GET_SHIPPING_PROGRAM_SUPPLIER_DELIVERY'
            )
          })
          .then(() => {
            Swal.fire('Borrado!', 'Borrado con exito.', 'success')
          })
      }
    })
  }

  if (supplierDelivery && suppliers) {
    let days = []
    for (let i = 0; i < 90; i++) {
      days.push(moment().add(i, 'days').format('YYYY-MM-DD'))
    }

    return (
      <>
        <div className="shippingProgram">
          <div className="shippingProgram__grid">
            <div className="shippingProgram__row">
              <div className="shippingProgram__cell --customer">
                SUPERVISORES
              </div>
              <div className="shippingProgram__cell --customer">
                PROGRAMA DE
              </div>
              <div className="shippingProgram__cell --customer">ASERRIO</div>
              <div className="shippingProgram__cell --customer">
                {moment().weekday(1).format('DD')} -
                {moment().weekday(6).format('DD')}{' '}
                {moment().format('MMMM YYYY')}
              </div>
              <div className="shippingProgram__cell --customer">
                LUNES PIZARRON
              </div>
              <div className="shippingProgram__cell --customer">
                LUNES PRODU
              </div>
              <div className="shippingProgram__cell --customer">
                MARTES PIZARRON
              </div>
              <div className="shippingProgram__cell --customer">
                MARTES PRODU
              </div>
              <div className="shippingProgram__cell --customer">
                MIERCOLES PIZARRON
              </div>
              <div className="shippingProgram__cell --customer">
                MIERCOLES PRODU
              </div>
              <div className="shippingProgram__cell --customer">
                JUEVES PIZARRON
              </div>
              <div className="shippingProgram__cell --customer">
                JUEVES PRODU
              </div>
              <div className="shippingProgram__cell --customer">
                VIERNES PIZARRON
              </div>
              <div className="shippingProgram__cell --customer">
                VIERNES PRODU
              </div>
              <div className="shippingProgram__cell --customer">
                SABADO PIZARRON
              </div>
              <div className="shippingProgram__cell --customer">
                SABADO PRODU
              </div>
            </div>
            <div className="shippingProgram__row">
              <div className="shippingProgram__cell --customer"></div>
              <div className="shippingProgram__cell --customer">CUB TOTAL</div>
              <div className="shippingProgram__cell --customer">CUB</div>
              <div className="shippingProgram__cell --customer">MODELO</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
              <div className="shippingProgram__cell --customer">PROD. P/T</div>
            </div>
            <div className="shippingProgram__row">
              <div className="shippingProgram__cell">
                {moment('2021-03-03').weekday(1).format('YYYY-MM-DD')}
              </div>
            </div>
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
    supplierDelivery: state.supplierDelivery,
    suppliers: state.suppliers,
  }
}

const mapDispatchToProps = {
  getAll,
  setWraper,
  setTitle,
  create,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Sawn)