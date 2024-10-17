import { type Repository } from '../../Shared/domain/Repository'
import { type CategoryPrimitives } from '../domain/Category'
import { CategoryDoesNotExistError } from '../domain/CategoryDoesNotExistError'
import { type CategoryId } from '../domain/CategoryId'
import { type CategoryName } from '../domain/CategoryName'

export class CategoriesFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (categoryId: CategoryId): Promise<CategoryPrimitives> {
    const category = await this.repository.category.searchById(categoryId.value)

    if (category === null) {
      throw new CategoryDoesNotExistError(categoryId.toString())
    }

    return category
  }

  async searchByName (categoryName: CategoryName): Promise<CategoryPrimitives> {
    const category = await this.repository.category.searchByName(categoryName.toString())

    if (category === null) {
      throw new CategoryDoesNotExistError(categoryName.toString())
    }

    return category
  }
}
