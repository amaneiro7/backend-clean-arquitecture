import { useEffect, useState } from 'react'
import { AllStateGetter } from '../../../modules/location/state/application/AllStateGetter'
import { StatePrimitives } from '../../../modules/location/state/domain/state'
import { ApiStateRepository } from '../../../modules/location/state/infraestructure/ApiStateRepository'

export interface UseStates {
  state: StatePrimitives[]
  loading: boolean
  error: Error | null
}

export const useCountryStates = (): UseStates => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [state, setState] = useState<StatePrimitives[]>([])

  function getStatus() {
    setLoading(true)
    new AllStateGetter(new ApiStateRepository())
      .get()
      .then((res) => {
        setState(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getStatus()

    return () => {
      setState([])
    }
  }, [])

  return {
    state,
    loading,
    error
  }
}
