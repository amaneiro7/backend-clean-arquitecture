import { useEffect, useState } from 'react'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type Repository } from '../../../modules/shared/domain/repository'
import { DeviceCreator } from '../../../modules/devices/devices/devices/application/DeviceCreator'
import { DeviceGetter } from '../../../modules/devices/devices/devices/application/DeviceGetter'
import { DeviceGetterByCriteria } from '../../../modules/devices/devices/devices/application/DeviceGetterByCriteria'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { useSearchByCriteriaQuery } from '../../Hooks/useQueryUpdate'

export interface UseDevice {
  devices: DevicePrimitives[]
  loading: boolean
  error: string | null
  getDevice: DeviceGetter
  createDevice: (formData: DevicePrimitives) => Promise<void>
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: (payload?: SearchByCriteriaQuery) => void
}

export const useDevice = (repository: Repository) => {
  const deviceByCriteria = new DeviceGetterByCriteria(repository)
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicePrimitives[]>([])

  async function createDevice (formData: DevicePrimitives) {
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
  }, [query])

  return {
    devices,
    loading,
    error,
    getDevice,
    createDevice,
    addFilter,
    cleanFilters
  }
}
