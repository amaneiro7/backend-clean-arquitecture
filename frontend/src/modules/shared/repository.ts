import { type BrandRepository } from '../devices/brand/domain/BrandRepository'
import { type CategoryRepository } from '../devices/category/domain/CategoryRepository'

export interface Repository {
  brand: BrandRepository
  category: CategoryRepository
}
