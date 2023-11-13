import { type Device } from '../types/types'
import { API_URL } from './config'

interface Props {
  deviceId: string
}
export const fetchDevice = async ({ deviceId }: Props): Promise<Device | undefined> => {
  const apiUrl = `${API_URL}/device/${deviceId}`
  const res = await fetch(apiUrl)
  if (!res.ok) {
    console.error('Error fetching devices')
    return
  }

  const { body: device } = await res.json() as { body: Device }
  return device
}
