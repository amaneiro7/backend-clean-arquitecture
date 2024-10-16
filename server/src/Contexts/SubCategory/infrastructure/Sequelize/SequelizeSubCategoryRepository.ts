import { type CacheRepository } from '../../../Shared/domain/CacheRepository'
import { CacheService } from '../../../Shared/domain/CacheService'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type CategoryPrimitives } from '../../domain/Category'
import { type CategoryId } from '../../domain/CategoryId'
import { type CategoryName } from '../../domain/CategoryName'
import { type CategoryRepository } from '../../domain/CategoryRepository'
import { CategoryModel } from './CategorySchema'

export class SequelizeCategoryRepository implements CategoryRepository {
  private readonly cacheKey: string = 'categories'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<CategoryPrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await CategoryModel.findAll({
        order: [
          ['name', 'ASC']
        ]
      })
    })
  }

  async searchById(id: Primitives<CategoryId>): Promise<CategoryPrimitives | null> {
    return await CategoryModel.findByPk(id) ?? null
  }

  async searchByName(name: Primitives<CategoryName>): Promise<CategoryPrimitives | null> {
    return await CategoryModel.findOne({ where: { name } }) ?? null
  }
}
