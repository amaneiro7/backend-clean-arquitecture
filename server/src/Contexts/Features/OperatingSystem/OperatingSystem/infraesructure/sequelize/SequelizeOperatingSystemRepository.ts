import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type OperatingSystemPrimitives } from '../../domain/OperatingSystem'
import { type OperatingSystemId } from '../../domain/OperatingSystemId'
import { type OperatingSystemRepository } from '../../domain/OperatingSystemRepository'
import { OperatingSystemModel } from './OperatingSystemSchema'

export class SequelizeOperatingSystemRepository implements OperatingSystemRepository {
  private readonly cacheKey: string = 'operatingSystem'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<OperatingSystemPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await OperatingSystemModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<OperatingSystemId>): Promise<OperatingSystemPrimitives | null> {
    return await OperatingSystemModel.findByPk(id) ?? null
  }
}
