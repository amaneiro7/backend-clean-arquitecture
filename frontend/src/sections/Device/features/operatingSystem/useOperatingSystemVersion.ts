import { useEffect, useState } from 'react'
import { type Repository } from '../../../../modules/shared/domain/repository'
import { type OperatingSystemPrimitives } from '../../../../modules/devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystem'
import { AllOperatingSystemGetter } from '../../../../modules/devices/fetures/operatingSystem/operatingSystem/application/AllOperatingSystemGetter'

export const useOperatingSystemVersions = (repository: Repository) => {
  const dataGetter = new AllOperatingSystemGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<OperatingSystemPrimitives[]>([])

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
    operatingSystem: data,
    loading,
    error
  }
}
