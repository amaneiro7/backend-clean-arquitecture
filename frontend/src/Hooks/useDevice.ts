import { useEffect, useState } from 'react'
import { type Device } from '../types/types'
import { fetchDevice } from '../utils/fetchDevice'

export const useDevice = (): {
  device: Device[]
} => {
  const [device, setDevice] = useState<Device[]>([])

  useEffect(() => {
    fetchDevice()
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
