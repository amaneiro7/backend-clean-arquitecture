import { MainCategoryModel } from './MainCategorySchema'
import { CacheService } from '../../../../Shared/domain/CacheService'
import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type MainCategoryPrimitives } from '../../domain/MainCategory'
import { type MainCategoryId } from '../../domain/MainCategoryId'
import { type MainCategoryRepository } from '../../domain/MainCategoryRepository'

export class SequelizeMainCategoryRepository implements MainCategoryRepository {
  private readonly cacheKey: string = 'categories'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<MainCategoryPrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await MainCategoryModel.findAll({
        order: [
          ['name', 'ASC']
        ]
      })
    })
  }

  async searchById(id: Primitives<MainCategoryId>): Promise<MainCategoryPrimitives | null> {
    return await MainCategoryModel.findByPk(id) ?? null
  }
}
