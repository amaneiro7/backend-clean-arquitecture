import { useEffect, useState } from 'react'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { DeviceCreator } from '../../../modules/devices/devices/devices/application/DeviceCreator'
import { DeviceGetter } from '../../../modules/devices/devices/devices/application/DeviceGetter'
import { DeviceGetterByCriteria } from '../../../modules/devices/devices/devices/application/DeviceGetterByCriteria'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { useSearchByCriteriaQuery } from '../useQueryUpdate'
import { ApiDeviceRepository } from '../../../modules/devices/devices/devices/infraestructure/ApiDeviceRepository'

export interface UseDevice {
  devices: DevicePrimitives[]
  loading: boolean
  error: string | null
  getDevice: DeviceGetter
  query: SearchByCriteriaQuery
  createDevice: (formData: DevicePrimitives) => Promise<void>
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: (payload?: SearchByCriteriaQuery) => void
  searchDevices: (filter: SearchByCriteriaQuery) => void
}

export const useDevice = (defaultQuery?: SearchByCriteriaQuery): UseDevice => {
  const repository = new ApiDeviceRepository()
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery(defaultQuery)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicePrimitives[]>([])

  async function createDevice(formData: DevicePrimitives) {
    const data = await new DeviceCreator(repository).create(formData)
    searchDevices(query)
    return data
  }

  function searchDevices(filter: SearchByCriteriaQuery) {
    setLoading(true)
    new DeviceGetterByCriteria(repository)
      .get(filter)
      .then((devices) => {
        setDevices(devices)
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchDevices', error)

        setError(error)
        setLoading(false)
      })
  }

  const getDevice = new DeviceGetter(repository)

  useEffect(() => {
    searchDevices(query)
    return () => {
      setDevices([])
    }
  }, [query])

  return {
    devices,
    loading,
    error,
    getDevice,
    query,
    createDevice,
    addFilter,
    cleanFilters,
    searchDevices
  }
}
