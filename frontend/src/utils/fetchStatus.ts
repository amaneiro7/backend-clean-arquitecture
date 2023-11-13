import { API_URL } from './config'

export const fetchStatus = async (): Promise<[]> => {
  const apiUrl = `${API_URL}/status`
  const res = await fetch(apiUrl)
  if (!res.ok) {
    console.error('Error fetching devices')
    return []
  }

  const { body: status } = await res.json()
  return status
}
