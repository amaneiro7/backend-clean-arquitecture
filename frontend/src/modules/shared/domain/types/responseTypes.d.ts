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
import { ComputerPrimitives } from '../../../devices/fetures/computer/domain/Computer'
import { type ComputerId } from '../../../devices/fetures/computer/domain/ComputerId'
import { type ComputerName } from '../../../devices/fetures/computer/domain/ComputerName'
import { type IPAddress } from '../../../devices/fetures/computer/domain/IPAddress'
import { type MACAddress } from '../../../devices/fetures/computer/domain/MACAddress'
import { HardDrivePrimitives } from '../../../devices/fetures/hardDrive/hardDrive/domain/HardDrive'
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
import { InputTypePrimitives } from '../../../devices/model/InputType/domain/InputType'
import { ModelPrimitives } from '../../../devices/model/model/domain/Model'
import { type ModelId } from '../../../devices/model/model/domain/ModelId'
import { type ModelName } from '../../../devices/model/model/domain/ModelName'
import { ModelComputerPrimitives } from '../../../devices/model/ModelCharacteristics/modelComputer/ModelComputer'
import { ModelKeyboardPrimitives } from '../../../devices/model/ModelCharacteristics/modelKeyboard/ModelKeyboard'
import { ModelLaptopPrimitives } from '../../../devices/model/ModelCharacteristics/modelLaptop/ModelLaptop'
import { ModelMonitorPrimitives } from '../../../devices/model/ModelCharacteristics/modelMonitor/ModelMonitor'
import { ModelPrinterPrimitives } from '../../../devices/model/ModelCharacteristics/modelPrinter/ModelPrinter'
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

export interface DevicesApiResponse extends DevicePrimitives {  
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

export interface EmployeesApiResponse extends EmployeePrimitives {  
  createdAt: string
  updatedAt: string
  devices: DevicesApiResponse[]
}

export interface EmployeeMappedApiResponse extends EmployeePrimitives {  
  createdAt: string
  updatedAt: string
  devices?: DevicePrimitives[]
}
export interface EmployeeDevicesMappedApiResponse extends EmployeePrimitives {  
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
export interface BrandApiResponse extends BrandPrimitives {  
  id: Primitives<BrandId>
  createdAt: string
  updatedAt: string
  model: ModelPrimitives[]
}

export interface ModelApiresponse extends ModelPrimitives {  
  id: Primitives<ModelId>
  createdAt: string
  updatedAt: string
  category: CategoryPrimitives
  brand: BrandPrimitives
  modelPrinter: ModelPrinter
  modelMonitor: ModelMonitor
  modelComputer: ModelComputer
  modelLaptop: ModelLaptop
  modelKeyboard: ModelKeyboard
}

export interface ModelComputer extends ModelComputerPrimitives {
  memoryRamType: MemoryRamTypePrimitives
}
export interface ModelLaptop extends ModelLaptopPrimitives {
  memoryRamType: MemoryRamTypePrimitives
}

export interface ModelPrinter extends ModelPrinterPrimitives {}
export interface ModelMonitor extends ModelMonitorPrimitives {}
export interface ModelKeyboard extends ModelKeyboardPrimitives {
  inputType: InputTypePrimitives
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

export interface Computer extends ComputerPrimitives {  
  deviceId: Primitives<DeviceId>  
  createdAt: string
  updatedAt: string
  processor: ProcessorApiresponse
  hardDriveCapacity: HardDriveCapacityPrimitives
  hardDriveType: HardDriveTypePrimitives
  operatingSystem: OperatingSystemPrimitives
  operatingSystemArq: OperatingSystemArqPrimitives
}

export interface BrandApiResponse extends BrandPrimitives {  
  createdAt: string
  updatedAt: string
}
export interface ProcessorApiresponse extends ProcessorPrimitives {
  createdAt: string
  updatedAt: string
}

export interface LocationApiResponse extends LocationPrimitives {
  id: Primitives<LocationId>
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

export interface HardDrive extends HardDrivePrimitives {
  id: Primitives<HardDriveId>
  categoryId: Primitives<CategoryId>
  deviceId: Primitives<DeviceId>
  createdAt: string
  updatedAt: string
  hardDriveCapacity: HardDriveCapacityPrimitives
  hardDriveType: HardDriveTypePrimitives
}
