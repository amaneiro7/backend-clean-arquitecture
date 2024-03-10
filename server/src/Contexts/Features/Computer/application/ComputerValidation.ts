import { type Repository } from '../../../Shared/domain/Repository'
import { DeviceComputer, type DeviceComputerPrimitives } from '../domain/Computer'
import { ValidationComputerField } from './ValidationComputerField'

type FieldValidator = (repository: Repository, field: any) => Promise<void>

interface ValidationConfig {
  field: any
  validator: FieldValidator
}

export class ComputerValidation {
  constructor (private readonly repository: Repository) {}

  async run ({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, processorId, memoryRamCapacity, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress }: Omit<DeviceComputerPrimitives, 'id'>): Promise<DeviceComputer> {
    const validations: ValidationConfig[] = [
      { field: processorId, validator: ValidationComputerField.ensureProcessorIdExist },
      { field: operatingSystemId, validator: ValidationComputerField.ensureOperatingSystemExist },
      { field: operatingSystemArqId, validator: ValidationComputerField.ensureOperatingSystemArqExist },
      { field: hardDriveCapacityId, validator: ValidationComputerField.ensureHardDriveCapacityExist },
      { field: hardDriveTypeId, validator: ValidationComputerField.ensureHardDriveTypeExist }
    ]
    for (const validation of validations) {
      if (validation.field !== undefined) {
        await validation.validator(this.repository, validation.field)
      }
    }

    return DeviceComputer.create({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, locationId, processorId, memoryRamCapacity, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress })
  }
}
