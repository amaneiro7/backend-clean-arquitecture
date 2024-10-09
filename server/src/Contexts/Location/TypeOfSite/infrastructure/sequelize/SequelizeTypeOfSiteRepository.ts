import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type TypeOfSitePrimitives } from '../../domain/TypeOfSite'
import { type TypeOfSiteId } from '../../domain/TypeOfSiteId'
import { TypeOfSiteRepository } from '../../domain/TypeOfSiteRepository'
import { TypeOfSiteModel } from './TypeOfSiteSchema'

export class SequelizeTypeOfSiteRepository implements TypeOfSiteRepository {
  private readonly cacheKey: string = 'typeOfSite'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<TypeOfSitePrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await TypeOfSiteModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<TypeOfSiteId>): Promise<TypeOfSitePrimitives | null> {
    return await TypeOfSiteModel.findByPk(id) ?? null
  }
}
