import { HistoryModel } from './HistorySchema'
import { type CacheRepository } from '../../../Shared/domain/CacheRepository'
import { type HistoryPrimitives } from '../../domain/History'
import { type HistoryRepository } from '../../domain/HistoryRepository'

export class SequelizeHistoryRepository implements HistoryRepository {
  private readonly cacheKey: string = 'histories'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<HistoryPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await HistoryModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async save(payload: HistoryPrimitives): Promise<void> {
    await HistoryModel.create(payload)
    await this.cache.del(this.cacheKey)
    await this.searchAll()

  }
}
