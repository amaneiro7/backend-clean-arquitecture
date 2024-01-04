import { BrandRepositoryImpl } from './brand'
import { CategoryRepositoryImpl } from './category'
import { DeviceRepositoryImpl } from './device'
import { ModelSeriesRepositoryImpl } from './modelSeries'
import { UserRepositoryImpl } from './user'

export const repositoryInMemory = {
  user: new UserRepositoryImpl(),
  brand: new BrandRepositoryImpl(),
  category: new CategoryRepositoryImpl(),
  modelSeries: new ModelSeriesRepositoryImpl(),
  device: new DeviceRepositoryImpl()
}
