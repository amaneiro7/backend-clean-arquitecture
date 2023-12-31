import { notFound } from '@hapi/boom'
import { type Category } from '../../domain/entities/category.entity'
import { type Id } from '../../types/types'
import { type CategoryRepositotoryInterface } from '../../infrastructure/persistance/local-file-system/category'

export class CategoryService {
  constructor (private readonly store: CategoryRepositotoryInterface) {}

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
