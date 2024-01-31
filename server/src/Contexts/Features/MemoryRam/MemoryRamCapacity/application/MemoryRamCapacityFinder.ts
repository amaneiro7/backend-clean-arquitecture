import { type Repository } from '../../../../Shared/domain/Repository'
import { type MemoryRamCapacityPrimitives } from '../domain/MemoryRamCapacity'
import { MemoryRamCapacityDoesNotExistError } from '../domain/MemoryRamCapacityDoesNotExist'
import { type MemoryRamCapacityId } from '../domain/MemoryRamCapacityId'

export class MemoryRamCapacityFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (id: MemoryRamCapacityId): Promise<MemoryRamCapacityPrimitives> {
    const memoryRamCapacity = await this.repository.memoryRamCapacity.searchById(id.value)
    if (memoryRamCapacity === null) throw new MemoryRamCapacityDoesNotExistError(id.toString())
    return memoryRamCapacity
  }
}
