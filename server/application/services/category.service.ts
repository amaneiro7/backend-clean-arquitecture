import { type Category } from '../../domain/entities/category.entity'
import { type CategoryRepository } from '../../domain/repositories/category.repository'
import { type Id } from '../../types/types'

export class CategoryService {
  constructor (private readonly store: CategoryRepository) {}

  async getAll (): Promise<Category[]> {
    return await this.store.getAll()
  }

  async getOne ({ id }: { id: Id }): Promise<Category | undefined> {
    return await this.store.getOne({ id })
  }
}
