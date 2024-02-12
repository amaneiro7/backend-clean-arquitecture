import { type Repository } from '../../../../Shared/domain/Repository'
import { HardDrive } from '../domain/HardDrive'
import { ValidationHardDriveField } from './ValidationHardDrive'

export class HardDriveValidation {
  constructor (private readonly repository: Repository) {}

  async run (params: {
    categoryId: number
    deviceId: string
    hardDriveCapacityId: number
    hardDriveTypeId: number
    health: number
  }): Promise<HardDrive> {
    const { categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId, health } = params

    await ValidationHardDriveField.ensureHardDriveCapacityExist(this.repository, hardDriveCapacityId)
    await ValidationHardDriveField.ensureHardDriveTypeExist(this.repository, hardDriveTypeId)

    return HardDrive.create({ categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId, health })
  }
}
