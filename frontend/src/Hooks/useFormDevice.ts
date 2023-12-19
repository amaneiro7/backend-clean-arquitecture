/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useReducer } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { update, create } from '../services/api'
import { useFormFieldData } from './useFormData'
import { type MappedDevice } from '../types/types'
import { toastMessage } from '../utils/toaster'
import { formEntries } from '../utils/formEntries'

interface INITIALSTATE {
  device: DEVICE
  formMethod: 'create' | 'edit'
  loading: boolean
  loadFetching: boolean
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
  loading: true,
  loadFetching: false
}

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state
}

const actionType = {
  initDeviceEdit: 'INIT_DEVICES_EDIT',
  initDeviceCreate: 'INIT_DEVICES_CREATE',
  initState: 'INIT_STATE',
  changeValue: 'CHANGE_VALUE',
  startFetching: 'START_FETCHING',
  finishFetching: 'FINISH_FETCHING'
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
    ...initialState
  },
  [actionType.changeValue]: {
    ...state,
    device: {
      ...state.device,
      [payload?.name]: payload?.value
    }
  },
  [actionType.startFetching]: {
    ...state,
    loadFetching: true
  },
  [actionType.finishFetching]: {
    ...state,
    loadFetching: false
  }
})

export const useFormDevice = () => {
  const { deviceId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [{ device, loading, formMethod, loadFetching }, dispatch] = useReducer(reducer, initialState)
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch({ type: actionType.changeValue, payload: { name, value } })
  }

  const handleSave = async (event: React.FormEvent<HTMLElement>) => {
    try {
      dispatch({ type: actionType.startFetching })
      toastMessage({ message: 'Loading', type: 'loading' })
      event.preventDefault()
      const data = formEntries({ targetReference: event.target, formReference: 'deviceForm' })
      const { message } = await create({ path: 'device', data })
      toastMessage({ message, type: 'success' })
      dispatch({ type: actionType.finishFetching })
      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (error) {
      console.log(error)
      toastMessage({ message: error, type: 'error' })
    }
  }

  const handleUpdate = async (event: React.FormEvent<HTMLElement>) => {
    try {
      dispatch({ type: actionType.startFetching })
      toastMessage({ message: 'Loading', type: 'loading' })
      event.preventDefault()
      const data = formEntries({ targetReference: event.target, formReference: 'deviceForm' })
      const { message } = await update({ path: 'device', id: deviceId, data })
      toastMessage({ message, type: 'success' })
      dispatch({ type: actionType.finishFetching })
      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (error) {
      console.log(error)
      toastMessage({ message: error, type: 'error' })
    }
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
    loadFetching,
    handleChange,
    handleSave,
    handleUpdate,
    handleClose
  }
}
