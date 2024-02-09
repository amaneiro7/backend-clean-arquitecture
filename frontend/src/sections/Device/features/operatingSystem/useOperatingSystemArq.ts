import { useEffect, useState } from 'react'
import { type Repository } from '../../../../modules/shared/domain/repository'
import { AllOperatingSystemArqGetter } from '../../../../modules/devices/fetures/operatingSystem/operatingSystemArq/application/AllOperatingSystemArqGetter'
import { type OperatingSystemArqPrimitives } from '../../../../modules/devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArq'

export const useOperatingSystemArq = (repository: Repository) => {
  const dataGetter = new AllOperatingSystemArqGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<OperatingSystemArqPrimitives[]>([])

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
    operatingSystemArq: data,
    loading,
    error
  }
}
