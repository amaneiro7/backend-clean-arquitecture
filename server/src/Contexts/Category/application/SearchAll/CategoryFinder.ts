import { type CategoryRepository } from '../../domain/CategoryRepository'
import { CategoriesResponse } from './CategoryResponse'

export class searchAllCategories {
  constructor (private readonly repository: CategoryRepository) {}

  async run (): Promise<CategoriesResponse> {
    const categories = await this.repository.searchAll()

    return new CategoriesResponse(categories)
  }
}
