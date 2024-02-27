import { type BrandRepository } from '../../Brand/domain/BrandRepository'
import { type CategoryRepository } from '../../Category/domain/CategoryRepository'
import { type StatusRepository } from '../../Device/Status/domain/StatusRepository'
import { type DeviceRepository } from '../../Device/Device/domain/DeviceRepository'
import { type ModelSeriesRepository } from '../../ModelSeries/ModelSeries/domain/ModelSeriesRepository'
import { type UserRepository } from '../../User/user/domain/UserRepository'
import { type HardDriveTypeRepository } from '../../Features/HardDrive.ts/HardDriveType/domain/HardDriveTypeRepository'
import { type HardDriveCapacityRepository } from '../../Features/HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityRepository'
import { type HardDriveRepository } from '../../Features/HardDrive.ts/HardDrive/domain/HardDriveRepository'
import { type ProcessorRepository } from '../../Features/Processor/Processor/domain/ProcessorRepository'
import { type MemoryRamTypeRepository } from '../../Features/MemoryRam/MemoryRamType/domain/MemoryRamTypeRepository'
import { type OperatingSystemRepository } from '../../Features/OperatingSystem/OperatingSystem/domain/OperatingSystemRepository'
import { type OperatingSystemArqRepository } from '../../Features/OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqRepository'
import { type ComputerRepository } from '../../Features/Computer/domain/ComputerRepository'
import { type RoleRepository } from '../../User/Role/domain/RoleRepository'
import { type HistoryRepository } from '../../History/domain/HistoryRepository'
import { type ProcessorSocketRepository } from '../../Features/Processor/ProcessorSocket/domain/ProcessorSocketRepository'
import { type StateRepository } from '../../Location/State/domain/StateRepository'
import { type CityRepository } from '../../Location/City/domain/CityRepository'
import { type TypeOfSiteRepository } from '../../Location/TypeOfSite/domain/TypeOfSiteRepository'
import { type RegionRepository } from '../../Location/Region/domain/RegionRepository'
import { type SiteRepository } from '../../Location/Site/domain/SiteRepository'

export interface Repository {
  user: UserRepository
  brand: BrandRepository
  category: CategoryRepository
  modelSeries: ModelSeriesRepository
  status: StatusRepository
  device: DeviceRepository
  hardDriveType: HardDriveTypeRepository
  hardDriveCapacity: HardDriveCapacityRepository
  hardDrive: HardDriveRepository
  processor: ProcessorRepository
  processorSocket: ProcessorSocketRepository
  memoryRamType: MemoryRamTypeRepository
  operatingSystemVersion: OperatingSystemRepository
  operatingSystemArq: OperatingSystemArqRepository
  computer: ComputerRepository
  role: RoleRepository
  history: HistoryRepository
  state: StateRepository
  city: CityRepository
  typeOfSite: TypeOfSiteRepository
  region: RegionRepository
  site: SiteRepository
}
