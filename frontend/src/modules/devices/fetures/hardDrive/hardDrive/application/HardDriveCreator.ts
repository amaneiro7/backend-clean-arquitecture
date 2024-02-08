import { type Repository } from '../../../../../shared/domain/repository'
import { HardDrive, type HardDrivePrimitives } from '../domain/HardDrive'

export class HardDriveCreator {
  constructor (private readonly repository: Repository) {}

  async create ({ id, categoryId, deviceId, health, hardDriveTypeId, hardDriveCapacityId }: HardDrivePrimitives) {
    const hardDrive = HardDrive.create({ id, categoryId, deviceId, health, hardDriveTypeId, hardDriveCapacityId })
    await this.repository.hardDrive.save({ hardDrive })
  }
}
