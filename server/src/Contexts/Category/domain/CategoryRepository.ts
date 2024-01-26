import { type CategoryPrimitives } from './Category'

export abstract class CategoryRepository {
  abstract searchAll (): Promise<CategoryPrimitives[]>

  abstract searchById (id: number): Promise<CategoryPrimitives | null>

  abstract searchByName (name: string): Promise<CategoryPrimitives | null>
}
