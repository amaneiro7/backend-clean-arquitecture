import { useEffect, useState } from 'react'
import { AllMemoryRamTypeGetter } from '../../../modules/devices/fetures/memoryRam/memoryRamType/application/AllMemoryRamTypeGetter'
import { type MemoryRamTypePrimitives } from '../../../modules/devices/fetures/memoryRam/memoryRamType/domain/MemoryRamType'
import { ApiMemoryRamTypeRepository } from '../../../modules/devices/fetures/memoryRam/memoryRamType/infrastructure/ApiMemoryRamTypeRepository'

export const useMemoryRamType = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<MemoryRamTypePrimitives[]>([])

  function fetchData() {
    setLoading(true)
    new AllMemoryRamTypeGetter(new ApiMemoryRamTypeRepository())
      .get()
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()

    return () => {
      setData([])
    }
  }, [])

  return {
    memoryRamTypes: data,
    loading,
    error
  }
}
