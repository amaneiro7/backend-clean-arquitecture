import { useCallback, useEffect, useMemo, useState } from 'react'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { DeviceCreator } from '../../../modules/devices/devices/devices/application/DeviceCreator'
import { DeviceGetter } from '../../../modules/devices/devices/devices/application/DeviceGetter'
import { DeviceGetterByCriteria } from '../../../modules/devices/devices/devices/application/DeviceGetterByCriteria'
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
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery(defaultQuery)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicePrimitives[]>([])

  const repository = useMemo(() => { return new ApiDeviceRepository() }, [])
  const getDevice = useMemo(() => { return new DeviceGetter(repository) }, [repository])

  const searchDevices = useCallback((filter: SearchByCriteriaQuery) => {
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
  }, [repository])

  const createDevice = useCallback(async (formData: DevicePrimitives) => {
    const data = await new DeviceCreator(repository).create(formData)
    searchDevices(query)
    return data
  }, [query, repository, searchDevices])

  useEffect(() => {
    searchDevices(query)
    return () => {
      setDevices([])
    }
  }, [query, searchDevices])

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
