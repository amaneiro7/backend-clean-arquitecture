import { useEffect, useState } from 'react'
import { type Repository } from '../../../modules/shared/domain/repository'

import { type StatusPrimitives } from '../../../modules/devices/devices/status/domain/Status'
import { AllStatusGetter } from '../../../modules/devices/devices/status/application/AllStatusGetter'

export const useStatus = (repository: Repository) => {
  const allStatusGetter = new AllStatusGetter(repository)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState<StatusPrimitives[]>([])

  function getStatus () {
    setLoading(true)
    allStatusGetter
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
