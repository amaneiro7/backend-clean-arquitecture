import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type HardDriveCapacityPrimitives } from '../../domain/HardDriveCapacity'
import { type HardDriveCapacityId } from '../../domain/HardDriveCapacityId'
import { type HardDriveCapacityRepository } from '../../domain/HardDriveCapacityRepository'
import { HardDriveCapacityModel } from './HardDriveCapacitySchema'

export class SequelizeHardDriveCapacityRepository implements HardDriveCapacityRepository {
  private readonly cacheKey: string = 'hardDriveCapacities'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<HardDriveCapacityPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await HardDriveCapacityModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<HardDriveCapacityId>): Promise<HardDriveCapacityPrimitives | null> {
    return await HardDriveCapacityModel.findByPk(id) ?? null
  }
}
