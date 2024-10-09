import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type VicepresidenciaPrimitives } from '../../domain/vicepresidencia'
import { type VicepresidenciaId } from '../../domain/vicepresidenciaId'
import { type VicepresidenciaRepository } from '../../domain/vicepresidenciaRepository'
import { VicepresidenciaModel } from './VicepresidenciaSchema'

export class SequelizeVicepresidenciaRepository implements VicepresidenciaRepository {
  private readonly cacheKey: string = 'vicepresidencias'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<VicepresidenciaPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await VicepresidenciaModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<VicepresidenciaId>): Promise<VicepresidenciaPrimitives | null> {
    return await VicepresidenciaModel.findByPk(id) ?? null
  }
}
