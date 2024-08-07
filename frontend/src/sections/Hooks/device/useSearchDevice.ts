import { useCallback, useState } from 'react'
import { DeviceGetterByCriteria } from '../../../modules/devices/devices/devices/application/DeviceGetterByCriteria'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { ApiDeviceRepository } from '../../../modules/devices/devices/devices/infraestructure/ApiDeviceRepository'
import { DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'

export interface UseDevice {
  devices: DevicePrimitives[]
  loading: boolean
  error: string | null
  searchDevices: (filter: SearchByCriteriaQuery) => void
}

export const useSearchDevice = (): UseDevice => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicesMappedApiResponse[]>([])

  const searchDevices = useCallback((filter: SearchByCriteriaQuery) => {
    setLoading(true)
    new DeviceGetterByCriteria(new ApiDeviceRepository())
      .get(filter)
      .then((devices) => {
        setDevices(devices as DevicesMappedApiResponse[])
        setLoading(false)
      })
      .catch((error) => {
        console.error('searchDevices', error)

        setError(error)
        setLoading(false)
      })
  }, [])

  return {
    devices,
    loading,
    error,
    searchDevices
  }
}
