import { API_URL } from './config'

interface RequestParams {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  endpoint: string
  data?: object
}
export async function makeRequest<T>({
  method,
  endpoint,
  data
}: RequestParams): Promise<T> {
  const apiURL = new URL(`${API_URL}${endpoint}`)
  const requestInit: RequestInit = {
    method,
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  }

  if (data) {
    requestInit.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(apiURL, requestInit)
    if (!response.ok) {
      throw new Error(await response.text())
    }
    const responseData = await response.json()
    if (responseData === null) {
      throw new Error('makeRequest: No se ha podido obtener la respuesta')
    }
    return responseData as T
  } catch (error) {
    if (error instanceof Error && error.message !== 'Unauthorized') {
      console.error('makeRequest', error)
    } else {
      throw new Error('makeRequest: No se ha podido realizar la petición')
    }
    throw error
  }

  // return fetch(apiURL, requestInit)
  //   .then(async response => {
  //     if (!response.ok) {
  //       throw new Error(await response.text())
  //     }
  //     const data = await response.json()
  //     if (data === null) {
  //       throw new Error('makeRequest: No se ha podido obtener la respuesta')
  //     }
  //     return data as T
  //   })
  //   .catch(error => {
  //     if (error instanceof Error) {
  //       if (error.message !== 'Unauthorized') {
  //         console.error('makeRequest', error)
  //       }
  //     } else {
  //       throw new Error('makeRequest: No se ha podido realizar la petición')
  //     }
  //     throw error
  //   })
}
