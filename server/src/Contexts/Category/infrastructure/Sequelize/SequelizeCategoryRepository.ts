import { models } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type CategoryPrimitives } from '../../domain/Category'
import { type CategoryRepository } from '../../domain/CategoryRepository'

export class SequelizeCategoryRepository implements CategoryRepository {
  async searchAll (): Promise<CategoryPrimitives[]> {
    return await models.Category.findAll()
  }

  async searchById (id: number): Promise<CategoryPrimitives | null> {
    return await models.Category.findByPk(id) ?? null
  }

  async searchByName (name: string): Promise<CategoryPrimitives | null> {
    return await models.Category.findOne({ where: { name } }) ?? null
  }
}
