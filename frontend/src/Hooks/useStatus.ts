import { useEffect, useState } from 'react'
import { fetchStatus } from '../utils/fetchStatus'
import { getAll } from '../services/api'

export interface ReturnType {
  id: Status
  name: Status
}

type Status = ['Operativo', 'Dañado']

export const useStatus = () => {
  const [status, setStatus] = useState<ReturnType[]>([])

  useEffect(() => {
    getAll({ path: 'status' })
      .then((data: Status[]) => {
        const res = data.map((elem): ReturnType => {
          return {
            id: elem,
            name: elem
          }
        })
        setStatus(res)
      })
      .catch(err => { console.error('useStatus', err) })

    return () => {
      setStatus([])
    }
  }, [])

  return {
    status
  }
}
