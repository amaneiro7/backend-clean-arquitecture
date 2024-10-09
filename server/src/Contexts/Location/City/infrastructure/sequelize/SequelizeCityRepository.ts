import { CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type CityPrimitives } from '../../domain/City'
import { type CityId } from '../../domain/CityId'
import { CityRepository } from '../../domain/CityRepository'
import { CityModel } from './CitySchema'

export class SequelizeCityRepository implements CityRepository {
  private readonly cacheKey: string = 'cities'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<CityPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await CityModel.findAll({
      include: ['state']
    })
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<CityId>): Promise<CityPrimitives | null> {
    return await CityModel.findByPk(id) ?? null
  }
}
