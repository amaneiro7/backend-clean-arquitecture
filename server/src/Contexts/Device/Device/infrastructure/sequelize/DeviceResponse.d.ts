export interface DevicesApiResponse {
  id: string
  activo: null | string
  serial: string
  statusId: number
  modelId: string
  createdAt: Date
  updatedAt: Date
  ModelId: string
  StatusId: number
  model: ModelApiresponse
  status: Status
  computer: Computer | null
  hardDrive: HardDrive | null
}

export interface Computer {
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
  processor: Brand
  hardDriveCapacity: HardDriveCapacity
  hardDriveType: Status
  operatingSystem: OperatingSystem
  operatingSystemArq: Status
}

export interface HardDriveCapacity {
  id: number
  value: number
}

export interface Status {
  id: number
  name: string
}

export interface OperatingSystem {
  id: number
  version: string
}

export interface Brand {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface HardDrive {
  id: string
  categoryId: number
  deviceId: string
  health: number
  hardDriveCapacityId: number
  hardDriveTypeId: number
  createdAt: Date
  updatedAt: Date
  CategoryId: number
  device_id: string
  HardDriveCapacityId: number
  HardDriveTypeId: number
  hardDriveCapacity: HardDriveCapacity
  hardDriveType: Status
}

export interface ModelApiresponse {
  id: string
  name: string
  categoryId: number
  brandId: string
  createdAt: Date
  updatedAt: Date
  CategoryId: number
  BrandId: string
  category: Status
  brand: Brand
}
