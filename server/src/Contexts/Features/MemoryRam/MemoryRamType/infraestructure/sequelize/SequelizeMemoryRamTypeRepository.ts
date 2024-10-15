import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type MemoryRamTypePrimitives } from '../../domain/MemoryRamType'
import { type MemoryRamTypeId } from '../../domain/MemoryRamTypeId'
import { type MemoryRamTypeRepository } from '../../domain/MemoryRamTypeRepository'
import { MemoryRamTypeModel } from './MemoryRamTypeSchema'
import { CacheService } from '../../../../../Shared/domain/CacheService'

export class SequelizeMemoryRamTypeRepository implements MemoryRamTypeRepository {
  private readonly cacheKey: string = 'memoryRamType'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<MemoryRamTypePrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await MemoryRamTypeModel.findAll()
    })
  }

  async searchById(id: Primitives<MemoryRamTypeId>): Promise<MemoryRamTypePrimitives | null> {
    return await MemoryRamTypeModel.findByPk(id) ?? null
  }
}
