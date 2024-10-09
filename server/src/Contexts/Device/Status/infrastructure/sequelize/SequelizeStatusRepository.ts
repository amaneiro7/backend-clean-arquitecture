import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type StatusPrimitives } from '../../domain/Status'
import { type StatusId } from '../../domain/StatusId'
import { type StatusRepository } from '../../domain/StatusRepository'
import { StatusModel } from './StatusSchema'

export class SequelizeStatusRepository implements StatusRepository {
  private readonly cacheKey: string = 'status'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<StatusPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const result = await StatusModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(result))
    return result
  }

  async searchById(id: Primitives<StatusId>): Promise<StatusPrimitives | null> {
    return await StatusModel.findByPk(id) ?? null
  }
}
