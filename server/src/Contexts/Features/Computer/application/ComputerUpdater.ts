import { type DeviceId } from '../../../Device/Device/domain/DeviceId'
import { type Repository } from '../../../Shared/domain/Repository'
import { Computer } from '../domain/Computer'
import { ComputerDoesNotExistError } from '../domain/ComputerDoesNotExistError'
import { ValidationComputerField } from './ValidationComputerField'

interface ComputerParams {
  processorId: string
  memoryRamCapacity: number
  operatingSystemId: number
  operatingSystemArqId: number
  ipAddress: string
  macAddress: string
  hardDriveCapacityId: number
  hardDriveTypeId: number
}

type FieldValidator = (repository: Repository, field: any) => Promise<void>
type FieldUpdater = (field: any) => void

interface ValidationConfig {
  field: any
  validator: FieldValidator
  updater: FieldUpdater
}
export class ComputerUpdater {
  constructor (private readonly repository: Repository) {}

  async run ({ deviceId, params }: { deviceId: DeviceId, params: Partial<ComputerParams> }): Promise<void> {
    const { processorId, memoryRamCapacity, operatingSystemId, operatingSystemArqId, ipAddress, hardDriveCapacityId, hardDriveTypeId } = params
    const computer = await this.repository.computer.searchByDeviceId(deviceId.value)
    if (computer == null) {
      throw new ComputerDoesNotExistError(deviceId.value)
    }
    const computerEntity = Computer.fromPrimitives(computer)

    const validations: ValidationConfig[] = [
      { field: processorId, validator: ValidationComputerField.ensureProcessorIdExist, updater: computerEntity.updateProcessor },
      { field: operatingSystemId, validator: ValidationComputerField.ensureOperatingSystemExist, updater: computerEntity.updateOperatingSystem },
      { field: operatingSystemArqId, validator: ValidationComputerField.ensureOperatingSystemArqExist, updater: computerEntity.updateOperatingSystemArq },
      { field: hardDriveCapacityId, validator: ValidationComputerField.ensureHardDriveCapacityExist, updater: computerEntity.updateHardDriveCapacity },
      { field: hardDriveTypeId, validator: ValidationComputerField.ensureHardDriveTypeExist, updater: computerEntity.updateHardDriveType }
    ]
    for (const validation of validations) {
      if (validation.field !== undefined) {
        await validation.validator(this.repository, validation.field)
        validation.updater(validation.field)
      }
    }

    if (ipAddress !== undefined) {
      computerEntity.updateIPAddress(ipAddress)
    }

    if (memoryRamCapacity !== undefined) {
      computerEntity.updateMemoryRam(memoryRamCapacity)
    }
    await this.repository.computer.save(computerEntity.toPrimitive())
  }
}
