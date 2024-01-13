import { type Category } from './Category'
import { type CategoryId } from './CategoryId'
import { type CategoryName } from './CategoryName'

export abstract class CategoryRepository {
  abstract searchAll: () => Promise<Category[]>

  abstract searchById: (id: CategoryId) => Promise<Category | null>

  abstract searchByName: (name: CategoryName) => Promise<Category | null>
}
