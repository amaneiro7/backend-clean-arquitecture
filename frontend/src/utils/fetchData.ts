import { API_URL } from './config'
import { type UrlPaths } from '../types/const'

export const fetchDatas = async ({ path }: { path: typeof UrlPaths[keyof typeof UrlPaths] }) => {
  const apiUrl = `${API_URL}/${path}`
  const res = await fetch(apiUrl)
  if (!res.ok) {
    console.error('Error fetching data')
    return []
  }

  const { body: data } = await res.json()
  return data
}
