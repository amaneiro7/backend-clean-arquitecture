import { SubCategoryDoesNotExistError } from '../domain/CategoryDoesNotExistError'
import { type Repository } from '../../../Shared/domain/Repository'
import { type SubCategoryPrimitives } from '../domain/Category'
import { type SubCategoryId } from '../domain/CategoryId'
import { type SubCategoryName } from '../domain/CategoryName'

export class SubCategoriesFinder {
  constructor(private readonly repository: Repository) { }

  async searchById(categoryId: SubCategoryId): Promise<SubCategoryPrimitives> {
    const category = await this.repository.subCategory.searchById(categoryId.value)

    if (category === null) {
      throw new SubCategoryDoesNotExistError(categoryId.toString())
    }

    return category
  }

  async searchByName(categoryName: SubCategoryName): Promise<SubCategoryPrimitives> {
    const category = await this.repository.subCategory.searchByName(categoryName.toString())

    if (category === null) {
      throw new SubCategoryDoesNotExistError(categoryName.toString())
    }

    return category
  }
}
