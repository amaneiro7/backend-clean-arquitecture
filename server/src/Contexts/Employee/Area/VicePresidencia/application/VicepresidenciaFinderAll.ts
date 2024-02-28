import { type Repository } from '../../../../Shared/domain/Repository'
import { type VicepresidenciaPrimitives } from '../domain/vicepresidencia'

export class SearchAllVicepresidencia {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<VicepresidenciaPrimitives[]> {
    return await this.repository.vicepresidencia.searchAll()
  }
}
