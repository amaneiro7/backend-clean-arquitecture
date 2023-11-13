import { useEffect, useState } from 'react'
import { type Device } from '../types/types'
import { fetchDevice } from '../utils/fetchDeivce'

interface Props {
  deviceId: string
}

interface Success {
  device: Device
  error: false
}

interface Error {
  device: null
  error: true
}

type UseDeviceIdResult = Success | Error

export const useDeviceId = ({ deviceId }: Props): UseDeviceIdResult => {
  const [device, setDevice] = useState<Device | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchDevice({ deviceId })
      .then(devices => {
        if (devices != null) {
          setDevice(devices)
        }
        setError(false)
      })
      .catch(err => {
        setError(true)
        console.error('useDevive', err)
      })

    return () => {
      setDevice(null)
    }
  }, [deviceId])

  return {
    device,
    error
  }
}
