import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../../components/Table/Table'
import Button from '../../../components/Button/Button'
import AddButton from '../../../components/AddButton/AddButton'
import SearchBar from '../../../components/SearchBar/SearchBar'

import Input from '../../../components/Input/Input'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading/Loading'

const Format1 = props => {
  const { pallets, setTitle, role } = props
  const [filter, setFilter] = useState([])

  useEffect(() => {
    const topbar = {
      title: 'FOR-CAL-FTP022',
      menu: {
        'RECOPILACIÓN DE INFORMACIÓN PARA VENTA': '/format',
        'FOR-CAL-FTP022': '/format/forcalftp022',
      },
    }
    setTitle(topbar)
    props.getAll('pallets', 'GET_PALLETS')
    // eslint-disable-next-line
  }, [])

  let tableHeader
  role === 'Administrador'
    ? (tableHeader = ['Nombre', 'Stock', 'Acciones'])
    : (tableHeader = ['Nombre', 'Stock'])

  const handleDeleteNail = nailId => {
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
        props.deleted(`nails/${nailId}`, 'DELETE_NAIL')
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  // const handleSearch = e => {
  //   const searchWord = e.target.value.toLowerCase()
  //   const filterPallets = nails.filter(nail =>
  //     nail.name.toLowerCase().includes(searchWord)
  //   )
  //   setFilter(filterPallets)
  // }

  // let tableData
  // if (filter.length > 0) {
  //   tableData = filter
  // } else {
  //   tableData = nails
  // }
  if (pallets) {
    return (
      <>
        <Card
          title="FICHA TÉCNICA DE PRODUCTOS"
          className="card --primary --twoColumns"
        >
          <Input title="FECHA DE ELABORACIÓN" />
          <Input title="CÓDIGO DE IDENTIFICACIÓN " />
          <Input title="ÁREA RESPONSABLE" />
        </Card>
        <Card title="DATOS" className="card --primary --twoColumns">
          <Input title="NOMBRE COMERCIAL DEL PRODUCTO:" />
          <Input title="CODIGO DE IDENTIFICACION DEL PRODUCTO" />
          <Input type="file" title="LOGOTIPO DEL CLIENTE" />
          <div className="inputGroup">
            <label htmlFor="processId">
              <span>Tarimas</span>
              <select name="palletId">
                <option value="0">Seleccionar...</option>
                {pallets.map(pallet => {
                  return (
                    <option key={pallet._id} value={pallet._id}>
                      {pallet.model}
                    </option>
                  )
                })}
              </select>
            </label>
          </div>
        </Card>
        <Card
          title="ESPECIFICACIONES TÉCNICAS DEL PRODUCTO"
          className="card --primary --twoColumns"
        >
          <Input title="MEDIDAS" />
          <Input title="ASPECTO" />
          <Input title="CUBICACIÓN" />
          <Input title="MEDIDA DEL CLAVO" />
          <Input title="SELLO(COLOR)" />
          <Input title="TIPO DE ENTRADA" />
          <Input title="TOLERANCIA EN MEDIDAS:" />
        </Card>

        <table className="excel">
          <thead>
            <tr>
              <th>CRITERIOS DE CALIDAD</th>
              <th>ESPECIFICACION</th>
              <th>TOLERANCIAS</th>
              <th>OBSERVACIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MEDIDAS</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>HUMEDAD</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>NUDOS</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>HONGO Y PLAGA</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>LOGOTIPO</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>CLABOS SOBRESALIDOS</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>TABLA FRACTURADA</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>PLIN FRACTURADO</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>ROTULOS</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>MANCHAS</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>HT</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>EXESO DE ASERRION</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>TAQUETE FRACTURADO</td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>
          </tbody>
        </table>

        <Button>GUARDAR</Button>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    pallets: state.pallets,
    role: state.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Format1)
