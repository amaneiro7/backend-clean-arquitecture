import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type CategoryPrimitives } from './Category'
import { type CategoryId } from './CategoryId'
import { type CategoryName } from './CategoryName'

export abstract class CategoryRepository {
  abstract searchAll(): Promise<CategoryPrimitives[]>

  abstract searchById(id: Primitives<CategoryId>): Promise<CategoryPrimitives | null>

  abstract searchByName(name: Primitives<CategoryName>): Promise<CategoryPrimitives | null>
}
