import { makeRequest } from '../../../../../shared/infraestructure/fetching'
import { type MemoryRamTypePrimitives } from '../domain/MemoryRamType'
import { type MemoryRamTypeRepository } from '../domain/MemoryRamTypeRepository'

export class ApiMemoryRamTypeRepository implements MemoryRamTypeRepository {
  private readonly endpoint: string = 'memoryramtypes'
  async getAll (): Promise<MemoryRamTypePrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })      
  }
}
