import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type VicepresidenciaPrimitives } from '../domain/Vicepresidencia'
import { type VicepresidenciaRepository } from '../domain/VicepresidenciaRepository'

export class ApiVicepresidenciaRepository implements VicepresidenciaRepository {
  private readonly endpoint: string = 'vicepresidencias'
  async getAll(): Promise<VicepresidenciaPrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })
  }
}
