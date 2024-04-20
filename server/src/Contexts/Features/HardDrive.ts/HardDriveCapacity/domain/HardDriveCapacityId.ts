import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject'
import { type ComputerHardDriveCapacity } from '../../../Computer/domain/ComputerHardDriveCapacity'
import { type HardDriveCapacityPrimitives } from './HardDriveCapacity'
import { HardDriveCapacityDoesNotExistError } from './HardDriveCapacityDoesNotExist'
import { type HardDriveCapacityRepository } from './HardDriveCapacityRepository'

export class HardDriveCapacityId extends StringValueObject {
  static async ensureHardDriveCapacityExit ({ repository, hardDriveCapacity }: { repository: HardDriveCapacityRepository, hardDriveCapacity: Primitives<ComputerHardDriveCapacity> }): Promise<void> {
    // If the valor de la capacidad del Disco Duro is null, it does not exist, so we don't need to do any verification
    if (hardDriveCapacity === null) {
      return
    }
    // Searches for a device with the given valor de la capacidad del Disco Duro in the database
    const deviceWithHardDriveCapacity: HardDriveCapacityPrimitives | null = await repository.searchById(hardDriveCapacity)
    // If a device with the given valor de la capacidad del Disco Duro exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given valor de la capacidad del Disco Duro
    if (deviceWithHardDriveCapacity === null) {
      throw new HardDriveCapacityDoesNotExistError(hardDriveCapacity)
    }
  }
}
