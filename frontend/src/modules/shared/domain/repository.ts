import { type BrandRepository } from '../../devices/brand/domain/BrandRepository'
import { type CategoryRepository } from '../../devices/category/domain/CategoryRepository'
import { type DeviceRepository } from '../../devices/devices/devices/domain/DeviceRepository'
import { type StatusRepository } from '../../devices/devices/status/domain/StatusRepository'
import { type HardDriveCapacityRepository } from '../../devices/fetures/hardDrive/hardDriveCapacity/domain/HardDriveCapacityRepository'
import { type HardDriveTypeRepository } from '../../devices/fetures/hardDrive/hardDriveType/domain/HardDriveTypeRepository'
import { type MemoryRamTypeRepository } from '../../devices/fetures/memoryRam/memoryRamType/domain/MemoryRamTypeRepository'
import { type OperatingSystemRepository } from '../../devices/fetures/operatingSystem/operatingSystem/domain/OperatingSystemRepository'
import { type OperatingSystemArqRepository } from '../../devices/fetures/operatingSystem/operatingSystemArq/domain/OperatingSystemArqRepository'
import { type ProcessorRepository } from '../../devices/fetures/processor/domain/ProcessorRepository'
import { type ModelRepository } from '../../devices/model/domain/ModelRepository'
import { type VicepresidenciaEjecutivaRepository } from '../../employee/area/vicepresidenciaejecutiva/domain/VicepresidenciaEjecutivaRepository'
import { type VicepresidenciaRepository } from '../../employee/area/vicepresidencia/domain/VicepresidenciaRepository'
import { type GerenciaRepository } from '../../employee/area/gerencia/domain/gerenciaRepository'
import { type CoordinacionRepository } from '../../employee/area/coordinacion/domain/CoordinacionRepository'
import { type AuthRepository } from '../../user/auth/domain/AuthRepository'
import { type RoleRepository } from '../../user/role/domain/RoleRepository'
import { type UserRepository } from '../../user/user/domain/UserRepository'
import { type CargoRepository } from '../../employee/cargo/domain/cargoRepository'
import { type TypeOfSiteRepository } from '../../location/typeofsites/domain/typeOfSiteRepository'
import { type CityRepository } from '../../location/city/domain/cityRepository'
import { type StateRepository } from '../../location/state/domain/stateRepository'
import { type RegionRepository } from '../../location/region/domain/regionRepository'
import { type SiteRepository } from '../../location/site/domain/siteRepository'
import { type LocationRepository } from '../../location/locations/domain/locationRepository'

export interface Repository {
  brand: BrandRepository
  category: CategoryRepository
  status: StatusRepository
  device: DeviceRepository
  model: ModelRepository
  processor: ProcessorRepository
  operatingSystem: OperatingSystemRepository
  operatingSystemArq: OperatingSystemArqRepository
  hardDriveType: HardDriveTypeRepository
  hardDriveCapacity: HardDriveCapacityRepository
  // hardDrive: HardDriveRepository
  // computer: ComputerRepository
  memoryRamType: MemoryRamTypeRepository
  role: RoleRepository
  user: UserRepository
  auth: AuthRepository
  // area
  vicepresidenciaEjecutiva: VicepresidenciaEjecutivaRepository
  vicepresidencia: VicepresidenciaRepository
  gerencia: GerenciaRepository
  coordinacion: CoordinacionRepository
  cargo: CargoRepository
  // location
  city: CityRepository
  state: StateRepository
  region: RegionRepository
  site: SiteRepository
  location: LocationRepository
  typeOfSite: TypeOfSiteRepository

}
