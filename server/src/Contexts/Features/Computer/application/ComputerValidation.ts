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

  async run (params: Omit<DeviceComputerPrimitives, 'id' | 'memoryRamCapacity'>): Promise<DeviceComputer> {
    await ComputerName.ensuerComputerNameDoesNotExit({ repository: this.repository.device, computerName: params.computerName })
    await ComputerProcessor.ensureProcessorExit({ repository: this.repository.processor, processor: params.processorId })
    await HardDriveCapacityId.ensureHardDriveCapacityExit({ repository: this.repository.hardDriveCapacity, hardDriveCapacity: params.hardDriveCapacityId })
    await HardDriveTypeId.ensureHardDriveTypeExit({ repository: this.repository.hardDriveType, hardDriveType: params.hardDriveTypeId })
    await ComputerOperatingSystem.ensureOperatingSystemExit({ repository: this.repository.operatingSystemVersion, operatingSystem: params.operatingSystemId })
    await ComputerOperatingSystemArq.ensureOperatingSystemArqExit({ repository: this.repository.operatingSystemArq, operatingSystemArq: params.operatingSystemArqId })

    return DeviceComputer.create(params)
  }
}
