import { type Repository } from '../../../../../shared/domain/repository'
import { type HardDriveCapacityPrimitives } from '../domain/HardDriveCapacity'

export class AllHardDriveCapacityGetter {
  constructor (readonly repository: Repository) {}

  async get (): Promise<HardDriveCapacityPrimitives[]> {
    return await this.repository.hardDriveCapacity.getAll()
  }
}
