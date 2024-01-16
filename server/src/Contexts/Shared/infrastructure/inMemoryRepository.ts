import { InMemoryBrandRepository } from '../../Brand/infrastructure/InMemoryBrandRepository'
import { InMemoryCategoryRepository } from '../../Category/infrastructure/InMemoryCategoryRepository'
import { InMemoryModelSeriesRepository } from '../../ModelSeries/infraestructure/InMemoryModelSeriesRepository'
import { InMemoryUserRepository } from '../../User/infrastructure/persistence/InMemoryUserRepository'
import { type Repository } from '../domain/Repository'

export const repositoryInMemory: Repository = {
  user: new InMemoryUserRepository(),
  brand: new InMemoryBrandRepository(),
  category: new InMemoryCategoryRepository(),
  modelSeries: new InMemoryModelSeriesRepository()
//   device: new InMemoryDeviceRepository()
}
