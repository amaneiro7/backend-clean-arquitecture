import { type Repository } from '../../../../Shared/domain/Repository'
import { DeviceHardDrive, type DeviceHardDrivePrimitives } from '../domain/HardDrive'
import { HDDCapacity } from '../domain/HDDCapacity'
import { HDDType } from '../domain/HDDType'

export class HardDriveValidation {
  constructor(private readonly repository: Repository) { }

  async run(params: Omit<DeviceHardDrivePrimitives, 'id'>): Promise<DeviceHardDrive> {
    await HDDCapacity.ensureHardDriveCapacityExit({ repository: this.repository.hardDriveCapacity, hardDriveCapacity: params.hardDriveCapacityId })
    await HDDType.ensureHardDriveTypeExit({ repository: this.repository.hardDriveType, hardDriveType: params.hardDriveTypeId })

    return DeviceHardDrive.create(params)
  }
}
