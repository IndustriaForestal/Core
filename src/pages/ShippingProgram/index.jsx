import React, { useEffect } from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
import 'moment/locale/es-mx'
import { connect } from 'react-redux'
import './styles.scss'
import Loading from '../../components/Loading/Loading'
import AddButton from '../../components/AddButton/AddButton'

import { getAll, setWraper, create, setTitle } from '../../actions/app'

moment.locale('es')

const ShippingProgram = props => {
  const { shippingProgram, customers } = props

  useEffect(() => {
    const topbar = {
      title: 'Programa de Embarques',
      menu: {
        Programa: '/shipping-program',
        Stock: '/shipping-program/stock',
      },
    }
    props.setTitle(topbar)
    props
      .getAll('shippingProgram', 'GET_SHIPPING_PROGRAM')
      .then(() => {
        props.getAll('customers', 'GET_CUSTOMERS')
      })
      .then(() => {
        props.setWraper(true)
      })
  }, [])

  const handleSaveShipping = async (date, customer, e) => {
    if (e.key === 'Enter') {
      console.log(date, customer, e.target.value)
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
          .create('shippingProgram', 'CREATE_SHIPPING_PROGRAM', {
            date,
            customer,
            color,
            pallet,
          })
          .then(() => {
            props.getAll('shippingProgram', 'GET_SHIPPING_PROGRAM')
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

  if (shippingProgram && customers) {
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
              {customers.map(customer => (
                <div
                  className="shippingProgram__cell --customer"
                  key={customer._id}
                >
                  {customer.name}
                </div>
              ))}
            </div>
            {days.map((day, index) => (
              <div className="shippingProgram__row" key={index}>
                <div className="shippingProgram__cell --sticky">
                  {moment(day).format('dddd')}
                </div>
                <div className="shippingProgram__cell --sticky">{day}</div>
                {customers.map(customer =>
                  shippingProgram.filter(
                    shipping => shipping.customer === customer._id
                  )[0] &&
                  moment(
                    shippingProgram.filter(
                      shipping => shipping.customer === customer._id
                    )[0].date
                  ).format('YYYY-MM-DD') === day ? (
                    <div
                      key={customer._id}
                      className={`shippingProgram__cell --${
                        shippingProgram.filter(
                          shipping => shipping.customer === customer._id
                        )[0].color
                      }`}
                    >
                      {
                        shippingProgram.filter(
                          shipping => shipping.customer === customer._id
                        )[0].pallet
                      }
                    </div>
                  ) : (
                    <input
                      key={customer._id}
                      className="shippingProgram__cell"
                      onKeyPress={e => handleSaveShipping(day, customer._id, e)}
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
        <AddButton>+</AddButton>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    shippingProgram: state.shippingProgram,
    customers: state.customers,
  }
}

const mapDispatchToProps = {
  getAll,
  setWraper,
  setTitle,
  create,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingProgram)
