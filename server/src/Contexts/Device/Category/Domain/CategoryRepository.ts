import { type Id } from '../../../Shared/domain/Uuid'
import { type Category } from './Category'

export interface CategoryRepository {
  searchAll: () => Promise<Category[]>
  searchById: (id: Id) => Promise<Category | null>
  searchByName: (name: string) => Promise<Category | null>
}
