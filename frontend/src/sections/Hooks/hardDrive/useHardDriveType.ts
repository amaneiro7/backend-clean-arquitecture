import { useEffect, useState } from 'react'
import { type HardDriveTypePrimitives } from '../../../modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveType'
import { AllHardDriveTypeGetter } from '../../../modules/devices/fetures/hardDrive/hardDriveType/application/AllHardDriveTypeGetter'
import { ApiHardDriveTypeRepository } from '../../../modules/devices/fetures/hardDrive/hardDriveType/infrastructure/ApiHardDriveTypeRepository'

export const useHardDriveType = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<HardDriveTypePrimitives[]>([])

  function fetchData() {
    setLoading(true)
    new AllHardDriveTypeGetter(new ApiHardDriveTypeRepository())
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
    hardDriveType: data,
    loading,
    error
  }
}
