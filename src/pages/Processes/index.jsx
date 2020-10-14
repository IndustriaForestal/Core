import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../actions/app'
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import './styles.scss'

const Processes = props => {
  const { processes, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Procesos',
      menu: { Procesos: '/processes' },
    }
    setTitle(topbar)
    props.getAll('processes', 'GET_PROCESSES')
    // eslint-disable-next-line
  }, [])

  const tableHeader = ['Nombre', 'Acciones']

  const handleDeleteProcess = processId => {
    props.deleted(`processes/${processId}`, 'DELETE_PROCESS')
  }

  return (
    <>
      <Table head={tableHeader}>
        {processes ? (
          processes.map((process) => (
            <tr key={process._id}>
              <td>{process.name}</td>
              <td>
                <Link to={`processes/${process._id}`}>
                  <Button className="btn --warning">
                    <AiOutlineEdit />
                  </Button>
                </Link>
                <Button
                  className="btn --danger"
                  onClick={() => handleDeleteProcess(process._id)}
                >
                  <AiOutlineDelete />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No hay registros</td>
          </tr>
        )}
      </Table>
      <Link to="/processes/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    processes: state.processes,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Processes)
