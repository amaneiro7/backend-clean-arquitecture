import { type BrandRepository } from './brand.repository'
import { type CategoryRepository } from './category.repository'
import { type DeviceRepository } from './device.repositories'
import { type ModelSeriesRepository } from './modelSeries.repository'
import { type UserRepository } from './user.repository'

export interface Repository {
  user: UserRepository
  brand: BrandRepository
  category: CategoryRepository
  modelSeries: ModelSeriesRepository
  device: DeviceRepository
}
