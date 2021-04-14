import React, { useEffect, useState } from 'react'
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
  update,
} from '../../../actions/app'

moment.locale('es')

const Sawn = props => {
  const { sawn, suppliers } = props
  const [volume, setVolume] = useState(0)
  const [pallet, setPallet] = useState(0)

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
      .getAll('shippingProgram/sawn', 'GET_SHIPPING_PROGRAM_SAWN')
      .then(() => {
        props.getAll('suppliers', 'GET_SUPPLIERS')
      })
      .then(() => {
        props.setWraper(true)
      })
         // eslint-disable-next-line
  }, [])

  const handleSawn = async (e, date) => {
    if (e.key === 'Enter') {
      const amount = e.target.value
      console.log(date, amount)

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
          .create('shippingProgram/sawn', 'CREATE_SHIPPING_PROGRAM', {
            date,
            volume,
            amount,
            color,
            pallet,
          })
          .then(() => {
            props.getAll('shippingProgram/sawn', 'GET_SHIPPING_PROGRAM_SAWN')
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

  const handleUpdateSawn = (e, id) => {
    if (e.key === 'Enter') {
      props
        .update(`shippingProgram/sawn/${id}`, 'CREATE_SHIPPING_PROMGRAM', {
          prod: e.target.value,
        })
        .then(() => {
          props.getAll('shippingProgram/sawn', 'GET_SHIPPING_PROGRAM_SAWN')
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

  const handleDeleteSawn = id => {
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
          .deleted(`shippingProgram/sawn/${id}`, 'DELETE_SHIPPING_PROGRAM')
          .then(() => {
            props.getAll('shippingProgram/sawn', 'GET_SHIPPING_PROGRAM_SAWN')
          })
          .then(() => {
            Swal.fire('Borrado!', 'Borrado con exito.', 'success')
          })
      }
    })
  }



  const sortOrder = {
    yellow: 0,
    green: 1,
    greenYellow: 2,
    blue: 3,
    orange: 4,
    red: 5,
  }

 

  if (sawn && suppliers) {
    let cubTotal = 0
    let totalMonday = 0
    let totalTuesday = 0
    let totalWednesday = 0
    let totalThursday = 0
    let totalFriday = 0
    let totalSaturday = 0
    sawn
      .filter(saw =>
        moment(saw.date).isBetween(moment().weekday(1), moment().weekday(6))
      )
      .map(saw => {
        switch (moment(saw.date).isoWeekday()) {
          case 1:
            console.log('1')
            totalMonday += saw.prod
            break
          case 2:
            console.log('2')
            totalTuesday += saw.prod
            break
          case 3:
            console.log('3')
            totalWednesday += saw.prod
            break
          case 4:
            console.log('4')
            totalThursday += saw.prod
            break
          case 5:
            console.log('5')
            totalFriday += saw.prod
            break
          case 6:
            console.log('6')
            totalSaturday += saw.prod
            break

          default:
            console.log('.i.')
        }

        return (cubTotal += parseFloat(saw.volume * saw.amount))
      })
    console.log(cubTotal)
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
            {sawn
              .filter(saw =>
                moment(saw.date).isBetween(
                  moment().weekday(1),
                  moment().weekday(6)
                )
              )
              .sort(function (p1, p2) {
                return sortOrder[p1.color] - sortOrder[p2.color]
              })
              .map((saw, index) => (
                <div className={`shippingProgram__row`} key={saw.id}>
                  <div
                    onClick={() => handleDeleteSawn(saw.id)}
                    className={`shippingProgram__cell --${saw.color}`}
                  >
                    {/*   {sawn.filter(sa => sa.color === saw.color).length ===
                    index + 1
                      ? handleTotalVolume(sawn, saw.color)
                      : null} */}
                  </div>
                  <div className={`shippingProgram__cell --${saw.color}`}>
                    {(saw.volume * saw.amount).toFixed(2)}
                  </div>
                  <div className={`shippingProgram__cell --${saw.color}`}>
                    {saw.volume}
                  </div>
                  <div
                    className={`shippingProgram__cell --${saw.color}`}
                    onClick={() => handleDeleteSawn(saw.id)}
                  >
                    {saw.pallet}
                  </div>

                  {moment().weekday(1).format('YYYY-MM-DD') ===
                  moment(saw.date).format('YYYY-MM-DD') ? (
                    <>
                      <div className={`shippingProgram__cell --${saw.color}`}>
                        {saw.amount}
                      </div>
                      <input
                        className={`shippingProgram__cell --${saw.color}`}
                        defaultValue={saw.prod}
                        onKeyPress={e => handleUpdateSawn(e, saw.id)}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                    </>
                  )}
                  {moment().weekday(2).format('YYYY-MM-DD') ===
                  moment(saw.date).format('YYYY-MM-DD') ? (
                    <>
                      <div className={`shippingProgram__cell --${saw.color}`}>
                        {saw.amount}
                      </div>
                      <input
                        className={`shippingProgram__cell --${saw.color}`}
                        defaultValue={saw.prod}
                        onKeyPress={e => handleUpdateSawn(e, saw.id)}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                    </>
                  )}
                  {moment().weekday(3).format('YYYY-MM-DD') ===
                  moment(saw.date).format('YYYY-MM-DD') ? (
                    <>
                      <div className={`shippingProgram__cell --${saw.color}`}>
                        {saw.amount}
                      </div>
                      <input
                        className={`shippingProgram__cell --${saw.color}`}
                        defaultValue={saw.prod}
                        onKeyPress={e => handleUpdateSawn(e, saw.id)}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                    </>
                  )}
                  {moment().weekday(4).format('YYYY-MM-DD') ===
                  moment(saw.date).format('YYYY-MM-DD') ? (
                    <>
                      <div className={`shippingProgram__cell --${saw.color}`}>
                        {saw.amount}
                      </div>
                      <input
                        className={`shippingProgram__cell --${saw.color}`}
                        defaultValue={saw.prod}
                        onKeyPress={e => handleUpdateSawn(e, saw.id)}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                    </>
                  )}
                  {moment().weekday(5).format('YYYY-MM-DD') ===
                  moment(saw.date).format('YYYY-MM-DD') ? (
                    <>
                      <div className={`shippingProgram__cell --${saw.color}`}>
                        {saw.amount}
                      </div>
                      <input
                        className={`shippingProgram__cell --${saw.color}`}
                        defaultValue={saw.prod}
                        onKeyPress={e => handleUpdateSawn(e, saw.id)}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                    </>
                  )}
                  {moment().weekday(6).format('YYYY-MM-DD') ===
                  moment(saw.date).format('YYYY-MM-DD') ? (
                    <>
                      <div className={`shippingProgram__cell --${saw.color}`}>
                        {saw.amount}
                      </div>
                      <input
                        className={`shippingProgram__cell --${saw.color}`}
                        defaultValue={saw.prod}
                        onKeyPress={e => handleUpdateSawn(e, saw.id)}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                      <div
                        className={`shippingProgram__cell --${saw.color}`}
                      ></div>
                    </>
                  )}
                </div>
              ))}
            <div className="shippingProgram__row">
              <div className="shippingProgram__cell"></div>
              <div className="shippingProgram__cell">{cubTotal.toFixed(2)}</div>
              <div className="shippingProgram__cell"></div>
              <div className="shippingProgram__cell"></div>
              <div className="shippingProgram__cell"></div>
              <div className="shippingProgram__cell">{totalMonday}</div>
              <div className="shippingProgram__cell"></div>
              <div className="shippingProgram__cell">{totalTuesday}</div>
              <div className="shippingProgram__cell"></div>
              <div className="shippingProgram__cell">{totalWednesday}</div>
              <div className="shippingProgram__cell"></div>
              <div className="shippingProgram__cell">{totalThursday}</div>
              <div className="shippingProgram__cell"></div>
              <div className="shippingProgram__cell">{totalFriday}</div>
              <div className="shippingProgram__cell"></div>
              <div className="shippingProgram__cell">{totalSaturday}</div>
            </div>
            <div className="shippingProgram__row">
              <div className="shippingProgram__cell"></div>
              <div className="shippingProgram__cell"></div>
              <input
                className="shippingProgram__cell"
                onChange={e => setVolume(e.target.value)}
              />
              <input
                className="shippingProgram__cell"
                onChange={e => setPallet(e.target.value)}
              />
              <input
                onKeyPress={e =>
                  handleSawn(e, moment().weekday(1).format('YYYY-MM-DD'))
                }
                className="shippingProgram__cell"
              />
              <div className="shippingProgram__cell"></div>
              <input
                onKeyPress={e =>
                  handleSawn(e, moment().weekday(2).format('YYYY-MM-DD'))
                }
                className="shippingProgram__cell"
              />
              <div className="shippingProgram__cell"></div>
              <input
                onKeyPress={e =>
                  handleSawn(e, moment().weekday(3).format('YYYY-MM-DD'))
                }
                className="shippingProgram__cell"
              />
              <div className="shippingProgram__cell"></div>
              <input
                onKeyPress={e =>
                  handleSawn(e, moment().weekday(4).format('YYYY-MM-DD'))
                }
                className="shippingProgram__cell"
              />
              <div className="shippingProgram__cell"></div>
              <input
                onKeyPress={e =>
                  handleSawn(e, moment().weekday(5).format('YYYY-MM-DD'))
                }
                className="shippingProgram__cell"
              />
              <div className="shippingProgram__cell"></div>
              <input
                onKeyPress={e =>
                  handleSawn(e, moment().weekday(6).format('YYYY-MM-DD'))
                }
                className="shippingProgram__cell"
              />
              <div className="shippingProgram__cell"></div>
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
    sawn: state.sawn,
    suppliers: state.suppliers,
  }
}

const mapDispatchToProps = {
  getAll,
  setWraper,
  setTitle,
  create,
  deleted,
  update,
}

export default connect(mapStateToProps, mapDispatchToProps)(Sawn)
