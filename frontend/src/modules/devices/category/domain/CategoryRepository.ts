import { type Category } from './Category'

export abstract class CategoryRepository {
  abstract getAll (): Promise<Category[]>

  abstract getById ({ id }: { id: number }): Promise<Category | null>

  abstract getByName ({ name }: { name: string }): Promise<Category | null>
}
