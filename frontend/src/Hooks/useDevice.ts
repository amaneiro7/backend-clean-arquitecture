import { useEffect, useState } from 'react'
import { type Device } from '../types/types'
import { fetchDevices } from '../utils/fetchDevices'

export const useDevice = (): {
  device: Device[]
} => {
  const [device, setDevice] = useState<Device[]>([])

  useEffect(() => {
    fetchDevices()
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
