import { useEffect, useState } from 'react'
import { type Repository } from '../../../../modules/shared/domain/repository'
import { AllHardDriveCapacityGetter } from '../../../../modules/devices/fetures/hardDrive/hardDriveCapacity/application/AllHardDriveCapacityGetter'
import { type HardDriveCapacityPrimitives } from '../../../../modules/devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacity'

export const useHardDriveCapacity = (repository: Repository) => {
  const dataGetter = new AllHardDriveCapacityGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<HardDriveCapacityPrimitives[]>([])

  function fetchData () {
    setLoading(true)
    dataGetter
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
