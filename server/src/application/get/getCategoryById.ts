import { notFound } from '@hapi/boom'
import { type Category } from '../../domain/entities/category.entity'
import { type Repository } from '../../domain/repositories/respoitory'
import { type Id } from '../../types/types'

export async function getCategoryById ({ id, repository }: { id: Id, repository: Repository }): Promise<Category | undefined> {
  const data = await repository.category.getById(id)
  if (data === undefined) {
    throw notFound('Categoria no encontrada')
  }
  return data
}
