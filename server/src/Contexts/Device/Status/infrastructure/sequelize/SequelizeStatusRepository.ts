import { CacheService } from '../../../../Shared/domain/CacheService'
import { StatusModel } from './StatusSchema'
import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type StatusPrimitives } from '../../domain/Status'
import { type StatusId } from '../../domain/StatusId'
import { type StatusRepository } from '../../domain/StatusRepository'

export class SequelizeStatusRepository implements StatusRepository {
  private readonly cacheKey: string = 'status'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<StatusPrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await StatusModel.findAll()

    })
  }

  async searchById(id: Primitives<StatusId>): Promise<StatusPrimitives | null> {
    return await StatusModel.findByPk(id) ?? null
  }
}
