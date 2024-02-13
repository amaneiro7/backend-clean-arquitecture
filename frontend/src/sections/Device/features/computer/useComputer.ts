import { useEffect, useState } from 'react'
import { type Repository } from '../../../../modules/shared/domain/repository'
import { AllComputerGetter } from '../../../../modules/devices/fetures/computer/application/AllComputerGetter'
import { type ComputerPrimitives } from '../../../../modules/devices/fetures/computer/domain/Computer'

export const useComputer = (repository: Repository) => {
  const dataGetter = new AllComputerGetter(repository)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ComputerPrimitives[]>([])
  const [error, setError] = useState(null)

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
    computer: data,
    loading,
    error
  }
}
