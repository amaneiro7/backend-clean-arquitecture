/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useReducer } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { update, create } from '../services/api'
import { useFormFieldData } from './useFormData'

const initialState = {
  device: {
    id: '',
    activo: '',
    serial: '',
    status: '',
    modelId: '',
    brandId: '',
    categoryId: ''
  },
  formMethod: 'create',
  loading: true
}

const reducer = (state, action) => {
  if (action.type === 'INIT_DEVICES_EDIT') {
    const { device } = action.payload
    const deviceMapper = {
      id: device.id,
      activo: device.activo,
      serial: device.serial,
      status: device.status,
      modelId: device.model.id,
      brandId: device.model.brand.id,
      categoryId: device.model.category.id
    }

    return {
      ...state,
      loading: false,
      formMethod: 'edit',
      device: deviceMapper
    }
  }
  if (action.type === 'INIT_DEVICES_CREATE') {
    const deviceMapper = {
      id: '',
      activo: '',
      serial: '',
      status: '',
      modelId: '',
      brandId: '',
      categoryId: ''
    }

    return {
      ...state,
      device: deviceMapper,
      formMethod: 'create',
      loading: false
    }
  }
  if (action.payload === 'INIT_STATE') {
    return {
      ...state,
      ...initialState
    }
  }

  if (action.type === 'CHANGE_VALUE') {
    const { name, value } = action.payload
    const newData = {
      ...state.device,
      [name]: value
    }

    return {
      ...state,
      device: newData
    }
  }
  if (action.type === 'START') {
    const { loading } = action.payload
    return {
      ...state,
      loading
    }
  }
  return state
}

export const useFormDevice = () => {
  const { deviceId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [{ device, loading, formMethod }, dispatch] = useReducer(reducer, initialState)
  const { brands, categories, models, status } = useFormFieldData({ brandId: device.brandId, categoryId: device.categoryId })

  useEffect(() => {
    if (location.pathname.includes('addnewdevice')) {
      dispatch({ type: 'INIT_DEVICES_CREATE' })
      return
    }

    if (location.state?.devices) {
      const { device } = location.state
      dispatch({ type: 'INIT_DEVICES_EDIT', payload: { device } })
    } else {
      console.log('He llegado hasta aqui')
      import('../services/api')
        .then(async module => await module.getOne({ path: 'device', id: deviceId }))
        .then(device => {
          dispatch({ type: 'INIT_DEVICES_EDIT', payload: { device } })
        })
        .catch(err => { console.error(err) })
    }

    dispatch({ type: 'INIT_STATE' })

    return () => {
      dispatch({ type: 'INIT_STATE' })
    }
  }, [deviceId, location.state?.devices])

  const handleChange = (event) => {
    const { name, value } = event.target
    dispatch({ type: 'CHANGE_VALUE', payload: { name, value } })
  }

  const handleSave = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    const entries = formData.entries()
    const data = {}
    for (const entry of entries) {
      if (isValidEntry(entry[0])) {
        data[entry[0]] = entry[1]
      }
    }

    await create({ path: 'device', data })
    handleClose()
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    const entries = formData.entries()
    const data = {}
    for (const entry of entries) {
      if (isValidEntry(entry[0])) {
        data[entry[0]] = entry[1]
      }
    }

    await update({ path: 'device', id: deviceId, data })
    handleClose()
  }

  function isValidEntry (entryKey: [string, FormDataEntryValue]) {
    return (
      entryKey.includes('activo') ||
      entryKey.includes('serial') ||
      entryKey.includes('modelId') ||
      entryKey.includes('status')
    )
  }

  const handleClose = () => {
    navigate('/')
  }

  return {
    device,
    categories,
    status,
    brands,
    models,
    loading,
    formMethod,
    handleChange,
    handleSave,
    handleUpdate,
    handleClose
  }
}
