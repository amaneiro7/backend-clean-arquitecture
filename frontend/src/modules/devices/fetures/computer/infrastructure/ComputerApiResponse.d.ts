export interface ComputerAPIResponse {
  id: string
  categoryId: number
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
  CategoryId: number
  device_id: string
  HardDriveCapacityId: number
  HardDriveTypeId: number
  ProcessorId: string
  OperatingSystemVersionId: number
  OperatingSystemArqId: number
  device: Device
  processor: Processor
  category: Category
  hardDriveCapacity: HardDriveCapacity
  hardDriveType: HardDriveType
  operatingSystem: OperatingSystem
  operatingSystemArq: OperatingSystemArq
}

export interface Device {
  id: string
  activo: string
  serial: string
  statusId: number
  modelId: string
  createdAt: Date
  updatedAt: Date
  ModelId: string
  StatusId: number
  status: HardDriveType
  model: Model
}

export interface Model {
  id: string
  name: string
  categoryId: number
  brandId: string
  createdAt: Date
  updatedAt: Date
  CategoryId: number
  BrandId: string
  brand: Brand
}

export interface Brand {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface HardDriveType {
  id: number
  name: string
}
export interface Category {
  id: number
  name: string
}
export interface OperatingSystemArq {
  id: number
  name: string
}

export interface HardDriveCapacity {
  id: number
  value: number
}

export interface OperatingSystem {
  id: number
  version: string
}

export interface Processor {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}
