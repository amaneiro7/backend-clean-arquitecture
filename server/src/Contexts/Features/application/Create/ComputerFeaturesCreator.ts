import { type Repository } from '../../../Shared/domain/Repository'
import { ComputerFeatures } from '../../domain/Computer/ComputerFeatures'
import { type ComputerOSTypes } from '../../domain/Computer/ComputerOperatingSystem'
import { type ComputerTypes } from '../../domain/Computer/ComputerType'
import { type HardDriveCapacityType } from '../../domain/HardDrive.ts/HardDriveCapacity'
import { type MemoryRamSizeValues } from '../../domain/MemoryRam/MemoryRamSize'

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
