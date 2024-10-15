import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type CargoPrimitives } from '../../domain/Cargo'
import { type CargoId } from '../../domain/CargoId'
import { type CargoRepository } from '../../domain/CargoRepository'
import { CacheService } from '../../../../Shared/domain/CacheService'
import { CargoModel } from './CargoSchema'

export class SequelizeCargoRepository implements CargoRepository {
  private readonly cacheKey: string = 'cargos'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<CargoPrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await CargoModel.findAll()
    })

  }

  async searchById(id: Primitives<CargoId>): Promise<CargoPrimitives | null> {
    return await CargoModel.findByPk(id) ?? null
  }
}
