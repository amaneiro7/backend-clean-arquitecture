import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type VicepresidenciaEjecutivaPrimitives } from '../domain/VicepresidenciaEjecutiva'
import { type VicepresidenciaEjecutivaRepository } from '../domain/VicepresidenciaEjecutivaRepository'

export class ApiVicepresidenciaEjecutivaRepository implements VicepresidenciaEjecutivaRepository {
  private readonly endpoint: string = 'vicepresidenciasejecutivas'
  async getAll(): Promise<VicepresidenciaEjecutivaPrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })
  }
}
