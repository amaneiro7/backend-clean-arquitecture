import { notFound } from '@hapi/boom'
import { type Category } from '../../domain/entities/category.entity'
import { type Repository } from '../../domain/repositories/respoitory'

export async function getCategoryByName ({ name, repository }: { name: string, repository: Repository }): Promise<Category | undefined> {
  const data = await repository.category.getByName(name)
  if (data === undefined) {
    throw notFound('Categoria no encontrada')
  }
  return data
}
