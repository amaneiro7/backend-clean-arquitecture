import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type GerenciaPrimitives } from '../../domain/Gerencia'
import { type GerenciaId } from '../../domain/GerenciaId'
import { type GerenciaRepository } from '../../domain/GerenciaRepository'
import { CacheService } from '../../../../../Shared/domain/CacheService'
import { GerenciaModel } from './GerenciaSchema'

export class SequelizeGerenciaRepository implements GerenciaRepository {
  private readonly cacheKey: string = 'gerencias'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<GerenciaPrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await GerenciaModel.findAll()
    })
  }

  async searchById(id: Primitives<GerenciaId>): Promise<GerenciaPrimitives | null> {
    return await GerenciaModel.findByPk(id) ?? null
  }
}
