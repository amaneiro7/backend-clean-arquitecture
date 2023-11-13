import { useEffect, useState } from 'react'
import { fetchStatus } from '../utils/fetchStatus'

export const useStatus = () => {
  const [status, setStatus] = useState<[]>([])

  useEffect(() => {
    fetchStatus()
      .then(status => { setStatus(status) })
      .catch(err => { console.error('useStatus', err) })

    return () => {
      setStatus([])
    }
  }, [])

  return {
    status
  }
}
