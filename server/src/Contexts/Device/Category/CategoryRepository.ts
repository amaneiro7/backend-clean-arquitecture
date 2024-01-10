import { type Id } from '../../Shared/Id'
import { type Category } from './Category'

export interface CategoryRepository {
  getAll: () => Promise<Category[]>
  getById: (id: Id) => Promise<Category | undefined>
  getByName: (name: string) => Promise<Category | undefined>
}
