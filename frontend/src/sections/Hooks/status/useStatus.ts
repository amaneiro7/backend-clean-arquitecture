import { useEffect, useState } from 'react'
import { AllStatusGetter } from '../../../modules/devices/devices/status/application/AllStatusGetter'
import { ApiStateRepository } from '../../../modules/location/state/infraestructure/ApiStateRepository'
import { type StatusPrimitives } from '../../../modules/devices/devices/status/domain/Status'

export interface UseStatus {
  status: StatusPrimitives[]
  loading: boolean
  error: Error | null
}

export const useStatus = (): UseStatus => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState<StatusPrimitives[]>([])

  function getStatus() {
    setLoading(true)
    new AllStatusGetter(new ApiStateRepository())
      .get()
      .then((res) => {
        setStatus(res)
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
      setStatus([])
    }
  }, [])

  return {
    status,
    loading,
    error
  }
}
