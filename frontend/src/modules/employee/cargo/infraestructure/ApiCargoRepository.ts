import { makeRequest } from '../../../shared/infraestructure/fetching'
import { type CargoPrimitives } from '../domain/cargo'
import { type CargoRepository } from '../domain/cargoRepository'

export class ApiCargoRepository implements CargoRepository {
  private readonly endpoint: string = 'cargos'
  async getAll(): Promise<CargoPrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })
  }
}
