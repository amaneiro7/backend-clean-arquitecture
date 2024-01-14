import { type Repository } from '../../../Shared/domain/Repository'
import { CategoryDoesNotExistError } from '../../domain/CategoryDoesNotExistError'
import { type CategoryId } from '../../domain/CategoryId'
import { type CategoryName } from '../../domain/CategoryName'
import { CategoryResponse } from './CategoryResponse'

export class CategoriesFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (categoryId: CategoryId): Promise<CategoryResponse> {
    const category = await this.repository.category.searchById(categoryId)

    if (category === null) {
      throw new CategoryDoesNotExistError(String(categoryId))
    }

    return new CategoryResponse(category.IdValue, category.IdValue)
  }

  async searchByName (categoryName: CategoryName): Promise<CategoryResponse> {
    const category = await this.repository.category.searchByName(categoryName)

    if (category === null) {
      throw new CategoryDoesNotExistError(String(categoryName))
    }

    return new CategoryResponse(category.IdValue, category.IdValue)
  }
}
