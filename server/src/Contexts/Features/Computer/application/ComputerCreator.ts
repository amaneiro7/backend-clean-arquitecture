import { CategoryDoesNotExistError } from '../../../Category/domain/CategoryDoesNotExistError'
import { CategoryId } from '../../../Category/domain/CategoryId'
import { DeviceDoesNotExistError } from '../../../Device/Device/domain/DeviceDoesNotExistError'
import { DeviceId } from '../../../Device/Device/domain/DeviceId'
import { type Repository } from '../../../Shared/domain/Repository'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { HardDriveCapacityDoesNotExistError } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityDoesNotExist'
import { HardDriveCapacityId } from '../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeDoesNotExistError } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeDoesNotExist'
import { HardDriveTypeId } from '../../HardDrive.ts/HardDriveType/domain/HardDriveTypeId'
import { OperatingSystemDoesNotExistError } from '../../OperatingSystem/OperatingSystem/domain/OperatingSystemDoesNotExist'
import { OperatingSystemId } from '../../OperatingSystem/OperatingSystem/domain/OperatingSystemId'
import { OperatingSystemArqDoesNotExistError } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqDoesNotExist'
import { OperatingSystemArqId } from '../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqID'
import { Computer } from '../domain/Computer'

export class ComputerCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: {
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
    const { categoryId, deviceId, processorId, memoryRamCapacity, hardDriveCapacityId, hardDriveTypeId, operatingSystemId, operatingSystemArqId, ipAddress, macAddress } = params

    await this.ensureCategoryIdExistAndBelongsToHardDriveCategory(categoryId)
    await this.ensureDeviceIdExist(deviceId)
    await this.ensureHardDriveCapacityExist(hardDriveCapacityId)
    await this.ensureHardDriveTypeExist(hardDriveTypeId)
    await this.ensureOperatingSystemExist(operatingSystemId)
    await this.ensureOperatingSystemArqExist(operatingSystemArqId)

    const computer = Computer.create({ categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId, ipAddress, macAddress, memoryRamCapacity, operatingSystemArqId, operatingSystemId, processorId })

    await this.repository.computer.save(computer.toPrimitive())
  }

  private async ensureCategoryIdExistAndBelongsToHardDriveCategory (id: number): Promise<void> {
    const category = await this.repository.category.searchById(new CategoryId(id).value)
    if (category === null) throw new CategoryDoesNotExistError(id.toString())
    if (category.name !== 'Computadoras') throw new InvalidArgumentError('No pertenece a esta categoria')
  }

  private async ensureDeviceIdExist (id: string): Promise<void> {
    if (await this.repository.device.searchById(new DeviceId(id).value) === null) {
      throw new DeviceDoesNotExistError(id)
    }
  }

  private async ensureHardDriveCapacityExist (id: number): Promise<void> {
    if (await this.repository.hardDriveCapacity.searchById(new HardDriveCapacityId(id).value) === null) {
      throw new HardDriveCapacityDoesNotExistError(id)
    }
  }

  private async ensureHardDriveTypeExist (id: number): Promise<void> {
    if (await this.repository.hardDriveType.searchById(new HardDriveTypeId(id).value) === null) {
      throw new HardDriveTypeDoesNotExistError(id)
    }
  }

  private async ensureOperatingSystemExist (id: number): Promise<void> {
    if (await this.repository.operatingSystemVersion.searchById(new OperatingSystemId(id).value) === null) {
      throw new OperatingSystemDoesNotExistError(id)
    }
  }

  private async ensureOperatingSystemArqExist (id: number): Promise<void> {
    if (await this.repository.operatingSystemArq.searchById(new OperatingSystemArqId(id).value) === null) {
      throw new OperatingSystemArqDoesNotExistError(id)
    }
  }
}
