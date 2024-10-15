import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type OperatingSystemArqPrimitives } from '../../domain/OperatingSystemArq'
import { type OperatingSystemArqId } from '../../domain/OperatingSystemArqID'
import { type OperatingSystemArqRepository } from '../../domain/OperatingSystemArqRepository'
import { CacheService } from '../../../../../Shared/domain/CacheService'
import { OperatingSystemArqModel } from './OperatingSystemArqSchema'

export class SequelizeOperatingSystemArqRepository implements OperatingSystemArqRepository {
  private readonly cacheKey: string = 'operatingSystemArq'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<OperatingSystemArqPrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await OperatingSystemArqModel.findAll()
    })

  }

  async searchById(id: Primitives<OperatingSystemArqId>): Promise<OperatingSystemArqPrimitives | null> {
    return await OperatingSystemArqModel.findByPk(id) ?? null
  }
}
