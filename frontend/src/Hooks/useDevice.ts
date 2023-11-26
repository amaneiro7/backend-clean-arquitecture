import { useEffect, useState } from 'react'
import { type Device } from '../types/types'
import { getAll } from '../services/api'

export const useDevice = (): {
  device: Device[]
} => {
  const [device, setDevice] = useState<Device[]>([])

  useEffect(() => {
    getAll({ path: 'device' })
      .then(devices => { setDevice(devices) })
      .catch(err => { console.error('useDevive', err) })

    return () => {
      setDevice([])
    }
  }, [])

  return {
    device
  }
}
