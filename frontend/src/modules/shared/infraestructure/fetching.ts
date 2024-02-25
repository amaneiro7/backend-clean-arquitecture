import { API_URL } from './config'

interface RequestParams {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  endpoint: string
  data?: object
}
export async function makeRequest<T> ({
  method,
  endpoint,
  data
}: RequestParams): Promise<T> {
  const url = new URL(window.location.href)
  const searchParams = url.searchParams
  const apiURL = new URL(`${API_URL}${endpoint}`)
  apiURL.search = searchParams.toString()

  const requestInit: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }

  if (data !== undefined) {
    requestInit.body = JSON.stringify(data)
  }

  return await fetch(apiURL, requestInit).then(async res => {
    if (!res.ok) {
      throw new Error(await res.text())
    }
    return await (res.json() as Promise<T>)
  }).catch((error: any) => {
    throw new Error(error.message)
  })
}