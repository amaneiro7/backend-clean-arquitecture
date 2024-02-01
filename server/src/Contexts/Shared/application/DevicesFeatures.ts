import { CategoryDefault } from '../../Category/domain/CategoryDefaultValues'
import { ComputerCreator } from '../../Features/Computer/application/ComputerCreator'
import { HardDriveCreator } from '../../Features/HardDrive.ts/HardDrive/application/HardDriveCreator'
import { type Repository } from '../domain/Repository'
import { InvalidArgumentError } from '../domain/value-object/InvalidArgumentError'

interface Props {
  repository: Repository
  category: typeof CategoryDefault.COMPUTERS | string
  deviceId: string
  categoryId: number
  processorId?: string
  memoryRamCapacity?: number
  hardDriveCapacityId: number
  hardDriveTypeId: number
  operatingSystemId?: number
  operatingSystemArqId?: number
  ipAddress?: string
  macAddress?: string
  health?: number
}

export class DevicesFeatures {
  async run (params: Props): Promise<void> {
    const { repository, category, categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId } = params
    if (category === CategoryDefault.COMPUTERS) {
      const { processorId, memoryRamCapacity, operatingSystemId, operatingSystemArqId, ipAddress, macAddress } = params
      if (processorId === undefined || memoryRamCapacity === undefined || operatingSystemId === undefined || operatingSystemArqId === undefined || ipAddress === undefined || macAddress === undefined) {
        throw new InvalidArgumentError('Invalid Params')
      }
      await this.computerCreator({
        repository,
        categoryId,
        deviceId,
        hardDriveCapacityId,
        hardDriveTypeId,
        processorId,
        memoryRamCapacity,
        operatingSystemId,
        operatingSystemArqId,
        ipAddress,
        macAddress
      })
    }
    if (category === CategoryDefault.HARDDRIVE) {
      const { health } = params
      if (health === undefined) {
        throw new InvalidArgumentError('Invalid Params')
      }
      await this.hardDriveCreator({
        repository,
        categoryId,
        deviceId,
        hardDriveCapacityId,
        hardDriveTypeId,
        health
      })
    }
  }

  async computerCreator ({
    repository,
    categoryId,
    deviceId,
    processorId,
    memoryRamCapacity,
    hardDriveCapacityId,
    hardDriveTypeId,
    operatingSystemId,
    operatingSystemArqId,
    ipAddress,
    macAddress
  }: {
    repository: Repository
    categoryId: number
    deviceId: string
    processorId: string
    memoryRamCapacity: number
    hardDriveCapacityId: number
    hardDriveTypeId: number
    operatingSystemId: number
    operatingSystemArqId: number
    ipAddress: string
    macAddress: string
  }): Promise<void> {
    await new ComputerCreator(repository).run({
      categoryId,
      deviceId,
      processorId,
      memoryRamCapacity,
      hardDriveCapacityId,
      hardDriveTypeId,
      operatingSystemId,
      operatingSystemArqId,
      ipAddress,
      macAddress
    })
  }

  async hardDriveCreator ({
    repository,
    categoryId,
    deviceId,
    hardDriveCapacityId,
    hardDriveTypeId,
    health
  }: {
    repository: Repository
    categoryId: number
    deviceId: string
    hardDriveCapacityId: number
    hardDriveTypeId: number
    health: number
  }): Promise<void> {
    await new HardDriveCreator(repository).run({
      categoryId,
      deviceId,
      hardDriveCapacityId,
      hardDriveTypeId,
      health
    })
  }
}
