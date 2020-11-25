import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { BsPlus } from 'react-icons/bs'
import {
  AiOutlineFileAdd,
  AiOutlineEdit,
  AiOutlineDelete,
} from 'react-icons/ai'
import { setTitle, getAll, deleted } from '../../actions/app'
import { deleteProcessQuality } from './actions'
import Card from '../../components/Card/Card'
import Table from '../../components/Table/Table'
import AddButton from '../../components/AddButton/AddButton'
import Loading from '../../components/Loading/Loading'
import Button from '../../components/Button/Button'
import './styles.scss'

const Qualities = props => {
  const { qualities, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Calidades',
      menu: { Tarimas: '/pallets', Complementos: '/items', Clavos: '/nails', Calidades: '/qualities' },

    }
    setTitle(topbar)
    props.getAll('qualities', 'GET_QUALITIES')
    // eslint-disable-next-line
  }, [])

  const handleDeleteQuality = qualityId => {
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
        props.deleted(`qualities/${qualityId}`, 'DELETE_QUALITY')
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  const handleDeleteProcessQuality = (processId, qualityId) => {
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
        props.deleteProcessQuality(
          `qualities/delete/${qualityId}/${processId}`,
          'DELETE_PROCESS_QUALITY'
        )
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  const tableHeader = [
    '#',
    'Nombre',
    'Capacidad',
    'Duración',
    'Personal',
    'Usa',
    'Acciones',
  ]

  return (
    <>
      {qualities ? (
        qualities.map(quality => {
          return (
            <Card
              key={quality._id}
              title={`Calidad: ${quality.name}`}
              tools={
                <div>
                  <Link to={`qualities/add/${quality._id}`}>
                    <AiOutlineFileAdd className="--success" />
                  </Link>
                  <AiOutlineDelete
                    className="--danger"
                    onClick={() => handleDeleteQuality(quality._id)}
                  />
                </div>
              }
            >
              {quality.process[0].processName ? (
                <Table head={tableHeader}>
                  {quality.process.map((process, index) => {
                    return (
                      <tr key={index}>
                        <td>{process.position}</td>
                        <td>{process.processName}</td>
                        <td>{process.capacity}</td>
                        <td>{process.duration}</td>
                        <td>{process.people}</td>
                        <td>{process.type === '1' ? 'Tarima' : 'P/T'}</td>
                        <td>
                          <Link to={`qualities/edit/${quality._id}/${process.processId}`}>
                            <Button className="btn --warning">
                              <AiOutlineEdit />
                            </Button>
                          </Link>
                          <Button
                            className="btn --danger"
                            onClick={() => handleDeleteProcessQuality(process.processId, quality._id)}
                          >
                            <AiOutlineDelete />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </Table>
              ) : (
                <h3>No hay procesos agregados</h3>
              )}
            </Card>
          )
        })
      ) : (
        <Loading />
      )}
      <Link to="/qualities/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    qualities: state.qualities,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
  deleteProcessQuality,
}

export default connect(mapStateToProps, mapDispatchToProps)(Qualities)
