import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type StatusPrimitives } from '../domain/Status'
import { type StatusRepository } from '../domain/StatusRepository'

export class ApiStatusRepository implements StatusRepository {
  private readonly endpoint: string = 'status'
  async getAll (): Promise<StatusPrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint})
  }
}
