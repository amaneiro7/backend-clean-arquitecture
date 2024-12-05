import { useCallback, useState } from 'react'
import { DeviceGetterByCriteria } from '../../../modules/devices/devices/devices/application/DeviceGetterByCriteria'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { ApiDeviceRepository } from '../../../modules/devices/devices/devices/infraestructure/ApiDeviceRepository'
import { DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'

export interface UseDevice {
  devices: DevicePrimitives[]
  total: number
  loading: boolean
  error: string | null
  searchDevices: (filter: SearchByCriteriaQuery) => void
  resetDevices: () => void
}

export const useSearchDevice = (): UseDevice => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicesMappedApiResponse[]>([])
  const [total, setTotal] = useState(0)

  const searchDevices = useCallback((filter: SearchByCriteriaQuery) => {
    setLoading(true)
    new DeviceGetterByCriteria(new ApiDeviceRepository())
      .get(filter)
      .then((devices) => {
        setDevices(devices.data as DevicesMappedApiResponse[])
        setTotal(devices.total)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        console.error('searchDevices', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const resetDevices = useCallback(() => {
    setDevices([])
  }, [])

  return {
    devices,
    total,
    loading,
    error,
    searchDevices,
    resetDevices
  }
}
