export interface SuccessResponse {
  error: true
  status: number
  body: Device[]
}

export interface Device {
  id: string
  activo: string
  serial: string
  status: Status
  model: Model
}

export interface Model {
  id: string
  name: string
  category: Category
  brand: Brand
}

export interface Brand {
  id: string
  name: string
}
export interface Category {
  id: string
  name: string
}

export type Status = 'Operativo' | 'Dañado'

export interface SaveDevice {
  id: string
  activo: string
  serial: string
  status: Status
  modelId: string
}
