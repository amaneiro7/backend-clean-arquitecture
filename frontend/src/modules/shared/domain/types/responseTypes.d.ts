import { type BrandId } from '../../../devices/brand/domain/BrandId'
import { type BrandName } from '../../../devices/brand/domain/BrandName'
import { type CategoryId } from '../../../devices/category/domain/CategoryId'
import { type CategoryName } from '../../../devices/category/domain/CategoryName'
import { type DeviceActivo } from '../../../devices/devices/devices/domain/DeviceActivo'
import { type DeviceId } from '../../../devices/devices/devices/domain/DeviceId'
import { type DeviceObservation } from '../../../devices/devices/devices/domain/DeviceObservation'
import { type DeviceSerial } from '../../../devices/devices/devices/domain/DeviceSerial'
import { type StatusId } from '../../../devices/devices/status/domain/StatusId'
import { type StatusName } from '../../../devices/devices/status/domain/StatusName'
import { type ModelId } from '../../../devices/model/domain/ModelId'
import { type ModelName } from '../../../devices/model/domain/ModelName'
import { type LocationId } from '../../../location/locations/domain/locationId'
import { type Primitives } from '../value-object/Primitives'

export interface DevicesApiResponse {
  id: Primitives<DeviceId>
  activo: Primitives<DeviceActivo>
  serial: Primitives<DeviceSerial>
  statusId: Primitives<StatusId>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  modelId: Primitives<ModelId>
  employeeId: string | null
  locationId: Primitives<LocationId>
  observation: Primitives<DeviceObservation>
  createdAt: Date
  updatedAt: Date
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
  id: Primitives<DeviceId>
  activo: Primitives<DeviceActivo>
  serial: Primitives<DeviceSerial>
  statusId: Primitives<StatusId>
  categoryId: Primitives<CategoryId>
  categoryName: Primitives<CategoryName>
  brandId: Primitives<BrandId>
  brandName: Primitives<BrandName>
  statusName: Primitives<StatusName>
  modelId: Primitives<ModelId>
  modelName: Primitives<ModelName>
  observation: Primitives<DeviceObservation>
  locationId: Primitives<LocationId>
  locationName: Primitives<>
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
  id: Primitives<ModelId>
  name: Primitives<ModelName>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  createdAt: Date
  updatedAt: Date
  CategoryId: Primitives<CategoryId>
  category: Category
  brand: Brand
}
export interface ModelMappedApiResponse {
  id: Primitives<ModelId>
  name: Primitives<ModelName>
  categoryId: Primitives<CategoryId>
  categoryName: Primitives<CategoryName>
  brandId: Primitives<BrandId>
  brandName: Primitives<BrandName>
  createdAt: Date
  updatedAt: Date
}

export interface Computer {
  id: string
  computerName: string
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
  id: Primitives<StatusId>
  name: Primitives<StatusName>
}
export interface Category {
  id: Primitives<CategoryId>
  name: Primitives<CategoryName>
}

export interface Location {
  id: Primitives<LocationId>
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
