import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type MainCategoryPrimitives } from './MainCategory'
import { type MainCategoryId } from './MainCategoryId'

export abstract class MainCategoryRepository {
  abstract searchAll(): Promise<MainCategoryPrimitives[]>

  abstract searchById(id: Primitives<MainCategoryId>): Promise<MainCategoryPrimitives | null>
}
