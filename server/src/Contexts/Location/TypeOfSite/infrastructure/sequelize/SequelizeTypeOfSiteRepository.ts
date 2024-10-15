import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { CacheService } from '../../../../Shared/domain/CacheService'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type TypeOfSitePrimitives } from '../../domain/TypeOfSite'
import { type TypeOfSiteId } from '../../domain/TypeOfSiteId'
import { TypeOfSiteRepository } from '../../domain/TypeOfSiteRepository'
import { TypeOfSiteModel } from './TypeOfSiteSchema'

export class SequelizeTypeOfSiteRepository implements TypeOfSiteRepository {
  private readonly cacheKey: string = 'typeOfSite'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<TypeOfSitePrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await TypeOfSiteModel.findAll()
    })
  }

  async searchById(id: Primitives<TypeOfSiteId>): Promise<TypeOfSitePrimitives | null> {
    return await TypeOfSiteModel.findByPk(id) ?? null
  }
}
