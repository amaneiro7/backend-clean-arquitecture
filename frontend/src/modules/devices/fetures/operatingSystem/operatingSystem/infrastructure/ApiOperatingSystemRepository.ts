
import { makeRequest } from '../../../../../shared/infraestructure/fetching'
import { type OperatingSystemPrimitives } from '../domain/OperatingSystem'
import { type OperatingSystemRepository } from '../domain/OperatingSystemRepository'

export class ApiOperatingSystemRepository implements OperatingSystemRepository {  
    private readonly endpoint: string = 'operatingsystems'
    async getAll (): Promise<OperatingSystemPrimitives[]> {
      return await makeRequest({ method: 'GET', endpoint: this.endpoint })      
    }
}
