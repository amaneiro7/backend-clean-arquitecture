import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type RegionPrimitives } from '../../domain/Region'
import { type RegionId } from '../../domain/RegionId'
import { RegionRepository } from '../../domain/RegionRepository'
import { RegionModel } from './RegionSchema'

export class SequelizeRegionRepository implements RegionRepository {
  private readonly cacheKey: string = 'regions'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<RegionPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await RegionModel.findAll({
      include: ['state']
    })
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<RegionId>): Promise<RegionPrimitives | null> {
    return await RegionModel.findByPk(id) ?? null
  }
}
