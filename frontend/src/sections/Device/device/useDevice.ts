import { useEffect, useState } from 'react'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
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
  handleQuery: (queryParams: SearchByCriteriaQuery) => void
}

export const useDevice = (repository: Repository) => {
  const deviceByCriteria = new DeviceGetterByCriteria(repository)
  const [query, setQuery] = useState<SearchByCriteriaQuery>({ filters: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicePrimitives[]>([])

  async function createDevice (formData: DeviceProps) {
    const deviceCreator = new DeviceCreator(repository)
    await deviceCreator.create(formData)
    searchDevices()
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
        console.error('searchDevices', error)

        setError(error)
        setLoading(false)
      })
  }

  const getDevice = new DeviceGetter(repository)

  useEffect(() => {
    searchDevices()
    return () => {
      setDevices([])
      setQuery({ filters: [] })
    }
  }, [query])

  const handleQuery = (queryParams: SearchByCriteriaQuery) => {
    const { filters } = queryParams
    const updateFilters = query
    if (filters !== undefined && filters.length > 0) {
      const findFilterIndex = query.filters.findIndex(({ field }) => field === filters[0].field)

      if (findFilterIndex === -1) {
        updateFilters.filters = [...query.filters, ...filters]
      } else {
        updateFilters.filters[findFilterIndex] = filters[0]
      }
    }

    const updatedQuery: SearchByCriteriaQuery = {
      filters: updateFilters.filters.filter((elem) => elem.value !== '')

    }

    setQuery(prev => {
      return {
        ...prev,
        ...updatedQuery
      }
    })
  }

  return {
    devices,
    loading,
    error,
    getDevice,
    createDevice,
    handleQuery
  }
}
