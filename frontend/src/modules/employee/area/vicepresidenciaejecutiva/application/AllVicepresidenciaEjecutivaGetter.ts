import { type Repository } from '../../../../shared/domain/repository'
import { type VicepresidenciaEjecutivaPrimitives } from '../domain/VicepresidenciaEjecutiva'

export class AllVicepresidenciaEjecutivaGetter {
  constructor (private readonly repository: Repository) {}

  async get (): Promise<VicepresidenciaEjecutivaPrimitives[]> {
    return await this.repository.vicepresidenciaEjecutiva.getAll()
  }
}
