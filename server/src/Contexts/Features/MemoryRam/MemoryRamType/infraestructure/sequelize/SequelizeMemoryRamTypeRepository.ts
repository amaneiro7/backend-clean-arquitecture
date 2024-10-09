import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type MemoryRamTypePrimitives } from '../../domain/MemoryRamType'
import { type MemoryRamTypeId } from '../../domain/MemoryRamTypeId'
import { type MemoryRamTypeRepository } from '../../domain/MemoryRamTypeRepository'
import { MemoryRamTypeModel } from './MemoryRamTypeSchema'

export class SequelizeMemoryRamTypeRepository implements MemoryRamTypeRepository {
  private readonly cacheKey: string = 'memoryRamType'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<MemoryRamTypePrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await MemoryRamTypeModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<MemoryRamTypeId>): Promise<MemoryRamTypePrimitives | null> {
    return await MemoryRamTypeModel.findByPk(id) ?? null
  }
}
