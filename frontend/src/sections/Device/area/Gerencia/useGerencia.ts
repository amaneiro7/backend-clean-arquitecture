import { useEffect, useState } from 'react'
import { type Repository } from '../../../../modules/shared/domain/repository'
import { type GerenciaPrimitives } from '../../../../modules/employee/area/gerencia/domain/gerencia'
import { AllGerenciaGetter } from '../../../../modules/employee/area/gerencia/application/AllGerenciaGetter'

export interface UseGerencia {
  gerencia: GerenciaPrimitives[]
  loading: boolean
  error: string | null
}
export const useGerencia = (repository: Repository) => {
  const dataGetter = new AllGerenciaGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<GerenciaPrimitives[]>([])

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
    gerencia: data,
    loading,
    error
  }
}
