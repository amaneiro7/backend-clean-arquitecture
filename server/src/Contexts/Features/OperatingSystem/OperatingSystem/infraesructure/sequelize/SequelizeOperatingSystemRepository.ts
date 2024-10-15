import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type OperatingSystemPrimitives } from '../../domain/OperatingSystem'
import { type OperatingSystemId } from '../../domain/OperatingSystemId'
import { type OperatingSystemRepository } from '../../domain/OperatingSystemRepository'
import { CacheService } from '../../../../../Shared/domain/CacheService'
import { OperatingSystemModel } from './OperatingSystemSchema'

export class SequelizeOperatingSystemRepository implements OperatingSystemRepository {
  private readonly cacheKey: string = 'operatingSystem'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<OperatingSystemPrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await OperatingSystemModel.findAll()
    })

  }

  async searchById(id: Primitives<OperatingSystemId>): Promise<OperatingSystemPrimitives | null> {
    return await OperatingSystemModel.findByPk(id) ?? null
  }
}
