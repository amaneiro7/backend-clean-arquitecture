import { type Repository } from '../../../../Shared/domain/Repository'
import { DeviceHardDrive, type DeviceHardDrivePrimitives } from '../domain/HardDrive'

import { ValidationHardDriveField } from './ValidationHardDrive'

type FieldValidator = (repository: Repository, field: any) => Promise<void>

interface ValidationConfig {
  field: any
  validator: FieldValidator
}

export class HardDriveValidation {
  constructor (private readonly repository: Repository) {}

  async run ({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, hardDriveCapacityId, hardDriveTypeId, health }: Omit<DeviceHardDrivePrimitives, 'id'>): Promise<DeviceHardDrive> {
    const validations: ValidationConfig[] = [
      { field: hardDriveCapacityId, validator: ValidationHardDriveField.ensureHardDriveCapacityExist },
      { field: hardDriveTypeId, validator: ValidationHardDriveField.ensureHardDriveTypeExist }
    ]
    for (const validation of validations) {
      if (validation.field !== undefined) {
        await validation.validator(this.repository, validation.field)
      }
    }

    return DeviceHardDrive.create({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, hardDriveCapacityId, hardDriveTypeId, health })
  }
}
