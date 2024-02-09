import { useEffect, useState } from 'react'
import { type Repository } from '../../../../modules/shared/domain/repository'
import { type HardDriveTypePrimitives } from '../../../../modules/devices/fetures/hardDrive/hardDriveType/domain/HardDriveType'
import { AllHardDriveTypeGetter } from '../../../../modules/devices/fetures/hardDrive/hardDriveType/application/AllHardDriveTypeGetter'

export const useHardDriveType = (repository: Repository) => {
  const dataGetter = new AllHardDriveTypeGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<HardDriveTypePrimitives[]>([])

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
    hardDriveType: data,
    loading,
    error
  }
}
