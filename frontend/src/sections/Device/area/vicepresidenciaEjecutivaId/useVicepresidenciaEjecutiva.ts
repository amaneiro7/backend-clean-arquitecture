import { useEffect, useState } from 'react'
import { type Repository } from '../../../../modules/shared/domain/repository'
import { type VicepresidenciaEjecutivaPrimitives } from '../../../../modules/employee/area/vicepresidenciaejecutiva/domain/VicepresidenciaEjecutiva'
import { AllVicepresidenciaEjecutivaGetter } from '../../../../modules/employee/area/vicepresidenciaejecutiva/application/AllVicepresidenciaEjecutivaGetter'

export interface UseVicepresidenciaEjecutiva {
  vicepresidenciaEjecutiva: VicepresidenciaEjecutivaPrimitives[]
  loading: boolean
  error: string | null
}
export const useVicepresidenciaEjecutiva = (repository: Repository) => {
  const dataGetter = new AllVicepresidenciaEjecutivaGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState<VicepresidenciaEjecutivaPrimitives[]>([])

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
    vicepresidenciaEjecutiva: data,
    loading,
    error
  }
}
