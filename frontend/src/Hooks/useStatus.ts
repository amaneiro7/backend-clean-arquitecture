import { useEffect, useState } from 'react'
import { getAll } from '../services/api'
import { type MappedStatus, type Status } from '../types/types'

export const useStatus = () => {
  const [status, setStatus] = useState<MappedStatus[]>([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getAll({ path: 'status' })
      .then((data: Status[]) => {
        const mappedData = data.map(data => {
          return {
            id: data,
            name: data
          }
        })
        // console.log('data =', data, 'mappedData = ', mappedData)

        setStatus(mappedData)
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
