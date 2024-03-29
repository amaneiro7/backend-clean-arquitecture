import { useEffect, useState } from 'react'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { AllDeviceGetter } from '../../../modules/devices/devices/devices/application/AllDeviceGetter'
import { type Repository } from '../../../modules/shared/domain/repository'
import { DeviceCreator, type DeviceProps } from '../../../modules/devices/devices/devices/application/DeviceCreator'
import { DeviceGetter } from '../../../modules/devices/devices/devices/application/DeviceGetter'
import { DeviceGetterByCriteria } from '../../../modules/devices/devices/devices/application/DeviceGetterByCriteria'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

export interface UseDevice {
  devices: DevicePrimitives[]
  loading: boolean
  error: string | null
  getDevice: DeviceGetter
  createDevice: (formData: DeviceProps) => Promise<void>
  handleHasUrlSearch: () => void
  handleQuery: (queryParams: SearchByCriteriaQuery) => void
}

export const useDevice = (repository: Repository) => {
  const allDeviceGetter = new AllDeviceGetter(repository)
  const deviceByCriteria = new DeviceGetterByCriteria(repository)
  const [query, setQuery] = useState<SearchByCriteriaQuery>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicePrimitives[]>([])
  const [hasUrlSearch, setHasUrlSearch] = useState(false)

  async function createDevice (formData: DeviceProps) {
    const deviceCreator = new DeviceCreator(repository)
    await deviceCreator.create(formData)
    getDevices()
  }

  function searchDevices () {
    setLoading(true)
    deviceByCriteria
      .get(query)
      .then((devices) => {
        setDevices(devices)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  function getDevices () {
    setLoading(true)
    allDeviceGetter
      .get()
      .then((devices) => {
        setDevices(devices)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  const getDevice = new DeviceGetter(repository)

  useEffect(() => {
    getDevices()
  }, [hasUrlSearch])

  useEffect(() => {
    searchDevices()
  }, [query])

  const handleHasUrlSearch = () => {
    setHasUrlSearch(prev => !prev)
  }

  const handleQuery = (queryParams: SearchByCriteriaQuery) => {
    setQuery(prev => ({
      ...prev,
      ...queryParams
    }))
  }

  console.log('Use Devices query', query)

  return {
    devices,
    loading,
    error,
    getDevice,
    createDevice,
    handleHasUrlSearch,
    handleQuery
  }
}
