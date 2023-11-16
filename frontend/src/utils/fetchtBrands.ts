import { type Brand } from '../types/types'
import { API_URL } from './config'

export const fetchBrands = async (): Promise<Brand[]> => {
  const apiUrl = `${API_URL}/brands`
  const res = await fetch(apiUrl)
  if (!res.ok) {
    console.error('Error fetching brands')
    return []
  }

  const { body: brand } = await res.json() as { body: Brand[] }
  return brand
}
