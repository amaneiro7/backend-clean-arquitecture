import { type CacheRepository } from '../../../Shared/domain/CacheRepository'
import { type HistoryPrimitives } from '../../domain/History'
import { type HistoryRepository } from '../../domain/HistoryRepository'
import { HistoryModel } from './HistorySchema'
import { CacheService } from '../../../Shared/domain/CacheService'

export class SequelizeHistoryRepository implements HistoryRepository {
  private readonly cacheKey: string = 'histories'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<HistoryPrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await HistoryModel.findAll()
    })
  }

  async save(payload: HistoryPrimitives): Promise<void> {
    await HistoryModel.create(payload)
    await new CacheService(this.cache).removeCachedData(this.cacheKey)
    await this.searchAll()

  }
}
