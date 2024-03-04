import { type Repository } from '../../../../Shared/domain/Repository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { HardDriveCapacityDoesNotExistError } from '../../HardDriveCapacity/domain/HardDriveCapacityDoesNotExist'
import { HardDriveCapacityId } from '../../HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeDoesNotExistError } from '../../HardDriveType/domain/HardDriveTypeDoesNotExist'
import { HardDriveTypeId } from '../../HardDriveType/domain/HardDriveTypeId'
import { type DeviceHardDrive } from '../domain/HardDrive'
import { type HardDriveHealth } from '../domain/HardDriveHealth'

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class ValidationHardDriveField {
  static async ensureHardDriveCapacityExist (repository: Repository, hardDriveCapacityId: Primitives<HardDriveCapacityId>, entity?: DeviceHardDrive): Promise<void> {
    if (entity !== undefined && hardDriveCapacityId === entity.hardDriveCapacityValue) {
      return
    }
    if (await repository.hardDriveCapacity.searchById(new HardDriveCapacityId(hardDriveCapacityId).value) === null) {
      throw new HardDriveCapacityDoesNotExistError(hardDriveCapacityId)
    }
  }

  static async ensureHardDriveTypeExist (repository: Repository, hardDriveTypeId: Primitives<HardDriveTypeId>, entity?: DeviceHardDrive): Promise<void> {
    if (entity !== undefined && hardDriveTypeId === entity.hardDriveTypeValue) {
      return
    }
    if (await repository.hardDriveType.searchById(new HardDriveTypeId(hardDriveTypeId).value) === null) {
      throw new HardDriveTypeDoesNotExistError(hardDriveTypeId)
    }
  }

  static async ensureHardDriveHealth (repository: Repository, health: Primitives<HardDriveHealth>, entity?: DeviceHardDrive): Promise<void> {
    if (entity !== undefined && health === entity.healthValue) {
      return
    }
    console.log(health)
  }
}
