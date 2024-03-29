import { useEffect, useState } from 'react'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { AllDeviceGetter } from '../../../modules/devices/devices/devices/application/AllDeviceGetter'
import { type Repository } from '../../../modules/shared/domain/repository'
import { DeviceCreator, type DeviceProps } from '../../../modules/devices/devices/devices/application/DeviceCreator'
import { DeviceGetter } from '../../../modules/devices/devices/devices/application/DeviceGetter'
import { type Query } from '../../../modules/shared/domain/criteria/Query'
import { DeviceGetterByCriteria } from '../../../modules/devices/devices/devices/application/DeviceGetterByCriteria'

export interface UseDevice {
  devices: DevicePrimitives[]
  loading: boolean
  error: string | null
  getDevice: DeviceGetter
  createDevice: (formData: DeviceProps) => Promise<void>
  handleHasUrlSearch: () => void
}

export const useDevice = (repository: Repository) => {
  const allDeviceGetter = new AllDeviceGetter(repository)
  const deviceByCriteria = new DeviceGetterByCriteria(repository)
  const [query, setQuery] = useState<Query>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicePrimitives[]>([])
  const [hasUrlSearch, setHasUrlSearch] = useState(false)

  async function createDevice (formData: DeviceProps) {
    const deviceCreator = new DeviceCreator(repository)
    await deviceCreator.create(formData)
    getDevices()
  }

  function searchDevices (query: Query) {
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

  const handleHasUrlSearch = () => {
    setHasUrlSearch(prev => !prev)
  }

  return {
    devices,
    loading,
    error,
    getDevice,
    createDevice,
    handleHasUrlSearch
  }
}
