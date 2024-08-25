import { type Repository } from '../../../../Shared/domain/Repository'
import { type HardDriveCapacityPrimitives } from '../domain/HardDriveCapacity'

export class SearchAllHardDriveCapacity {
  constructor (private readonly repository: Repository) {}

  async search (): Promise<HardDriveCapacityPrimitives[]> {
    return await this.repository.hardDriveCapacity.searchAll()
  }
}
