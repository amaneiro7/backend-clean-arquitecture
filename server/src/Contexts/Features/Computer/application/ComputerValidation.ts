import { type Repository } from '../../../Shared/domain/Repository'
import { HardDriveCapacityId } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeId } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeId'
import { DeviceComputer, type DeviceComputerPrimitives } from '../domain/Computer'
import { ComputerName } from '../domain/ComputerName'
import { ComputerOperatingSystem } from '../domain/ComputerOperatingSystem'
import { ComputerOperatingSystemArq } from '../domain/ComputerOperatingSystemArq'
import { ComputerProcessor } from '../domain/ComputerProcessor'

export class ComputerValidation {
  constructor (private readonly repository: Repository) {}

  async run ({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, observation, locationId, computerName, processorId, memoryRamCapacity, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress }: Omit<DeviceComputerPrimitives, 'id'>): Promise<DeviceComputer> {
    await ComputerName.ensuerComputerNameDoesNotExit({ repository: this.repository.device, computerName })
    await ComputerProcessor.ensureProcessorExit({ repository: this.repository.processor, processor: processorId })
    await HardDriveCapacityId.ensureHardDriveCapacityExit({ repository: this.repository.hardDriveCapacity, hardDriveCapacity: hardDriveCapacityId })
    await HardDriveTypeId.ensureHardDriveTypeExit({ repository: this.repository.hardDriveType, hardDriveType: hardDriveTypeId })
    await ComputerOperatingSystem.ensureOperatingSystemExit({ repository: this.repository.operatingSystemVersion, operatingSystem: operatingSystemId })
    await ComputerOperatingSystemArq.ensureOperatingSystemArqExit({ repository: this.repository.operatingSystemArq, operatingSystemArq: operatingSystemArqId })

    return DeviceComputer.create({ serial, activo, statusId, categoryId, brandId, modelId, employeeId, observation, locationId, computerName, processorId, memoryRamCapacity, operatingSystemArqId, operatingSystemId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress })
  }
}
