import { useEffect, useState } from 'react'
import { type CoordinacionPrimitives } from '../../../../modules/employee/area/coordinacion/domain/Coordinacion'
import { type Repository } from '../../../../modules/shared/domain/repository'
import { AllCoordinacionGetter } from '../../../../modules/employee/area/coordinacion/application/AllCoordinacionGetter'

export interface UseCoordinacion {
  coordinacion: CoordinacionPrimitives[]
  loading: boolean
  error: string | null
}
export const useCoordinacion = (repository: Repository) => {
  const dataGetter = new AllCoordinacionGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<CoordinacionPrimitives[]>([])

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
    coordinacion: data,
    loading,
    error
  }
}
