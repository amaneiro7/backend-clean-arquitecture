import { type Repository } from '../../../../Shared/domain/Repository'
import { type MemoryRamTypePrimitives } from '../domain/MemoryRamType'

export class SearchAllMemoryRamType {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<MemoryRamTypePrimitives[]> {
    return await this.repository.memoryRamType.searchAll()
  }
}
