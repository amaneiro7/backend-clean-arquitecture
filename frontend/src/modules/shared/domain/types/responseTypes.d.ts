import { type CategoryId } from '../../../devices/category/domain/CategoryId'
import { type Primitives } from '../value-object/Primitives'

export interface DevicesApiResponse {
  id: string
  activo: null | string
  serial: string
  statusId: number
  categoryId: Primitives<CategoryId>
  brandId: string
  modelId: string
  employeeId: string | null
  locationId: number
  observation: string
  createdAt: Date
  updatedAt: Date
  ModelId: string
  StatusId: number
  model: ModelApiresponse
  category: Category
  brand: Brand
  location: Location
  employee: Employee | null
  status: Status
  computer: Computer | null
  hardDrive: HardDrive | null
}

export interface DevicesMappedApiResponse {
  id: string
  activo: string
  serial: string
  statusId: number
  categoryId: Primitives<CategoryId>
  categoryName: string
  brandId: string
  brandName: string
  statusName: string
  modelId: string
  modelName: string
  observation: string
  locationId: number
  locationName: string
  employeeId: string | null
  employeeName: string
  computer: Computer | null
  hardDrive: HardDrive | null
  createdAt: Date
  updatedAt: Date
}
export interface BrandApiResponse {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  model: ModelApiresponse[]
}

export interface ModelApiresponse {
  id: string
  name: string
  categoryId: Primitives<CategoryId>
  brandId: string
  createdAt: Date
  updatedAt: Date
  CategoryId: Primitives<CategoryId>
  BrandId: string
  category: Category
  brand: Brand
}
export interface ModelMappedApiResponse {
  id: string
  name: string
  categoryId: Primitives<CategoryId>
  categoryName: string
  brandId: string
  brandName: string
  createdAt: Date
  updatedAt: Date
}

export interface Computer {
  id: string
  categoryId: Primitives<CategoryId>
  deviceId: string
  processorId: string
  memoryRamCapacity: number
  hardDriveCapacityId: number
  hardDriveTypeId: number
  operatingSystemId: number
  operatingSystemArqId: number
  macAddress: string
  ipAddress: string
  createdAt: Date
  updatedAt: Date
  CategoryId: Primitives<CategoryId>
  device_id: string
  HardDriveCapacityId: number
  HardDriveTypeId: number
  ProcessorId: string
  OperatingSystemVersionId: number
  OperatingSystemArqId: number
  processor: ProcessorApiresponse
  hardDriveCapacity: HardDriveCapacity
  hardDriveType: HardDriveType
  operatingSystem: OperatingSystem
  operatingSystemArq: OperatingSystemArq
}

export interface HardDriveCapacity {
  id: number
  value: number
}
export interface HardDriveType {
  id: number
  name: string
}

export interface Status {
  id: number
  name: string
}
export interface Category {
  id: number
  name: string
}

export interface Location {
  id: number
  name: string
  siteId: number
  typeOfSiteId: number
  site: Site
  typeOfSite: TypeOfSite
}

export interface Site {
  id: number
  name: string
  address: string
  cityId: number
  city: City
}

export interface City {
  id: number
  name: string
  stateId: number
  state: State
}
export interface State {
  id: number
  name: string
  regionId: number
  region: Region
}

export interface Region {
  id: number
  name: string
}

export interface TypeOfSite {
  id: number
  name: string
}

export interface OperatingSystem {
  id: number
  version: string
}
export interface OperatingSystemArq {
  id: number
  name: string
}

export interface Brand {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}
export interface ProcessorApiresponse {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface HardDrive {
  id: string
  categoryId: Primitives<CategoryId>
  deviceId: string
  health: number
  hardDriveCapacityId: number
  hardDriveTypeId: number
  createdAt: Date
  updatedAt: Date
  CategoryId: Primitives<CategoryId>
  device_id: string
  HardDriveCapacityId: number
  HardDriveTypeId: number
  hardDriveCapacity: HardDriveCapacity
  hardDriveType: HardDriveType
}
