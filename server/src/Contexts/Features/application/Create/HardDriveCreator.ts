import { type Repository } from '../../../Shared/domain/Repository'
import { HardDrive } from '../../domain/HardDrive.ts/HardDrive'
import { type HardDriveCapacityType } from '../../domain/HardDrive.ts/HardDriveCapacity'
import { type HardDriveTypes } from '../../domain/HardDrive.ts/HardDriveType'

export class HardDriveCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { categoryId: string, deviceId: string, capacity: HardDriveCapacityType, health: number, type: HardDriveTypes }): Promise<void> {
    const { categoryId, deviceId, capacity, health, type } = params

    const hardDrive = HardDrive.create({ categoryId, deviceId, capacity, health, type })

    await this.repository.hardDrive.save(hardDrive)
  }
}
