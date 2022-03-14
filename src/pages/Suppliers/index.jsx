import React, { useEffect, useState, memo } from 'react'
import { connect } from 'react-redux'
import { getAll, create, update, setTitle, deleted } from '../../actions/app'
import { SketchPicker } from 'react-color'

import MaterialTable from 'material-table'

const CreateCustomer = props => {
  const { material, suppliers, user } = props
  const [color, setColor] = useState('#ffffff')
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Proveedores',
      menu: {
        Proveedores: '/suppliers',
      },
    }
    props.setTitle(topbar)
    props.getAll('suppliers', 'GET_SUPPLIERS').then(() => {
      props.getAll('material', 'GET_MATERIAL')
    })

    // eslint-disable-next-line
  }, [])

  console.log(color)

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          newData.color = color.hex
          props
            .create(`suppliers`, 'CREATE_SUPPLIER', newData)
            .then(() => props.getAll('suppliers', 'GET_SUPPLIERS'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          delete newData.id
          newData.user_id = userId
          newData.color = color.hex
          props
            .update(`suppliers/${oldData.id}`, 'UPDATE_SUPPLIER', newData)
            .then(() => props.getAll('suppliers', 'GET_SUPPLIERS'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`suppliers/${oldData.id}`, 'DELETE_SUPPLIER')
            .then(() => props.getAll('suppliers', 'GET_SUPPLIERS'))
            .then(() => resolve())
        }, 1000)
      }),
  }

  const handleChangeColor = color => {
    setColor(color)
  }

  if (material && suppliers) {
    const lookupItemsType = {}

    material.map(item => (lookupItemsType[item.id] = item.name))

    const Item = memo(() => (
      <SketchPicker color={color} onChangeComplete={handleChangeColor} />
    ))

    return (
      <>
        {/*  */}
        <MaterialTable
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Télefono', field: 'phone' },
            { title: 'Dirección', field: 'address' },
            { title: 'RFC', field: 'rfc' },
            {
              title: 'Color',
              field: 'color',
              editComponent: rowData => (
                <div>
                  <Item />
                </div>
              ),
              render: rowData => (
                <div
                  style={{
                    backgroundColor: `${rowData.color}`,
                    height: '20px',
                    width: '20px',
                  }}
                ></div>
              ),
            },
            { title: 'Tiempo de entrega hrs.', field: 'delivery_time' },
            {
              title: 'Tipo de material',
              field: 'material_id',
              lookup: lookupItemsType,
            },
          ]}
          localization={{
            pagination: {
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'Filas',
              firstAriaLabel: 'Primera',
              firstTooltip: 'Primera',
              previousAriaLabel: 'Anterior',
              previousTooltip: 'Anterior',
              nextAriaLabel: 'Siguiente',
              nextTooltip: 'Siguiente',
              lastAriaLabel: 'Ultimo',
              lastTooltip: 'Ultimo',
            },
            toolbar: {
              searchTooltip: 'Buscar',
              searchPlaceholder: 'Buscar',
            },
            header: {
              actions: 'Acciones',
            },
            body: {
              editRow: {
                deleteText: '¿Eliminar?',
                saveTooltip: 'Ok',
                cancelTooltip: 'Cancelar',
              },
              editTooltip: 'Editar',
              deleteTooltip: 'Eliminar',
              addTooltip: 'Agregar',
            },
          }}
          data={suppliers}
          editable={editable}
          title="Proveedores"
        />
      </>
    )
  } else {
    return <h1>Cargando</h1>
  }
}

const mapDispatchToProps = {
  create,
  getAll,
  update,
  setTitle,
  deleted,
}

const mapStateToProps = state => {
  return {
    material: state.reducerMaterial.material,
    suppliers: state.reducerSuppliers.suppliers,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer)
