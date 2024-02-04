import { useEffect, useState } from 'react'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { AllDeviceGetter } from '../../../modules/devices/devices/devices/application/AllDeviceGetter'
import { type Repository } from '../../../modules/shared/domain/repository'
import { DeviceCreator } from '../../../modules/devices/devices/devices/application/DeviceCreator'
import { Uuid } from '../../../modules/shared/domain/value-object/Uuid'
import { DeviceGetter } from '../../../modules/devices/devices/devices/application/DeviceGetter'

export const useDevice = (repository: Repository) => {
  const allDeviceGetter = new AllDeviceGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicePrimitives[]>([])

  async function createDevice ({ serial, activo, statusId, modelId }: { serial: string, activo: string | null, statusId: number, modelId: string }) {
    const deviceCreator = new DeviceCreator(repository)
    const id = Uuid.random().value
    await deviceCreator.create({ id, serial, activo, statusId, modelId })
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
  }, [])

  return {
    devices,
    loading,
    error,
    getDevice,
    createDevice
  }
}
