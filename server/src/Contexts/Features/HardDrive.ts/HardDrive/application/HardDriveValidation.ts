import { type Repository } from '../../../../Shared/domain/Repository'
import { DeviceHardDrive, type DeviceHardDrivePrimitives } from '../domain/HardDrive'
import { HDDCapacity } from '../domain/HDDCapacity'
import { HDDType } from '../domain/HDDType'

export class HardDriveValidation {
  constructor (private readonly repository: Repository) {}

  async run ({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, hardDriveCapacityId, hardDriveTypeId, health }: Omit<DeviceHardDrivePrimitives, 'id'>): Promise<DeviceHardDrive> {
    await HDDCapacity.ensureHardDriveCapacityExit({ repository: this.repository.hardDriveCapacity, hardDriveCapacity: hardDriveCapacityId })
    await HDDType.ensureHardDriveTypeExit({ repository: this.repository.hardDriveType, hardDriveType: hardDriveTypeId })

    return DeviceHardDrive.create({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, observation, hardDriveCapacityId, hardDriveTypeId, health })
  }
}
