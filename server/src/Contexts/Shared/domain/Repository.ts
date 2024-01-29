import { type BrandRepository } from '../../Brand/domain/BrandRepository'
import { type CategoryRepository } from '../../Category/domain/CategoryRepository'
import { type StatusRepository } from '../../Device/Status/domain/StatusRepository'
import { type DeviceRepository } from '../../Device/Device/domain/DeviceRepository'
import { type ComputerFeaturesRepository } from '../../Features/Computer/domain/ComputerFeaturesRepository'
import { type HardDriveRepository } from '../../Features/domain/HardDrive.ts/HardDriveRepository'
import { type ComputerProcessorRepository } from '../../Features/Processor/ComputerProcessorRepository'
import { type ModelSeriesRepository } from '../../ModelSeries/domain/ModelSeriesRepository'
import { type UserRepository } from '../../User/domain/UserRepository'

export interface Repository {
  user: UserRepository
  brand: BrandRepository
  category: CategoryRepository
  modelSeries: ModelSeriesRepository
  status: StatusRepository
  device: DeviceRepository
  computerFeatures?: ComputerFeaturesRepository
  hardDrive?: HardDriveRepository
  processor?: ComputerProcessorRepository
}
