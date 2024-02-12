import { type Repository } from '../../../../Shared/domain/Repository'
import { HardDriveCapacityDoesNotExistError } from '../../HardDriveCapacity/domain/HardDriveCapacityDoesNotExist'
import { HardDriveCapacityId } from '../../HardDriveCapacity/domain/HardDriveCapacityId'
import { HardDriveTypeDoesNotExistError } from '../../HardDriveType/domain/HardDriveTypeDoesNotExist'
import { HardDriveTypeId } from '../../HardDriveType/domain/HardDriveTypeId'

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class ValidationHardDriveField {
  static async ensureHardDriveCapacityExist (repository: Repository, id: number): Promise<void> {
    if (await repository.hardDriveCapacity.searchById(new HardDriveCapacityId(id).value) === null) {
      throw new HardDriveCapacityDoesNotExistError(id)
    }
  }

  static async ensureHardDriveTypeExist (repository: Repository, id: number): Promise<void> {
    if (await repository.hardDriveType.searchById(new HardDriveTypeId(id).value) === null) {
      throw new HardDriveTypeDoesNotExistError(id)
    }
  }
}
