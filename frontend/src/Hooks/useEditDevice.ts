/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useMemo, useReducer } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { type Brand, Device } from '../types/types'
import { useCategories } from './useCategories'
import { useBrands } from './useBrand'
import { useModels } from './useModels'
import { update } from '../services/api'

const initialState = {
  device: [],
  loading: true
}

const reducer = (state, action) => {
  if (action.type === 'INIT_DEVICES') {
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
      device: deviceMapper
    }
  }
  if (action.payload === 'INIT_STATE') {
    return {
      ...state,
      device: []
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

export const useEditDevice = () => {
  const { deviceId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [{ device, loading }, dispatch] = useReducer(reducer, initialState)
  const { categories } = useCategories()
  const { brands } = useBrands()
  const { models } = useModels()

  useEffect(() => {
    if (location.state?.devices) {
      const { device } = location.state
      dispatch({ type: 'INIT_DEVICES', payload: { device } })
    } else {
      import('../services/api').then(async module => await module.getOne({ path: 'device', id: deviceId }))
        .then(device => {
          dispatch({ type: 'INIT_DEVICES', payload: { device } })
        })
        .catch(err => { console.error(err) })
    }

    return () => {
      dispatch({ type: 'INIT_STATE' })
    }
  }, [deviceId, location.state.devices])

  const filterdBrands = useMemo(() => {
    if (device?.categoryId) {
      const ids = {}
      return models
        .filter(brand => brand?.category?.id === device?.categoryId)
        .map(elem => elem.brand)
        .filter(brand => ids[brand.id] ? false : ids[brand.id] = true)
    }
    return brands
  }, [device?.categoryId])

  const filterdModels = useMemo(() => {
    if (device.id) {
      return (
        models.filter(model => model.brand.id === device.brandId && model.category.id === device.categoryId)
      )
    }
  }, [device?.brandId])

  const handleChange = (event) => {
    const { name, value } = event.target
    dispatch({ type: 'CHANGE_VALUE', payload: { name, value } })
  }

  const handleSubmit = async (event) => {
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

  function isValidEntry (entryKey) {
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
    filterdBrands,
    filterdModels,
    loading,
    handleChange,
    handleSubmit,
    handleClose
  }
}
