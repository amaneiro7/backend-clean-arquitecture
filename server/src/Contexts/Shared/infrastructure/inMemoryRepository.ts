import { InMemoryBrandRepository } from '../../Brand/infrastructure/InMemoryBrandRepository'
import { InMemoryCategoryRepository } from '../../Category/infrastructure/InMemoryCategoryRepository'
import { InMemoryDeviceRepository } from '../../Device/Device/infrastructure/InMemoryDeviceRepository'
import { InMemoryComputerFeaturesRepository } from '../../Features/infrastructure/ComputerFeaturesInMemory'
import { InMemoryHardDriveRepository } from '../../Features/infrastructure/HardDriveInMemory'
import { InMemoryComputerProcessorRepository } from '../../Features/infrastructure/ProcessorInMemory'
import { InMemoryModelSeriesRepository } from '../../ModelSeries/ModelSeries/infraestructure/InMemoryModelSeriesRepository'
import { InMemoryUserRepository } from '../../User/user/infrastructure/persistance/InMemoryUserRepository'
import { type Repository } from '../domain/Repository'

export const repositoryInMemory: Repository = {
  user: new InMemoryUserRepository(),
  brand: new InMemoryBrandRepository(),
  category: new InMemoryCategoryRepository(),
  modelSeries: new InMemoryModelSeriesRepository(),
  device: new InMemoryDeviceRepository(),
  computerFeatures: new InMemoryComputerFeaturesRepository(),
  hardDrive: new InMemoryHardDriveRepository(),
  processor: new InMemoryComputerProcessorRepository()
}
