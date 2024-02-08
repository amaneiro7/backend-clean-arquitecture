import { type Repository } from '../../../../../shared/domain/repository'
import { type HardDrivePrimitives } from '../domain/HardDrive'
import { HardDriveId } from '../domain/HardDriveId'

export class HardDriveGetter {
  constructor (private readonly repository: Repository) {}

  async getById (id: string): Promise<HardDrivePrimitives> {
    const hardDriveId = new HardDriveId(id)
    return await this.repository.hardDrive.getById({ id: hardDriveId })
  }
}
