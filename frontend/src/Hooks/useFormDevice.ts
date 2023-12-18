/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useReducer } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { update, create } from '../services/api'
import { useFormFieldData } from './useFormData'
import { type MappedDevice } from '../types/types'

interface INITIALSTATE {
  device: DEVICE
  formMethod: 'create' | 'edit'
  loading: boolean
}

type DEVICE = Omit<MappedDevice, 'modelName' | 'categoryName' | 'brandName'>

const initialState: INITIALSTATE = {
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
  return reducerObject(state, action.payload)[action.type] || state
}

const actionType = {
  initDeviceEdit: 'INIT_DEVICES_EDIT',
  initDeviceCreate: 'INIT_DEVICES_CREATE',
  initState: 'INIT_STATE',
  changeValue: 'CHANGE_VALUE',
  start: 'START'
}

const reducerObject = (state, payload) => ({
  [actionType.initDeviceEdit]: {
    ...state,
    loading: false,
    formMethod: 'edit',
    device: {
      id: payload?.device?.id,
      activo: payload?.device?.activo,
      serial: payload?.device?.serial,
      status: payload?.device?.status,
      modelId: payload?.device?.model.id,
      brandId: payload?.device?.model.brand.id,
      categoryId: payload?.device?.model.category.id
    }
  },
  [actionType.initDeviceCreate]: {
    ...state,
    loading: false,
    formMethod: 'create',
    device: {
      id: '',
      activo: '',
      serial: '',
      status: '',
      modelId: '',
      brandId: '',
      categoryId: ''
    }
  },
  [actionType.initState]: {
    ...state,
    ...initialState
  },
  [actionType.changeValue]: {
    ...state,
    device: {
      ...state.device,
      [payload?.name]: payload?.value
    }
  }
})

export const useFormDevice = () => {
  const { deviceId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [{ device, loading, formMethod }, dispatch] = useReducer(reducer, initialState)
  const { brands, categories, models, status } = useFormFieldData({ brandId: device.brandId, categoryId: device.categoryId })

  useEffect(() => {
    if (location.pathname.includes('addnewdevice')) {
      dispatch({ type: actionType.initDeviceCreate })
      return
    }

    if (location.state?.devices) {
      const { device } = location.state
      dispatch({ type: actionType.initDeviceEdit, payload: { device } })
    } else {
      import('../services/api')
        .then(async module => await module.getOne({ path: 'device', id: deviceId }))
        .then(device => {
          dispatch({ type: actionType.initDeviceEdit, payload: { device } })
        })
        .catch(err => { console.error(err) })
    }

    dispatch({ type: actionType.initState })

    return () => {
      dispatch({ type: actionType.initState })
    }
  }, [deviceId, location.state?.devices])

  const handleChange = (event) => {
    const { name, value } = event.target
    dispatch({ type: actionType.changeValue, payload: { name, value } })
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
