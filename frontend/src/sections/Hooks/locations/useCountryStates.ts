import { useEffect, useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'
import { AllStateGetter } from '../../../modules/location/state/application/AllStateGetter'
import { StatePrimitives } from '../../../modules/location/state/domain/state'

export interface UseStates {
  state: StatePrimitives[]
  loading: boolean
  error: Error | null
}

export const useCountryStates = (repository: Repository): UseStates => {
  const getter = new AllStateGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [state, setState] = useState<StatePrimitives[]>([])

  function getStatus () {
    setLoading(true)
    getter
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
