import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type VicepresidenciaEjecutivaPrimitives } from '../../domain/VicepresidenciaEjecutiva'
import { type VicepresidenciaEjecutivaId } from '../../domain/VicepresidenciaEjecutivaId'
import { type VicepresidenciaEjecutivaRepository } from '../../domain/VicepresidenciaEjecutivaRepository'
import { VicepresidenciaEjecutivaModel } from './VicepresidenciaEjecutivaSchema'

export class SequelizeVicepresidenciaEjecutivaRepository implements VicepresidenciaEjecutivaRepository {
  private readonly cacheKey: string = 'vicepresidenciasEjecutivas'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<VicepresidenciaEjecutivaPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await VicepresidenciaEjecutivaModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<VicepresidenciaEjecutivaId>): Promise<VicepresidenciaEjecutivaPrimitives | null> {
    return await VicepresidenciaEjecutivaModel.findByPk(id) ?? null
  }
}
