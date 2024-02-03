import { type CategoryPrimitives } from './Category'
import { type CategoryId } from './CategoryId'
import { type CategoryName } from './CategoryName'

export abstract class CategoryRepository {
  abstract getAll (): Promise<CategoryPrimitives[]>

  abstract getById ({ id }: { id: CategoryId }): Promise<CategoryPrimitives | null>

  abstract getByName ({ name }: { name: CategoryName }): Promise<CategoryPrimitives | null>
}
