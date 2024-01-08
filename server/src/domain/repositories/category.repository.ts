import { type Id } from '../../types/types'
import { type Category } from '../entities/DeviceAggregation/category.entity'

export interface CategoryRepository {
  getAll: () => Promise<Category[]>
  getById: (id: Id) => Promise<Category | undefined>
  getByName: (name: string) => Promise<Category | undefined>
}
