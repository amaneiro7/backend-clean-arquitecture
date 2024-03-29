import { useEffect, useState } from 'react'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { AllDeviceGetter } from '../../../modules/devices/devices/devices/application/AllDeviceGetter'
import { type Repository } from '../../../modules/shared/domain/repository'
import { DeviceCreator, type DeviceProps } from '../../../modules/devices/devices/devices/application/DeviceCreator'
import { DeviceGetter } from '../../../modules/devices/devices/devices/application/DeviceGetter'
import { type Query } from '../../../modules/shared/domain/criteria/Criteria'
import { DeviceGetterByCriteria } from '../../../modules/devices/devices/devices/application/DeviceGetterByCriteria'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type FilterField } from '../../../modules/shared/domain/criteria/FilterField'
import { type FilterOperator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type FilterValue } from '../../../modules/shared/domain/criteria/FilterValue'
import { type OrderBy } from '../../../modules/shared/domain/criteria/OrderBy'
import { type OrderType } from '../../../modules/shared/domain/criteria/OrderType'
import { type Limit } from '../../../modules/shared/domain/criteria/Limit'
import { type Offset } from '../../../modules/shared/domain/criteria/Offset'

export interface UseDevice {
  devices: DevicePrimitives[]
  loading: boolean
  error: string | null
  getDevice: DeviceGetter
  createDevice: (formData: DeviceProps) => Promise<void>
  handleHasUrlSearch: () => void
  handleQuery: (queryParams: QueryParams) => void
}

interface QueryParams {
  field?: Primitives<FilterField>
  operator?: Primitives<FilterOperator>
  value?: Primitives<FilterValue>
  orderBy?: Primitives<OrderBy>
  OrderType?: Primitives<OrderType>
  limit?: Primitives<Limit>
  offset?: Primitives<Offset>
}

export const useDevice = (repository: Repository) => {
  const allDeviceGetter = new AllDeviceGetter(repository)
  const deviceByCriteria = new DeviceGetterByCriteria(repository)
  const [query, setQuery] = useState<QueryParams>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState<DevicePrimitives[]>([])
  const [hasUrlSearch, setHasUrlSearch] = useState(false)

  async function createDevice (formData: DeviceProps) {
    const deviceCreator = new DeviceCreator(repository)
    await deviceCreator.create(formData)
    getDevices()
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

  useEffect(() => {
    searchDevices()
  }, [query])

  const handleHasUrlSearch = () => {
    setHasUrlSearch(prev => !prev)
  }

  const handleQuery = (queryParams: Query) => {
    setQuery(prev => ({
      ...prev,
      ...queryParams
    }))
  }

  return {
    devices,
    loading,
    error,
    getDevice,
    createDevice,
    handleHasUrlSearch,
    handleQuery
  }
}
