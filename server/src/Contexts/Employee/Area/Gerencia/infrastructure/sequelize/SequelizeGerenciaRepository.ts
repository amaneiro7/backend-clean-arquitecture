import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type GerenciaPrimitives } from '../../domain/Gerencia'
import { type GerenciaId } from '../../domain/GerenciaId'
import { type GerenciaRepository } from '../../domain/GerenciaRepository'
import { GerenciaModel } from './GerenciaSchema'

export class SequelizeGerenciaRepository implements GerenciaRepository {
  private readonly cacheKey: string = 'gerencias'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<GerenciaPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await GerenciaModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<GerenciaId>): Promise<GerenciaPrimitives | null> {
    return await GerenciaModel.findByPk(id) ?? null
  }
}
