import { type Repository } from '../../../shared/domain/repository'
import { type Category } from '../domain/Category'

export async function allCategoryGetter ({ repository }: { repository: Repository }): Promise<Category[]> {
  return await repository.category.getAll()
}
