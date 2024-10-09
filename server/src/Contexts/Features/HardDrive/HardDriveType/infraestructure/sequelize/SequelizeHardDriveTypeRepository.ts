import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type HardDriveTypePrimitives } from '../../domain/HardDriveType'
import { type HardDriveTypeId } from '../../domain/HardDriveTypeId'
import { type HardDriveTypeRepository } from '../../domain/HardDriveTypeRepository'
import { HardDriveTypeModel } from './HardDriveTypeSchema'

export class SequelizeHardDriveTypeRepository implements HardDriveTypeRepository {
  private readonly cacheKey: string = 'hardDriveType'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<HardDriveTypePrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await HardDriveTypeModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<HardDriveTypeId>): Promise<HardDriveTypePrimitives | null> {
    return await HardDriveTypeModel.findByPk(id) ?? null
  }
}
