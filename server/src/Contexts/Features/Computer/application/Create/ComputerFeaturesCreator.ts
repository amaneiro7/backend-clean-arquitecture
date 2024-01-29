import { type Repository } from '../../../../Shared/domain/Repository'
import { ComputerFeatures } from '../../domain/ComputerFeatures'
import { type ComputerOSTypes } from '../../domain/ComputerOperatingSystem'
import { type ComputerTypes } from '../../domain/ComputerType'
import { type HardDriveCapacityType } from '../../domain/HardDrive.ts/HardDriveCapacity'
import { type MemoryRamSizeValues } from '../../../MemoryRam/MemoryRamSize'

export class ComputerFeaturesCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: {
    categoryId: string
    deviceId: string
    computerType: ComputerTypes
    hardDriveCapacity: HardDriveCapacityType
    memoryRam: MemoryRamSizeValues
    operatingSystem: ComputerOSTypes
    processorId: string }
  ): Promise<void> {
    const { categoryId, deviceId, computerType, hardDriveCapacity, memoryRam, operatingSystem, processorId } = params

    const computerFeaturesCreator = ComputerFeatures.create({ categoryId, deviceId, computerType, hardDriveCapacity, memoryRam, operatingSystem, processorId })

    await this.repository.computerFeatures.save(computerFeaturesCreator)
  }
}
