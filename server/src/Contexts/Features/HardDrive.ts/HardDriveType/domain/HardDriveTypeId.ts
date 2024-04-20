import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject'
import { type ComputerHardDriveType } from '../../../Computer/domain/ComputerHardDriveType'
import { type HardDriveTypePrimitives } from './HardDriveType'
import { HardDriveTypeDoesNotExistError } from './HardDriveTypeDoesNotExist'
import { type HardDriveTypeRepository } from './HardDriveTypeRepository'

export class HardDriveTypeId extends StringValueObject {
  static async ensureHardDriveTypeExit ({ repository, hardDriveType }: { repository: HardDriveTypeRepository, hardDriveType: Primitives<ComputerHardDriveType> }): Promise<void> {
    // If the hard drive type value is null, it does not exist, so we don't need to do any verification
    if (hardDriveType === null) {
      return
    }
    // Searches for a device with the given hard drive type value in the database
    const deviceWithHardDriveType: HardDriveTypePrimitives | null = await repository.searchById(hardDriveType)
    // If a device with the given hard drive type value exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given hard drive type value
    if (deviceWithHardDriveType === null) {
      throw new HardDriveTypeDoesNotExistError(hardDriveType)
    }
  }
}
