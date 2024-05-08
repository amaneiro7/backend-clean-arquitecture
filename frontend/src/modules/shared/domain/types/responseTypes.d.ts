import { type BrandPrimitives } from '../../../devices/brand/domain/Brand'
import { type BrandId } from '../../../devices/brand/domain/BrandId'
import { type BrandName } from '../../../devices/brand/domain/BrandName'
import { type CategoryPrimitives } from '../../../devices/category/domain/Category'
import { type CategoryId } from '../../../devices/category/domain/CategoryId'
import { type CategoryName } from '../../../devices/category/domain/CategoryName'
import { type DevicePrimitives } from '../../../devices/devices/devices/domain/Device'
import { type DeviceActivo } from '../../../devices/devices/devices/domain/DeviceActivo'
import { type DeviceEmployee } from '../../../devices/devices/devices/domain/DeviceEmployee'
import { type DeviceId } from '../../../devices/devices/devices/domain/DeviceId'
import { type DeviceObservation } from '../../../devices/devices/devices/domain/DeviceObservation'
import { type DeviceSerial } from '../../../devices/devices/devices/domain/DeviceSerial'
import { type StatusPrimitives } from '../../../devices/devices/status/domain/Status'
import { type StatusId } from '../../../devices/devices/status/domain/StatusId'
import { type StatusName } from '../../../devices/devices/status/domain/StatusName'
import { type ComputerId } from '../../../devices/fetures/computer/domain/ComputerId'
import { type ComputerName } from '../../../devices/fetures/computer/domain/ComputerName'
import { type IPAddress } from '../../../devices/fetures/computer/domain/IPAddress'
import { type MACAddress } from '../../../devices/fetures/computer/domain/MACAddress'
import { type HardDriveHealth } from '../../../devices/fetures/hardDrive/hardDrive/domain/HardDriveHealth'
import { type HardDriveCapacityPrimitives } from '../../../devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacity'
import { type HardDriveCapacityId } from '../../../devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacityId'
import { type HardDriveTypePrimitives } from '../../../devices/fetures/hardDrive/hardDriveType/domain/HardDriveType'
import { type HardDriveTypeId } from '../../../devices/fetures/hardDrive/hardDriveType/domain/HardDriveTypeId'
import { type MemoryRamCapacity } from '../../../devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamCapacity'
import { type OperatingSystemPrimitives } from '../../../devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystem'
import { type OperatingSystemId } from '../../../devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystemId'
import { type OperatingSystemArqPrimitives } from '../../../devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArq'
import { type OperatingSystemArqId } from '../../../devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArqId'
import { type ProcessorPrimitives } from '../../../devices/fetures/processor/domain/Processor'
import { type ProcessorId } from '../../../devices/fetures/processor/domain/ProcessorId'
import { type ModelId } from '../../../devices/model/model/domain/ModelId'
import { type ModelName } from '../../../devices/model/model/domain/ModelName'
import { ModelComputerPrimitives } from '../../../devices/model/ModelCharacteristics/modelComputer/ModelComputer'
import { type EmployeePrimitives } from '../../../employee/employee/domain/Employee'
import { type EmployeeId } from '../../../employee/employee/domain/EmployeeId'
import { type EmployeeUserName } from '../../../employee/employee/domain/UserName'
import { CityPrimitives } from '../../../location/city/domain/city'
import { type LocationPrimitives } from '../../../location/locations/domain/location'
import { type LocationId } from '../../../location/locations/domain/locationId'
import { RegionPrimitives } from '../../../location/region/domain/region'
import { SitePrimitives } from '../../../location/site/domain/site'
import { StatePrimitives } from '../../../location/state/domain/state'
import { TypeOfSitePrimitives } from '../../../location/typeofsites/domain/typeOfSite'
import { type Primitives } from '../value-object/Primitives'

export interface DevicesApiResponse {
  id: Primitives<DeviceId>
  activo: Primitives<DeviceActivo>
  serial: Primitives<DeviceSerial>
  statusId: Primitives<StatusId>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  modelId: Primitives<ModelId>
  employeeId: Primitives<DeviceEmployee>
  locationId: Primitives<LocationId>
  observation: Primitives<DeviceObservation>
  createdAt: string
  updatedAt: string
  category: CategoryPrimitives
  brand: BrandPrimitives
  model: ModelApiresponse
  location: LocationPrimitives
  employee: EmployeePrimitives | null
  status: StatusPrimitives
  computer: Computer | null
  hardDrive: HardDrive | null
}

export interface EmployeesApiResponse {
  id: Primitives<EmployeeId>
  userName: Primitives<EmployeeUserName>
  devices: DevicesApiResponse[]
  createdAt: string
  updatedAt: string
}

export interface EmployeeMappedApiResponse {
  id: Primitives<EmployeeId>
  userName: Primitives<EmployeeUserName>
  createdAt: string
  updatedAt: string
  devices?: DevicePrimitives[]
}
export interface EmployeeDevicesMappedApiResponse {
  id: Primitives<EmployeeId>
  userName: Primitives<EmployeeUserName>
  createdAt: string
  updatedAt: string
  computers: DevicesApiResponse[]
  monitores: DevicesApiResponse[]
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
  locationName: string
  employeeId: Primitives<EmployeeId> | null
  employeeUserName: Primitives<EmployeeUserName>
  computer: Computer | null
  hardDrive: HardDrive | null
  createdAt: string
  updatedAt: string
}
export interface BrandApiResponse {
  id: Primitives<BrandId>
  name: Primitives<BrandName>
  createdAt: string
  updatedAt: string
  model: ModelApiresponse[]
}

export interface ModelApiresponse {
  id: Primitives<ModelId>
  name: Primitives<ModelName>
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  createdAt: string
  updatedAt: string
  category: CategoryPrimitives
  brand: BrandPrimitives
  modelPrinter: ModelPrinter
  modelMonitor: ModelMonitor
  modelComputer: ModelComputer
  modelLaptop: ModelLaptop
}

export interface ModelComputer extends ModelComputerPrimitives {
  memoryRamType: MemoryRamTypePrimitives
}
export interface ModelLaptop extends ModelLaptopPrimitives {
  memoryRamType: MemoryRamTypePrimitives
}
export interface ModelMappedApiResponse {
  id: Primitives<ModelId>
  name: Primitives<ModelName>
  categoryId: Primitives<CategoryId>
  categoryName: Primitives<CategoryName>
  brandId: Primitives<BrandId>
  brandName: Primitives<BrandName>
  createdAt: string
  updatedAt: string
}

export interface Computer {
  id: Primitives<ComputerId>
  computerName: Primitives<ComputerName>
  categoryId: Primitives<CategoryId>
  deviceId: Primitives<DeviceId>
  processorId: Primitives<ProcessorId>
  memoryRamCapacity: Primitives<MemoryRamCapacity>
  hardDriveCapacityId: Primitives<HardDriveCapacityId>
  hardDriveTypeId: Primitives<HardDriveTypeId>
  operatingSystemId: Primitives<OperatingSystemId>
  operatingSystemArqId: Primitives<OperatingSystemArqId>
  macAddress: Primitives<MACAddress>
  ipAddress: Primitives<IPAddress>
  createdAt: string
  updatedAt: string
  processor: ProcessorApiresponse
  hardDriveCapacity: HardDriveCapacityPrimitives
  hardDriveType: HardDriveTypePrimitives
  operatingSystem: OperatingSystemPrimitives
  operatingSystemArq: OperatingSystemArqPrimitives
}

export interface Brand {
  id: Primitives<BrandId>
  name: Primitives<BrandName>
  createdAt: string
  updatedAt: string
}
export interface ProcessorApiresponse extends ProcessorPrimitives {
  createdAt: string
  updatedAt: string
}

export interface LocationApiResponse extends LocationPrimitives {
  typeOfSite: TypeOfSitePrimitives
  site: SiteApiResponse
}

export interface SiteApiResponse extends SitePrimitives {
  city: CityApiResponse
}

export interface CityApiResponse  extends CityPrimitives {
  state: StateApiResponse
}

export interface StateApiResponse extends StatePrimitives {
  region: RegionPrimitives
}

export interface HardDrive {
  id: Primitives<HardDriveId>
  categoryId: Primitives<CategoryId>
  deviceId: Primitives<DeviceId>
  health: Primitives<HardDriveHealth>
  hardDriveCapacityId: Primitives<HardDriveCapacityId>
  hardDriveTypeId: Primitives<HardDriveTypeId>
  createdAt: string
  updatedAt: string
  hardDriveCapacity: HardDriveCapacityPrimitives
  hardDriveType: HardDriveTypePrimitives
}
