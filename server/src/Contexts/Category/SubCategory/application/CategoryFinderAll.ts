import { type Repository } from '../../../Shared/domain/Repository'
import { type CategoryPrimitives } from '../domain/Category'

export class SearchAllCategories {
  constructor(private readonly repository: Repository) { }

  async search(): Promise<CategoryPrimitives[]> {
    return await this.repository.category.searchAll()
  }
}
