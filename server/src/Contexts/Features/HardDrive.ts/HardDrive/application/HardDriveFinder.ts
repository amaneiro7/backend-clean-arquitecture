import { type Repository } from '../../../../Shared/domain/Repository'
import { type HardDrivePrimitives } from '../domain/HardDriveold'
import { HardDriveDoesNotExistError } from '../domain/HardDriveDoesNotExist'
import { type HardDriveId } from '../domain/HardDriveId'

export class HardDriveFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (hardDriveId: HardDriveId): Promise<HardDrivePrimitives> {
    const hardDrive = await this.repository.hardDrive.searchById(hardDriveId.value)

    if (hardDrive === null) throw new HardDriveDoesNotExistError(hardDriveId.value)

    return hardDrive
  }
}
