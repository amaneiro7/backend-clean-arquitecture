import { type Category } from '../../domain/entities/Device/category.entity'
import { type Repository } from '../../domain/repositories/respoitory'

export async function getAllCategories (repository: Repository): Promise<Category[]> {
  return await repository.category.getAll()
}
