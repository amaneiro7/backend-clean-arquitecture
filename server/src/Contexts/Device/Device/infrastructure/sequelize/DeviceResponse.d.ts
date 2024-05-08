import { type BrandId } from '../../../../Brand/domain/BrandId'
import { type CategoryId } from '../../../../Category/domain/CategoryId'
import { type ComputerHardDriveCapacity } from '../../../../Features/Computer/domain/ComputerHardDriveCapacity'
import { type ComputerHardDriveType } from '../../../../Features/Computer/domain/ComputerHardDriveType'
import { type ComputerMemoryRamCapacity } from '../../../../Features/Computer/domain/ComputerMemoryRamCapacity'
import { type ComputerName } from '../../../../Features/Computer/domain/ComputerName'
import { type ComputerOperatingSystem } from '../../../../Features/Computer/domain/ComputerOperatingSystem'
import { type ComputerOperatingSystemArq } from '../../../../Features/Computer/domain/ComputerOperatingSystemArq'
import { type ComputerProcessor } from '../../../../Features/Computer/domain/ComputerProcessor'
import { type IPAddress } from '../../../../Features/Computer/domain/IPAddress'
import { type MACAddress } from '../../../../Features/Computer/domain/MACAddress'
import { type HardDriveCapacityPrimitives } from '../../../../Features/HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacity'
import { type HardDriveTypePrimitives } from '../../../../Features/HardDrive.ts/HardDriveType/domain/HardDriveType'
import { MemoryRamTypePrimitives } from '../../../../Features/MemoryRam/MemoryRamType/domain/MemoryRamType'
import { type OperatingSystemPrimitives } from '../../../../Features/OperatingSystem/OperatingSystem/domain/OperatingSystem'
import { type OperatingSystemArqPrimitives } from '../../../../Features/OperatingSystem/OperatingSystemArq/domain/OperatingSystemArq'
import { type ProcessorPrimitives } from '../../../../Features/Processor/Processor/domain/Processor'
import { LocationPrimitives } from '../../../../Location/Location/domain/Location'
import { ComputerModelsPrimitives } from '../../../../ModelSeries/ModelCharacteristics/Computers/Computer/domain/ComputerModels'
import { LaptopsModelsPrimitives } from '../../../../ModelSeries/ModelCharacteristics/Computers/Laptops/domain/LaptopsModels'
import { type ModelSeriesId } from '../../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type StatusPrimitives } from '../../../Status/domain/Status'

import { type DeviceActivo } from '../../domain/DeviceActivo'
import { type DeviceEmployee } from '../../domain/DeviceEmployee'
import { type DeviceId } from '../../domain/DeviceId'
import { type DeviceLocation } from '../../domain/DeviceLocation'

import { type DeviceObservation } from '../../domain/DeviceObservation'
import { type DeviceSerial } from '../../domain/DeviceSerial'
import { type DeviceStatus } from '../../domain/DeviceStatus'

export interface DevicesApiResponse {
  id: Primitives<DeviceId>
  serial: Primitives<DeviceSerial>
  activo: Primitives<DeviceActivo>
  statusId: Primitives<DeviceStatus>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  modelId: Primitives<ModelSeriesId>
  employeeId: Primitives<DeviceEmployee>
  locationId: Primitives<DeviceLocation>
  observation: Primitives<DeviceObservation>
  location: LocationPrimitives
  createdAt: Date
  updatedAt: Date
  model: ModelApiresponse
  status: StatusPrimitives
  computer: Computer | null
  hardDrive: HardDrive | null
}

export interface Computer {
  id: Primitives<DeviceId>
  categoryId: Primitives<CategoryId>
  deviceId: Primitives<DeviceId>
  computerName: Primitives<ComputerName>
  processorId: Primitives<ComputerProcessor>
  memoryRamCapacity: Primitives<ComputerMemoryRamCapacity>
  hardDriveCapacityId: Primitives<ComputerHardDriveCapacity>
  hardDriveTypeId: Primitives<ComputerHardDriveType>
  operatingSystemId: Primitives<ComputerOperatingSystem>
  operatingSystemArqId: Primitives<ComputerOperatingSystemArq>
  macAddress: Primitives<MACAddress>
  ipAddress: Primitives<IPAddress>
  createdAt: Date
  updatedAt: Date
  processor: ProcessorPrimitives
  hardDriveCapacity: HardDriveCapacityPrimitives
  hardDriveType: HardDriveTypePrimitives
  operatingSystem: OperatingSystemPrimitives
  operatingSystemArq: OperatingSystemArqPrimitives
}

export interface ModelApiresponse {
  id: string
  name: string
  categoryId: number
  brandId: string
  createdAt: Date
  updatedAt: Date  
  category: Status
  brand: Brand
  modelComputer: ModelComputer
  modelLaptop: ModelLaptop
}

export interface ModelComputer extends ComputerModelsPrimitives {
  memoryRamType: MemoryRamTypePrimitives
}
export interface ModelLaptop extends LaptopsModelsPrimitives {
  memoryRamType: MemoryRamTypePrimitives
}
