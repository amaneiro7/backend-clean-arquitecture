import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type CategoryPrimitives } from '../../domain/Category'
import { type CategoryId } from '../../domain/CategoryId'
import { type CategoryName } from '../../domain/CategoryName'
import { type CategoryRepository } from '../../domain/CategoryRepository'
import { CategoryModel } from './CategorySchema'

export class SequelizeCategoryRepository implements CategoryRepository {
  async searchAll (): Promise<CategoryPrimitives[]> {
    return await CategoryModel.findAll()
  }

  async searchById (id: Primitives<CategoryId>): Promise<CategoryPrimitives | null> {
    return await CategoryModel.findByPk(id) ?? null
  }

  async searchByName (name: Primitives<CategoryName>): Promise<CategoryPrimitives | null> {
    return await CategoryModel.findOne({ where: { name } }) ?? null
  }
}
