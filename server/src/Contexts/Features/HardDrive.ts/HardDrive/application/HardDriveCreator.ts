import { type Repository } from '../../../../Shared/domain/Repository'
import { HardDriveCapacityDoesNotExistError } from '../../HardDriveCapacity/domain/HardDriveCapacityDoesNotExist'
import { HardDriveCapacityId } from '../../HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeDoesNotExistError } from '../../HardDriveType/domain/HardDriveTypeDoesNotExist'
import { HardDriveTypeId } from '../../HardDriveType/domain/HardDriveTypeId'
import { HardDrive } from '../domain/HardDrive'

export class HardDriveCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: {
    categoryId: number
    deviceId: string
    hardDriveCapacityId: number
    hardDriveTypeId: number
    health: number
  }): Promise<void> {
    const { categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId, health } = params

    await this.ensureHardDriveCapacityExist(hardDriveCapacityId)
    await this.ensureHardDriveTypeExist(hardDriveTypeId)

    const hardDrive = HardDrive.create({ categoryId, deviceId, hardDriveCapacityId, hardDriveTypeId, health })
    console.log(hardDrive.toPrimitive())

    await this.repository.hardDrive.save(hardDrive.toPrimitive())
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
