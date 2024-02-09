import { type Repository } from '../../../../../shared/domain/repository'
import { type MemoryRamTypePrimitives } from '../domain/MemoryRamType'

export class AllMemoryRamTypeGetter {
  constructor (readonly repository: Repository) {}

  async get (): Promise<MemoryRamTypePrimitives[]> {
    return await this.repository.memoryRamType.getAll()
  }
}
