import { useEffect, useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'
import { AllCargoGetter } from '../../../modules/employee/cargo/application/AllCargoGetter'
import { type CargoPrimitives } from '../../../modules/employee/cargo/domain/cargo'

export interface UseCargo {
  cargo: CargoPrimitives[]
  loading: boolean
  error: string | null
}
export const useCargo = (repository: Repository) => {
  const dataGetter = new AllCargoGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<CargoPrimitives[]>([])

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
    cargo: data,
    loading,
    error
  }
}
