import { type BrandRepository } from '../../Brand/domain/BrandRepository'
import { type CategoryRepository } from '../../Category/domain/CategoryRepository'
import { type StatusRepository } from '../../Device/Status/domain/StatusRepository'
import { type DeviceRepository } from '../../Device/Device/domain/DeviceRepository'
import { type ComputerFeaturesRepository } from '../../Features/Computer/domain/ComputerFeaturesRepository'
import { type ComputerProcessorRepository } from '../../Features/Processor/ComputerProcessorRepository'
import { type ModelSeriesRepository } from '../../ModelSeries/domain/ModelSeriesRepository'
import { type UserRepository } from '../../User/domain/UserRepository'
import { type HardDriveTypeRepository } from '../../Features/HardDrive.ts/HardDriveType/domain/HardDriveTypeRepository'
import { type HardDriveCapacityRepository } from '../../Features/HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityRepository'

export interface Repository {
  user: UserRepository
  brand: BrandRepository
  category: CategoryRepository
  modelSeries: ModelSeriesRepository
  status: StatusRepository
  device: DeviceRepository
  computerFeatures?: ComputerFeaturesRepository
  hardDriveType: HardDriveTypeRepository
  hardDriveCapacity: HardDriveCapacityRepository
  processor?: ComputerProcessorRepository
}
