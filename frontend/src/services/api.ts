import { API_URL } from './config'
import { type UrlPaths } from '../types/const'

export const getAll = async ({ path }: { path: typeof UrlPaths[keyof typeof UrlPaths] }) => {
  const apiUrl = `${API_URL}/${path}`
  return await fetching({ URL: apiUrl })
}

export const getOne = async ({ path, id }: { path: typeof UrlPaths[keyof typeof UrlPaths], id: string | undefined }) => {
  if (id === undefined) {
    throw new Error('Id no valido')
  }
  const apiUrl = `${API_URL}/${path}/${id}`
  return await fetching({ URL: apiUrl })
}

export const create = async ({ path, data }: { path: typeof UrlPaths[keyof typeof UrlPaths], data: object }) => {
  const apiUrl = `${API_URL}/${path}`
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const { body, status } = await res.json()
  return {
    body,
    message: status === 201 ? 'Elemento creado exitosamente' : 'Ha ocurrido un error'
  }
}
export const update = async ({ path, id, data }: { path: typeof UrlPaths[keyof typeof UrlPaths], id: string | undefined, data: object }) => {
  if (id === undefined) {
    throw new Error('Id no valido')
  }
  const apiUrl = `${API_URL}/${path}/${id}`
  const res = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const { body, status } = await res.json()
  return {
    message: status === 201 ? 'Elemento actualizado exitosamente' : 'Ha ocurrido un error',
    body
  }
}

async function fetching ({ URL }: { URL: string }) {
  const res = await fetch(URL)
  if (res.ok) {
    const { body: data } = await res.json()
    return data
  } else {
    console.log('Respuesta de red OK pero respuesta HTTP no OK')
    return []
  }
}
