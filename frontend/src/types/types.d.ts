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

export type Status = 'Operativo' | 'Dañado'
export interface MappedStatus {
  id: Status
  name: Status
}

export interface SaveDevice {
  id: string
  activo: string
  serial: string
  status: Status
  modelId: string
}

export type OnChaneInputs = ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined

export type Options = never[] | MappedStatus[] | Brand[] | Model[] | Category[]

export type InpustFormType = InpustFormSelect | InpustFormText
interface InpustFormSelect {
  type: 'select'
  options: Options
  name: string
  value: string
  label: string
  onChange: any
  placeholder: string
}
interface InpustFormText {
  type: 'text'
  name: string
  value: string
  label: string
  onChange: (event: any) => void
  placeholder: string
}
