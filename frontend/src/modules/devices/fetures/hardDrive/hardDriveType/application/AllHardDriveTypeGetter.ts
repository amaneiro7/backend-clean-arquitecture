import { type Repository } from '../../../../../shared/domain/repository'
import { type HardDriveTypePrimitives } from '../domain/HardDriveType'

export class AllHardDriveTypeGetter {
  constructor (readonly repository: Repository) {}

  async get (): Promise<HardDriveTypePrimitives[]> {
    return await this.repository.hardDriveType.getAll()
  }
}
