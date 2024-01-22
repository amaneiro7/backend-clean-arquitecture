import { type BrandRepository } from '../../Brand/domain/BrandRepository'
import { type CategoryRepository } from '../../Category/domain/CategoryRepository'
import { type DeviceRepository } from '../../Device/domain/DeviceRepository'
import { type ComputerFeaturesRepository } from '../../Features/domain/ComputerFeatures/ComputerFeaturesRepository'
import { type HardDriveRepository } from '../../Features/domain/HardDriveFeatures.ts/HardDriveRepository'
import { type ComputerProcessorRepository } from '../../Features/domain/ProcessorFeatures/ComputerProcessorRepository'
import { type ModelSeriesRepository } from '../../ModelSeries/domain/ModelSeriesRepository'
import { type UserRepository } from '../../User/domain/UserRepository'

export interface Repository {
  user: UserRepository
  brand: BrandRepository
  category: CategoryRepository
  modelSeries: ModelSeriesRepository
  device: DeviceRepository
  computerFeatures: ComputerFeaturesRepository
  hardDrive: HardDriveRepository
  processor: ComputerProcessorRepository
}
