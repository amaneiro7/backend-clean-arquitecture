import { type Repository } from '../../../../shared/domain/repository'
import { type VicepresidenciaPrimitives } from '../domain/Vicepresidencia'

export class AllVicepresidenciaGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<VicepresidenciaPrimitives[]> {
    return await this.repository.vicepresidencia.getAll()
  }
}
