import { type CategoryPrimitives } from '../../domain/Category'
import { type CategoryRepository } from '../../domain/CategoryRepository'
import { CategoryModel } from './CategorySchema'

export class SequelizeCategoryRepository implements CategoryRepository {
  async searchAll (): Promise<CategoryPrimitives[]> {
    return await CategoryModel.findAll()
  }

  async searchById (id: string): Promise<CategoryPrimitives | null> {
    return await CategoryModel.findByPk(id) ?? null
  }

  async searchByName (name: string): Promise<CategoryPrimitives | null> {
    return await CategoryModel.findOne({ where: { name } }) ?? null
  }
}
