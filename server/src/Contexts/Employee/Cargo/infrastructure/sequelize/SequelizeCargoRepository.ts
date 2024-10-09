import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type CargoPrimitives } from '../../domain/Cargo'
import { type CargoId } from '../../domain/CargoId'
import { type CargoRepository } from '../../domain/CargoRepository'
import { CargoModel } from './CargoSchema'

export class SequelizeCargoRepository implements CargoRepository {
  private readonly cacheKey: string = 'cargos'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<CargoPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await CargoModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<CargoId>): Promise<CargoPrimitives | null> {
    return await CargoModel.findByPk(id) ?? null
  }
}
