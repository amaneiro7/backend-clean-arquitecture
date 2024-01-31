import { type Repository } from '../../../../Shared/domain/Repository'
import { type MemoryRamCapacityPrimitives } from '../domain/MemoryRamCapacity'

export class SearchAllMemoryRamCapacity {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<MemoryRamCapacityPrimitives[]> {
    return await this.repository.memoryRamCapacity.searchAll()
  }
}
