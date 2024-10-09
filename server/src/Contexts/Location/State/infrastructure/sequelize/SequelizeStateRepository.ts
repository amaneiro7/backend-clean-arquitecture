import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type StatePrimitives } from '../../domain/State'
import { type StateId } from '../../domain/StateId'
import { StateRepository } from '../../domain/StateRepository'
import { StateModel } from './StateSchema'

export class SequelizeStateRepository extends StateRepository {
  private readonly cacheKey: string = 'states'
  constructor(private readonly cache: CacheRepository) {
    super()
  }
  async searchAll(): Promise<StatePrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await StateModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<StateId>): Promise<StatePrimitives | null> {
    return await StateModel.findByPk(id) ?? null
  }
}

