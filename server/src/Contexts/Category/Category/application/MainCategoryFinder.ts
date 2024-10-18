
import { type Repository } from '../../../Shared/domain/Repository'
import { type MainCategoryPrimitives } from '../domain/MainCategory'
import { type MainCategoryId } from '../domain/MainCategoryId'
import { MainCategoryDoesNotExistError } from '../domain/MainCategoryDoesNotExistError'


export class MainCategoriesFinder {
  constructor(private readonly repository: Repository) { }

  async searchById(categoryId: MainCategoryId): Promise<MainCategoryPrimitives> {
    const category = await this.repository.mainCategory.searchById(categoryId.value)

    if (category === null) {
      throw new MainCategoryDoesNotExistError(categoryId.value)
    }

    return category
  }
}
