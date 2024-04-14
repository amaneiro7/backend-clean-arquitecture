import { useEffect, useState } from 'react'
import { type Repository } from '../../../../modules/shared/domain/repository'
import { type VicepresidenciaPrimitives } from '../../../../modules/employee/area/vicepresidencia/domain/Vicepresidencia'
import { AllVicepresidenciaGetter } from '../../../../modules/employee/area/vicepresidencia/application/AllVicepresidenciaGetter'

export interface UseVicepresidencia {
  vicepresidencia: VicepresidenciaPrimitives[]
  loading: boolean
  error: string | null
}
export const useVicepresidencia = (repository: Repository) => {
  const dataGetter = new AllVicepresidenciaGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<VicepresidenciaPrimitives[]>([])

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
    vicepresidencia: data,
    loading,
    error
  }
}
