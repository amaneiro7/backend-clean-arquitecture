import { type BrandRepository } from '../../Brand/domain/BrandRepository'
import { type CategoryRepository } from '../../Category/domain/CategoryRepository'
import { type StatusRepository } from '../../Device/Status/domain/StatusRepository'
import { type DeviceRepository } from '../../Device/Device/domain/DeviceRepository'
import { type ModelSeriesRepository } from '../../ModelSeries/ModelSeries/domain/ModelSeriesRepository'
import { type UserRepository } from '../../User/user/domain/UserRepository'
import { type HardDriveTypeRepository } from '../../Features/HardDrive/HardDriveType/domain/HardDriveTypeRepository'
import { type HardDriveCapacityRepository } from '../../Features/HardDrive/HardDriveCapacity/domain/HardDriveCapacityRepository'
import { type ProcessorRepository } from '../../Features/Processor/Processor/domain/ProcessorRepository'
import { type MemoryRamTypeRepository } from '../../Features/MemoryRam/MemoryRamType/domain/MemoryRamTypeRepository'
import { type OperatingSystemRepository } from '../../Features/OperatingSystem/OperatingSystem/domain/OperatingSystemRepository'
import { type OperatingSystemArqRepository } from '../../Features/OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqRepository'
import { type RoleRepository } from '../../User/Role/domain/RoleRepository'
import { type HistoryRepository } from '../../History/domain/HistoryRepository'
import { type ProcessorSocketRepository } from '../../Features/Processor/ProcessorSocket/domain/ProcessorSocketRepository'
import { type StateRepository } from '../../Location/State/domain/StateRepository'
import { type CityRepository } from '../../Location/City/domain/CityRepository'
import { type TypeOfSiteRepository } from '../../Location/TypeOfSite/domain/TypeOfSiteRepository'
import { type RegionRepository } from '../../Location/Region/domain/RegionRepository'
import { type SiteRepository } from '../../Location/Site/domain/SiteRepository'
import { type LocationRepository } from '../../Location/Location/domain/LocationRepository'
import { type VicepresidenciaEjecutivaRepository } from '../../employee/Area/VicepresidenciaEjecutiva/domain/VicepresidenciaEjecutivaRepository'
import { type VicepresidenciaRepository } from '../../employee/Area/VicePresidencia/domain/vicepresidenciaRepository'
import { type GerenciaRepository } from '../../employee/Area/Gerencia/domain/GerenciaRepository'
import { type CoordinacionRepository } from '../../employee/Area/Coordinacion/domain/CoordinacionRepository'
import { type CargoRepository } from '../../employee/Cargo/domain/CargoRepository'
import { type EmployeeRepository } from '../../employee/Employee/domain/EmployeeRepository'
import { type InputTypeRepository } from '../../ModelSeries/InputType/domain/InputTypeRepository'
import { type DashboardRepository } from '../../Device/Inventroy/domain/DashboardRepository'

export interface Repository {
  user: UserRepository
  brand: BrandRepository
  category: CategoryRepository
  modelSeries: ModelSeriesRepository
  status: StatusRepository
  device: DeviceRepository
  hardDriveType: HardDriveTypeRepository
  hardDriveCapacity: HardDriveCapacityRepository
  processor: ProcessorRepository
  processorSocket: ProcessorSocketRepository
  memoryRamType: MemoryRamTypeRepository
  operatingSystemVersion: OperatingSystemRepository
  operatingSystemArq: OperatingSystemArqRepository
  role: RoleRepository
  history: HistoryRepository
  state: StateRepository
  city: CityRepository
  typeOfSite: TypeOfSiteRepository
  region: RegionRepository
  site: SiteRepository
  location: LocationRepository
  vicepresidenciaEjecutiva: VicepresidenciaEjecutivaRepository
  vicepresidencia: VicepresidenciaRepository
  gerencia: GerenciaRepository
  coordinacion: CoordinacionRepository
  cargo: CargoRepository
  employee: EmployeeRepository
  inputType: InputTypeRepository
  dashboard: DashboardRepository
}
