import { useEffect, useState } from 'react'
import { type MappedDevice, type Device } from '../../types/types'
import { getAll } from '../services/api'

export const useDevice = (): {
  device: MappedDevice[]
} => {
  const [device, setDevice] = useState<Device[]>([])

  useEffect(() => {
    getAll({ path: 'device' })
      .then(devices => { setDevice(devices) })
      .catch(err => { console.error('useDevive', err) })

    return () => {
      setDevice([])
    }
  }, [])

  const mappedDevice = device.map(item => {
    return {
      id: item.id,
      activo: item.activo,
      serial: item.serial,
      status: item.status,
      modelId: item.model.id,
      modelName: item.model.name,
      categoryId: item.model.category.id,
      categoryName: item.model.category.name,
      brandId: item.model.brand.id,
      brandName: item.model.brand.name
    }
  })

  return {
    device: mappedDevice
  }
}
