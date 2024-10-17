import { type Repository } from '../../../Shared/domain/Repository'
import { type SubCategoryPrimitives } from '../domain/Category'

export class SearchAllSubCategories {
  constructor(private readonly repository: Repository) { }

  async search(): Promise<SubCategoryPrimitives[]> {
    return await this.repository.subCategory.searchAll()
  }
}
