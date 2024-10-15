import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type HardDriveTypePrimitives } from '../../domain/HardDriveType'
import { type HardDriveTypeId } from '../../domain/HardDriveTypeId'
import { type HardDriveTypeRepository } from '../../domain/HardDriveTypeRepository'
import { CacheService } from '../../../../../Shared/domain/CacheService'
import { HardDriveTypeModel } from './HardDriveTypeSchema'

export class SequelizeHardDriveTypeRepository implements HardDriveTypeRepository {
  private readonly cacheKey: string = 'hardDriveType'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<HardDriveTypePrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await HardDriveTypeModel.findAll()
    })
  }

  async searchById(id: Primitives<HardDriveTypeId>): Promise<HardDriveTypePrimitives | null> {
    return await HardDriveTypeModel.findByPk(id) ?? null
  }
}
