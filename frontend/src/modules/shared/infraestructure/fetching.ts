import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios'
import { API_URL } from './config'

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function makeRequest<T>(config: AxiosRequestConfig & {
  _retry?: boolean
}): Promise<T> {
  try {
    const response = await api(config)
    if (!response.data) {
      throw new Error('makeRequest: No se ha podido obtener la respuesta')
    }
    console.log('makeRequest', response)
    return response.data as T
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data || 'Error desconocido')
    } else if (error instanceof Error) {
      console.error('makeRequest', error)
      throw new Error('makeRequest: No se ha podido realizar la petición')
    } else {
      throw new Error('makeRequest: No se ha podido realizar la petición')
    }
  }
}