import { type Repository } from '../../../../Shared/domain/Repository'
import { type VicepresidenciaEjecutivaPrimitives } from '../domain/VicepresidenciaEjecutiva'

export class SearchAllVicepresidenciaEjecutiva {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<VicepresidenciaEjecutivaPrimitives[]> {
    return await this.repository.vicepresidenciaEjecutiva.searchAll()
  }
}
