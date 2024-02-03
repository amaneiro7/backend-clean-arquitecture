import { useEffect, useState } from 'react'
import { type DevicePrimitives } from '../../modules/devices/devices/devices/domain/Device'
import { AllDeviceGetter } from '../../modules/devices/devices/devices/application/AllDeviceGetter'
import { type Repository } from '../../modules/shared/domain/repository'
import { DeviceCreator } from '../../modules/devices/devices/devices/application/DeviceCreator'
import { Uuid } from '../../modules/shared/domain/value-object/Uuid'

export const useDevice = (repository: Repository) => {
  console.log(repository)

  const allDeviceGetter = new AllDeviceGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicePrimitives[]>([])

  async function createDevice ({ serial, activo, statusId, modelId }: { serial: string, activo: string | null, statusId: number, modelId: string }) {
    const deviceCreator = new DeviceCreator(repository)
    const id = Uuid.random().value
    await deviceCreator.create({ id, serial, activo, statusId, modelId })
    getDevices()
  }

  function getDevices () {
    setLoading(true)
    allDeviceGetter
      .get()
      .then((devices) => {
        console.log('He sido llamado', devices)

        setDevices(devices)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

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
    createDevice
  }
}
