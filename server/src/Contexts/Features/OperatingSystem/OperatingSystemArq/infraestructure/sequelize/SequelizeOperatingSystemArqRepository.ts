import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type OperatingSystemArqPrimitives } from '../../domain/OperatingSystemArq'
import { type OperatingSystemArqId } from '../../domain/OperatingSystemArqID'
import { type OperatingSystemArqRepository } from '../../domain/OperatingSystemArqRepository'
import { OperatingSystemArqModel } from './OperatingSystemArqSchema'

export class SequelizeOperatingSystemArqRepository implements OperatingSystemArqRepository {
  private readonly cacheKey: string = 'operatingSystemArq'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<OperatingSystemArqPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await OperatingSystemArqModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<OperatingSystemArqId>): Promise<OperatingSystemArqPrimitives | null> {
    return await OperatingSystemArqModel.findByPk(id) ?? null
  }
}
