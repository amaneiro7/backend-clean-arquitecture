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
export interface MappedDevice {
  id: string
  activo: string
  serial: string
  status: Status
  modelId: string
  modelName: string
  categoryId: string
  categoryName: string
  brandId: string
  brandName: string
}
// export interface MappedDevice {
//   id: string
//   activo: string
//   serial: string
//   status: Status
//   modelId: Pick<Model, 'id'>
//   modelName: Pick<Model, 'name'>
//   categoryId: Pick<Category, 'id'>
//   categoryName: Pick<Category, 'name'>
//   brandId: Pick<Brand, 'id'>
//   brandName: Pick<Brand, 'name'>
// }

export interface Model {
  id: string
  name: string
  category: Category
  brand: Brand
}

export interface MappedModel {
  id: string
  name: string
}
export interface Brand {
  id: string
  name: string
}
export interface Category {
  id: string
  name: string
}

export interface Status {
  id: string
  name: 'Operativo' | 'Dañado'
}

export interface SaveDevice {
  id: string
  activo: string
  serial: string
  status: Status
  modelId: string
}
