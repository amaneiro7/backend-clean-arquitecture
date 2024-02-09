import { type Repository } from '../../../../../shared/domain/repository'
import { type HardDrivePrimitives } from '../domain/HardDrive'

export class AllHardDriveGetter {
  constructor (readonly repository: Repository) {}

  async get (): Promise<HardDrivePrimitives[]> {
    return await this.repository.hardDrive.getAll()
  }
}
