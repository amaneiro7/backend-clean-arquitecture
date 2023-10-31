import { type Id } from '../../types/types'
import { type Category } from '../entities/category.entity'

export interface CategoryRepository {
  getAll: () => Promise<Category[]>
  getOne: ({ id }: { id: Id }) => Promise<Category | undefined>
}
