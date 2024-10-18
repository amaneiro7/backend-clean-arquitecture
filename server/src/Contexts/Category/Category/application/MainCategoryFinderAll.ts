import { type Repository } from '../../../Shared/domain/Repository'
import { type MainCategoryPrimitives } from '../domain/MainCategory'

export class SearchAllMainCategories {
  constructor(private readonly repository: Repository) { }

  async search(): Promise<MainCategoryPrimitives[]> {
    return await this.repository.mainCategory.searchAll()
  }
}
