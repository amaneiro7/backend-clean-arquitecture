import { API_URL } from '../../../../../shared/infraestructure/config'
import { type MemoryRamTypePrimitives } from '../domain/MemoryRamType'
import { type MemoryRamTypeRepository } from '../domain/MemoryRamTypeRepository'

export class ApiMemoryRamTypeRepository implements MemoryRamTypeRepository {
  async getAll (): Promise<MemoryRamTypePrimitives[]> {
    return await fetch(`${API_URL}/memoryramtypes`)
      .then(async response => await (response.json() as Promise<MemoryRamTypePrimitives[]>))
  }
}
