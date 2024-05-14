import { makeRequest } from '../../../../../shared/infraestructure/fetching'
import { type OperatingSystemArqPrimitives } from '../domain/OperatingSystemArq'

export class ApiOperatingSystemArqRepository implements ApiOperatingSystemArqRepository {
  private readonly endpoint: string = 'operatingsystemarqs'
  async getAll (): Promise<OperatingSystemArqPrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })      
  }
}
