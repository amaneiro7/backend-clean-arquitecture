import { type Repository } from '../../../Shared/domain/Repository'
import { Computer, type ComputerPrimitives } from '../domain/Computer.old'
import { ValidationComputerField } from './ValidationComputerField'

interface ComputerParams extends Omit<ComputerPrimitives, 'id'> {
  categoryId: number
  deviceId: string
}

type FieldValidator = (repository: Repository, field: any) => Promise<void>

interface ValidationConfig {
  field: any
  validator: FieldValidator
}

export class ComputerValidation {
  constructor (private readonly repository: Repository) {}

  async run (params: ComputerParams): Promise<Computer> {
    const { categoryId, deviceId, processorId, memoryRamCapacity, hardDriveCapacityId, hardDriveTypeId, operatingSystemId, operatingSystemArqId, ipAddress, macAddress } = params
    console.log(memoryRamCapacity)

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

    return Computer.create({ categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress, memoryRamCapacity, operatingSystemArqId, operatingSystemId, processorId })
  }
}
