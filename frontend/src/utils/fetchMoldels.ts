import { type Model } from '../types/types'
import { API_URL } from './config'

export const fetchModels = async (): Promise<Model[]> => {
  const apiUrl = `${API_URL}/models`
  const res = await fetch(apiUrl)
  if (!res.ok) {
    console.error('Error fetching Models')
    return []
  }

  const { body: models } = await res.json() as { body: Model[] }
  return models
}
