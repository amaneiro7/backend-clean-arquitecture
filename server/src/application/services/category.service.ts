import { notFound } from '@hapi/boom'
import { type Category } from '../../domain/entities/category.entity'
import { type Id } from '../../types/types'
import { type CategoryRepository } from '../../domain/repositories/category.repository'

export class CategoryService {
  constructor (private readonly store: CategoryRepository) {}

  async getAll (): Promise<Category[]> {
    return await this.store.getAll.exec()
  }

  async getOne ({ id }: { id: Id }): Promise<Category | undefined> {
    const data = await this.store.getById.exec({ id })
    if (data === undefined) {
      throw notFound('Categoria no encontrada')
    }
    return data
  }
}
