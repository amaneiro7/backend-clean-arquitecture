import { type Repository } from '../../../Shared/domain/Repository'
import { CategoriesResponse } from './CategoryResponse'

export class SearchAllCategories {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<CategoriesResponse> {
    const categories = await this.repository.category.searchAll()

    return new CategoriesResponse(categories)
  }
}
