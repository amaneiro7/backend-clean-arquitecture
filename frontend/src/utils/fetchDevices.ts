import { type Device } from '../types/types'
import { API_URL } from './config'

export const fetchDevices = async (): Promise<Device[]> => {
  const apiUrl = `${API_URL}/device`
  const res = await fetch(apiUrl)
  if (!res.ok) {
    console.error('Error fetching devices')
    return []
  }

  const { body: device } = await res.json() as { body: Device[] }
  return device
}
