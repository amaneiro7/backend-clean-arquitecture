import { CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { CacheService } from '../../../../Shared/domain/CacheService'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type CityPrimitives } from '../../domain/City'
import { type CityId } from '../../domain/CityId'
import { CityRepository } from '../../domain/CityRepository'
import { CityModel } from './CitySchema'

export class SequelizeCityRepository implements CityRepository {
  private readonly cacheKey: string = 'cities'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<CityPrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await CityModel.findAll({
        include: ['state']
      })
    })
  }

  async searchById(id: Primitives<CityId>): Promise<CityPrimitives | null> {
    return await CityModel.findByPk(id) ?? null
  }
}
