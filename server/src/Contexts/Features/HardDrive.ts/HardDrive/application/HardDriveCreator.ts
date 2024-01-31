import { CategoryDoesNotExistError } from '../../../../Category/domain/CategoryDoesNotExistError'
import { CategoryId } from '../../../../Category/domain/CategoryId'
import { DeviceDoesNotExistError } from '../../../../Device/Device/domain/DeviceDoesNotExistError'
import { DeviceId } from '../../../../Device/Device/domain/DeviceId'
import { type Repository } from '../../../../Shared/domain/Repository'
import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { HardDriveCapacityDoesNotExistError } from '../../HardDriveCapacity/domain/HardDriveCapacityDoesNotExist'
import { HardDriveCapacityId } from '../../HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeDoesNotExistError } from '../../HardDriveType/domain/HardDriveTypeDoesNotExist'
import { HardDriveTypeId } from '../../HardDriveType/domain/HardDriveTypeId'
import { HardDrive } from '../domain/HardDrive'

export class HardDriveCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { categoryId: number, deviceId: string, hardDriveCapacityId: number, hardDriveTypeId: number, health: number }): Promise<void> {
    const { categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId, health } = params

    await this.ensureCategoryIdExistAndBelongsToHardDriveCategory(categoryId)
    await this.ensureDeviceIdExist(deviceId)
    await this.ensureHardDriveCapacityExist(hardDriveCapacityId)
    await this.ensureHardDriveTypeExist(hardDriveTypeId)

    const hardDrive = HardDrive.create({ categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId, health })

    await this.repository.hardDrive.save(hardDrive.toPrimitive())
  }

  private async ensureCategoryIdExistAndBelongsToHardDriveCategory (id: number): Promise<void> {
    const category = await this.repository.category.searchById(new CategoryId(id).value)
    if (category === null) throw new CategoryDoesNotExistError(id.toString())
    if (category.name === 'Discos Duros') throw new InvalidArgumentError('No pertenece a esta categoria')
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
}
