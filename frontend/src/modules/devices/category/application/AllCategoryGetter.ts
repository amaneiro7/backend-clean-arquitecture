import { type Repository } from '../../../shared/domain/repository'
import { type CategoryPrimitives } from '../domain/Category'

export class allCategoryGetter {
  constructor (readonly repository: Repository) {}

  async get (): Promise<CategoryPrimitives[]> {
    return await this.repository.category.getAll()
  }
}
