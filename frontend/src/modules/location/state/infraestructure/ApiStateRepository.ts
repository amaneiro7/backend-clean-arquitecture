import { type StatePrimitives } from '../domain/state'
import { type StateRepository } from '../domain/stateRepository'
import { makeRequest } from '../../../shared/infraestructure/fetching'

export class ApiStateRepository implements StateRepository {
  private readonly endpoint: string = 'states'
  async getAll (): Promise<StatePrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint})
  }
}
