import { ModelIndexesOptions } from 'sequelize'
import { BrandId } from '../../../../Brand/domain/BrandId'
import { CategoryId } from '../../../../Category/domain/CategoryId'
import { type DevicePrimitives } from '../../../../Device/Device/domain/Device'
import { DeviceActivo } from '../../../../Device/Device/domain/DeviceActivo'
import { DeviceId } from '../../../../Device/Device/domain/DeviceId'
import { DeviceSerial } from '../../../../Device/Device/domain/DeviceSerial'
import { type LocationPrimitives } from '../../../../Location/Location/domain/Location'
import { type LocationId } from '../../../../Location/Location/domain/LocationId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type UserEmail } from '../../../../User/user/domain/UserEmail'
import { type CoordinacionPrimitives } from '../../../Area/Coordinacion/domain/Coordinacion'
import { type CoordinacionId } from '../../../Area/Coordinacion/domain/CoordinacionId'
import { type GerenciaPrimitives } from '../../../Area/Gerencia/domain/Gerencia'
import { type GerenciaId } from '../../../Area/Gerencia/domain/GerenciaId'
import { type VicepresidenciaPrimitives } from '../../../Area/VicePresidencia/domain/vicepresidencia'
import { type VicepresidenciaId } from '../../../Area/VicePresidencia/domain/vicepresidenciaId'
import { type VicepresidenciaEjecutivaPrimitives } from '../../../Area/VicepresidenciaEjecutiva/domain/VicepresidenciaEjecutiva'
import { type VicepresidenciaEjecutivaId } from '../../../Area/VicepresidenciaEjecutiva/domain/VicepresidenciaEjecutivaId'
import { type CargoPrimitives } from '../../../Cargo/domain/Cargo'
import { type CargoId } from '../../../Cargo/domain/CargoId'
import { type EmployeeCedula } from '../../domain/EmployeeCedula'
import { type EmployeeId } from '../../domain/EmployeeId'
import { type EmployeeLastName } from '../../domain/EmployeeLastName'
import { type EmployeeName } from '../../domain/EmployeeName'
import { type EmployeeUserName } from '../../domain/EmployeeUsername'
import { type Extension } from '../../domain/Extension'
import { type PhoneNumber } from '../../domain/PhoneNumber'
import { DeviceEmployee } from '../../../../Device/Device/domain/DeviceEmployee'
import { DeviceObservation } from '../../../../Device/Device/domain/DeviceObservation'
import { CategoryPrimitives } from '../../../../Category/domain/Category'
import { ModelApiresponse } from '../../../../Device/Device/infrastructure/sequelize/DeviceResponse'
import { BrandPrimitives } from '../../../../Brand/domain/Brand'
import { EmployeePrimitives } from '../../domain/Employee'

export interface DevicesApiResponse {
  id: Primitives<DeviceId>
  activo: Primitives<DeviceActivo>
  serial: Primitives<DeviceSerial>
  statusId: Primitives<StatusId >
  categoryId: Primitives<CategoryId>
  brandId: Primitives<BrandId>
  modelId: Primitives<ModelIndexesOptions>
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

export interface EmployeesApiResponse {
  id: Primitives<EmployeeId>
  userName: Primitives<EmployeeUserName>
  name: Primitives<EmployeeName>
  lastName: Primitives<EmployeeLastName>
  cedula: Primitives<EmployeeCedula>
  locationId: Primitives<LocationId>
  email: Primitives<UserEmail>
  extension: Primitives<Extension>
  cargoId: Primitives<CargoId>
  phoneNumber: Primitives<PhoneNumber>
  vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
  vicepresidenciaId: Primitives<VicepresidenciaId>
  gerenciaId: Primitives<GerenciaId>
  coordinacionId: Primitives<CoordinacionId>
  createdAt: Date
  updatedAt: Date
  cargo: CargoPrimitives
  location: LocationPrimitives
  vicepresidenciaEjecutiva: VicepresidenciaEjecutivaPrimitives
  vicepresidencia: VicepresidenciaPrimitives
  gerencia: GerenciaPrimitives
  coordinacion: CoordinacionPrimitives
  devices: DevicesApiResponse[]
}

export interface EmployeesApiResponse {
  id: Primitives<EmployeeId>
  userName: Primitives<EmployeeUserName>
  devices: DevicesApiResponse[]
  createdAt: string
  updatedAt: string
}
export interface EmployeeDevicesMappedApiResponse {
  id: Primitives<EmployeeId>
  userName: Primitives<EmployeeUserName>
  createdAt: string
  updatedAt: string
  computers: DevicesApiResponse[]
  monitores: DevicesApiResponse[]
}