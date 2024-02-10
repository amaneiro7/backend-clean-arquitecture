import { useEffect, useState } from 'react'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { AllDeviceGetter } from '../../../modules/devices/devices/devices/application/AllDeviceGetter'
import { type Repository } from '../../../modules/shared/domain/repository'
import { type CreateDeviceProps, DeviceCreator } from '../../../modules/devices/devices/devices/application/DeviceCreator'
import { Uuid } from '../../../modules/shared/domain/value-object/Uuid'
import { DeviceGetter } from '../../../modules/devices/devices/devices/application/DeviceGetter'

export const useDevice = (repository: Repository) => {
  const allDeviceGetter = new AllDeviceGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicePrimitives[]>([])
  const [hasUrlSearch, setHasUrlSearch] = useState(false)

  async function createDevice (formData: CreateDeviceProps) {
    const deviceCreator = new DeviceCreator(repository)
    const id = Uuid.random().value
    await deviceCreator.create(formData)
    // getDevices()
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

    return () => {
      setDevices([])
    }
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
