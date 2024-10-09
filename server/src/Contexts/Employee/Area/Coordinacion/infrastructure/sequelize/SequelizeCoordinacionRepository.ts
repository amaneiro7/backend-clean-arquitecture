import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type CoordinacionPrimitives } from '../../domain/Coordinacion'
import { type CoordinacionId } from '../../domain/CoordinacionId'
import { type CoordinacionRepository } from '../../domain/CoordinacionRepository'
import { CoordinacionModel } from './CoordinacionSchema'

export class SequelizeCoordinacionRepository implements CoordinacionRepository {
  private readonly cacheKey: string = 'coordinations'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<CoordinacionPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await CoordinacionModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<CoordinacionId>): Promise<CoordinacionPrimitives | null> {
    return await CoordinacionModel.findByPk(id) ?? null
  }
}
