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

export interface MappedModelWithjoins {
  id: string
  name: string
  categoryId: string
  categoryName: string
  brandId: string
  brandName: string
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

export type Status = 'Operativo' | 'Dañado' | ''
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

export type OnChangeInputs = ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined

export type Options = never[] | MappedStatus[] | Brand[] | Model[] | Category[]

export type InpustFormType = InpustFormSelect | InpustFormText
interface InpustFormSelect {
  type: 'select'
  options: Options
  name: string
  value: string
  label: string
  onChange: OnChangeInputs
  placeholder: string
}
interface InpustFormText {
  type: 'text'
  name: string
  value: string
  label: string
  onChange: OnChangeInputs
  placeholder: string
}

export interface DeviceFormProps {
  formType: 'device'
  categoryId: string
  categories: Category[]
  status: string
  activo: string
  serial: string
  brands: Brand[]
  brandId: string
  models: Model[]
  modelId: string
  statusOptions: MappedStatus[]
  onChange: OnChangeInputs
}
export interface BrandFormProps {
  formType: 'brand'
  brandName: string
  onChange: OnChangeInputs
}
export interface CategoryFormProps {
  formType: 'category'
  categoryName: string
  onChange: OnChangeInputs
}
export interface ModelFormProps {
  formType: 'model'
  modelName: string
  categoryId: string
  categories: Category[]
  brandId: string
  brands: Brand[]
  onChange: OnChangeInputs
}

export type InputTypeProps =
  | DeviceFormProps
  | BrandFormProps
  | CategoryFormProps
  | ModelFormProps

export type InputFormTypeReturn = InpustFormText | InpustFormSelect
interface InputTypeFormReturnText {
  type: string
  name: string
  label: string
  placeholder: string
  value: string
  onChange: OnChangeInputs
}
interface InputFormTypeReturnSelect {
  type: string
  name: string
  label: string
  placeholder: string
  options: Brand[] | Category[] | MappedStatus[] | MappedModel[]
  value: string
  onChange: OnChangeInputs
}

export type ClearDataset = {
  id: string
  Usuario: string
  "Ubicación": string
  "Dirección IP"?: string
  Serial: string
  Activo: string
  Estatus: string
  Categoria: string
  Marca: string
  Modelo: string
  "Nombre de Equipo"?: string
  Procesador?: string
  "Memoria Ram Total"?: number
  "Slot de Memoria Ram"?: string
  "Tipo de Memoria Ram"?: string
  "Disco Duro Total"?: string
  "Tipo de Disco Duro"?: string
  "Sistema Operativo"?: string
  "Arquitectura"?: string
  Observación: string
  "Fecha de Modificación": string
}
export type ClearModelDataset = {
  id: string
  Categoria: string
  Marca: string
  Modelo: string
  "Tipo de Memoria"?: string
  "Cantidad de Ranuras"?: number | string
  "Puerto VGA"?: string
  "Puerto HDMI"?: string
  "Puerto DVI"?: string
  "Adaptador Bluetooth"?: string
  "Adaptador Wifi"?: string
  "Modelo de Bateria"?: string
  "Tamaño de Pantalla"?: string
  "Modelo de Cartucho"?: string
  "Tipo de entrada"?: string
  "Lector de Huella"?: string
  "Fecha de Modificación": string
}
