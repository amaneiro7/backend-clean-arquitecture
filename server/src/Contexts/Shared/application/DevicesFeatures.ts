import { ComputerCreator } from '../../Features/Computer/application/ComputerCreator'
import { Computer } from '../../Features/Computer/domain/Computer.old'
import { HardDriveCreator } from '../../Features/HardDrive.ts/HardDrive/application/HardDriveCreator'
import { HardDrive } from '../../Features/HardDrive.ts/HardDrive/domain/HardDriveold'
import { type Repository } from '../domain/Repository'
import { InvalidArgumentError } from '../domain/value-object/InvalidArgumentError'

interface Props {
  repository: Repository
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
    const { repository, categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId } = params

    if (Computer.isComputerCategory({ categoryId })) {
      const { processorId, memoryRamCapacity, operatingSystemId, operatingSystemArqId, ipAddress, macAddress } = params
      console.log('he sido llamado', Computer.isComputerCategory({ categoryId }), 'categoryId', categoryId)

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

    if (HardDrive.isHardDriveCategory({ categoryId })) {
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
