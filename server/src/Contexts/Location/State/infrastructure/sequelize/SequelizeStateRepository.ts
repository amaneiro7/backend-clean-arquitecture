import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { CacheService } from '../../../../Shared/domain/CacheService'
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
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await StateModel.findAll()
    })

  }

  async searchById(id: Primitives<StateId>): Promise<StatePrimitives | null> {
    return await StateModel.findByPk(id) ?? null
  }
}

