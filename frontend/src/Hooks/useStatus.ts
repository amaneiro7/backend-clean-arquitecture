import { useEffect, useState } from 'react'
import { getAll } from '../services/api'
import { type Status } from '../types/types'

export const useStatus = () => {
  const [status, setStatus] = useState<Status[]>([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getAll({ path: 'status' })
      .then(data => {
        setStatus(data)
      })
      .catch(err => {
        setError(err)
        console.error('useBrand', err)
      })

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
