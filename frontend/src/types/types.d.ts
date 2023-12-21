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
  brandId: string
  modelId: string
  status: string
  activo: string
  serial: string
  categories: Category[]
  brands: Brand[]
  models: Model[]
  statusOptions: MappedStatus[]
  onChange: OnChangeInputs
}
export interface BrandFormProps {
  formType: 'brand'
  brand: string
  onChange: OnChangeInputs
}
export interface CategoryFormProps {
  formType: 'category'
  category: string
  onChange: OnChangeInputs
}
export interface ModelFormProps {
  formType: 'model'
  model: string
  categories: Category[]
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
  options: Brand[] | Category [] | MappedStatus[] | MappedModel[]
  value: string
  onChange: OnChangeInputs
}
