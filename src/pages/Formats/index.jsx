import React, { useEffect } from 'react'

import { connect } from 'react-redux'

import { setTitle, getAll, deleted } from '../../actions/app'

import Button from '../../components/Button/Button'

import Input from '../../components/Input/Input'
import Card from '../../components/Card/Card'
import './styles.scss'

const Format1 = props => {
  const { setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'RECOPILACIÓN DE INFORMACIÓN PARA VENTA',
      menu: {
        'RECOPILACIÓN DE INFORMACIÓN PARA VENTA': '/format',
        'FOR-CAL-FTP022': '/format/forcalftp022',
      },
    }
    setTitle(topbar)
    props.getAll('nails', 'GET_NAILS')
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Card
        title="FORMATO RECOPILACIÓN DE INFORMACIÓN PARA VENTA"
        className="card --primary --twoColumns"
      >
        <Input title="ASESOR DE VENTAS" />
        <Input title="FOLIO " />
        <Input title="ZONA DE VENTA" />
      </Card>
      <Card
        title="DATOS DE LA EMPRESA SOLICITANTE"
        className="card --primary --twoColumns"
      >
        <Input title="NOMBRE O RAZON SOCIAL" />
        <Input title="GIRO EMPRESARIAL" />
        <Input title="CALLE" />
        <Input title="NUMERO" />
        <Input title="COLONIA O MUNICIPIO" />
        <Input title="ESTADO" />
        <Input title="PAÍS" />
        <Input title="TELÉFONO" />
        <Input title="EMAIL" />
        <Input title="PÁGINA WEB" />
      </Card>
      <Card
        title="INFORMACIÓN DE CONTACTO"
        className="card --primary --twoColumns"
      >
        <Input title="NOMBRE DEL COMPRADOR" />
        <Input title="PUESTO" />
        <Input title="TELÉFONO OFICINA" />
        <Input title="TELÉFONO MÓVIL" />
        <Input title="EMAIL" />
        <Input title="PÁGINA WEB" />
      </Card>
      <Card title="TIPO DE PRODUCTO">
        <label className="--label" htmlFor="typeProduct">
          TARIMA DE MADERA
          <input type="radio" className="--radio" name="typeProduct" id="" />
        </label>
        <label className="--label" htmlFor="typeProduct">
          TABLA O TABLÓN
          <input type="radio" className="--radio" name="typeProduct" id="" />
        </label>
        <label className="--label" htmlFor="typeProduct">
          MARCO DE MADERA
          <input type="radio" className="--radio" name="typeProduct" id="" />
        </label>
        <label className="--label" htmlFor="typeProduct">
          POLÍN O VIGA
          <input type="radio" className="--radio" name="typeProduct" id="" />
        </label>
      </Card>
      <Card
        title="CARACTERÍSTICAS ESPECIALES"
        className="card --primary boxFormRadius"
      >
        <Card className="card --primary --labelPatch" title="CLASIFICACIÓN">
          <label className="--label" htmlFor="quality">
            A: ALIMENTICIO
            <input type="radio" className="--radio" name="quality" id="" />
          </label>
          <label className="--label" htmlFor="quality">
            B: INDUSTRIA
            <input type="radio" className="--radio" name="quality" id="" />
          </label>
          <label className="--label" htmlFor="quality">
            C: TBC
            <input type="radio" className="--radio" name="quality" id="" />
          </label>
          <label className="--label" htmlFor="quality">
            D: RECUPERACIÓN
            <input type="radio" className="--radio" name="quality" id="" />
          </label>
        </Card>
        <Card className="card --primary --labelPatch" title="TIPO DE MADERA">
          <label className="--label" htmlFor="typeWood">
            PINO
            <input type="radio" className="--radio" name="typeWood" id="" />
          </label>
          <label className="--label" htmlFor="typeWood">
            MBC(MANGO, ENCINO, HULE, ETC)
            <input type="radio" className="--radio" name="typeWood" id="" />
          </label>
        </Card>
        <Card className="card --primary --labelPatch" title="ESTUFADO">
          <label className="--label" htmlFor="estufado">
            SI
            <input type="radio" className="--radio" name="estufado" id="" />
          </label>
          <label className="--label" htmlFor="estufado">
            NO
            <input type="radio" className="--radio" name="estufado" id="" />
          </label>
        </Card>
        <Card
          className="card --primary --labelPatch"
          title="TIPO DE TRANSPORTE"
        >
          <label className="--label" htmlFor="typeShipping">
            CAJA
            <input type="radio" className="--radio" name="typeShipping" id="" />
          </label>
          <label className="--label" htmlFor="typeShipping">
            PLATAFORMA
            <input type="radio" className="--radio" name="typeShipping" id="" />
          </label>
        </Card>
        <Card
          className="card --primary --labelPatch"
          title="ESPECIFICACIONES DE CALIDAD"
        >
          <label className="--label" htmlFor="plane">
            ANEXA PLANO
            <input type="radio" className="--radio" name="plane" id="" />
          </label>
        </Card>
        <Card
          className="card --primary --labelPatch"
          title="TRATAMIENTO TÉRMICO"
        >
          <label className="--label" htmlFor="termico">
            SI
            <input type="radio" className="--radio" name="termico" id="" />
          </label>
          <label className="--label" htmlFor="termico">
            NO
            <input type="radio" className="--radio" name="termico" id="" />
          </label>
        </Card>
        <Card
          className="card --primary --labelPatch"
          title="OTROS REQUERIMIENTOS"
        >
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </Card>
      </Card>
      <Button>GUARDAR</Button>
    </>
  )
}

const mapStateToProps = state => {
  return {
    nails: state.nails,
    role: state.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Format1)
