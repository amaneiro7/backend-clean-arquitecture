import { useEffect, useState } from 'react'
import { AllHardDriveCapacityGetter } from '../../../modules/devices/fetures/hardDrive/hardDriveCapacity/application/AllHardDriveCapacityGetter'
import { ApiHardDriveCapacityRepository } from '../../../modules/devices/fetures/hardDrive/hardDriveCapacity/infrastructure/ApiHardDriveCapacityRepository'
import { type HardDriveCapacityPrimitives } from '../../../modules/devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacity'

export const useHardDriveCapacity = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<HardDriveCapacityPrimitives[]>([])

  function fetchData() {
    setLoading(true)
    new AllHardDriveCapacityGetter(new ApiHardDriveCapacityRepository())
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
    hardDriveCapacity: data,
    loading,
    error
  }
}
