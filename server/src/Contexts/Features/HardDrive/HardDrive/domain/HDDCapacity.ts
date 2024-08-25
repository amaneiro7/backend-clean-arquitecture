import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { HardDriveCapacityId } from '../../HardDriveCapacity/domain/HardDriveCapacityId'
import { type HardDriveCapacityRepository } from '../../HardDriveCapacity/domain/HardDriveCapacityRepository'
import { type DeviceHardDrive } from './HardDrive'

export class HDDCapacity extends HardDriveCapacityId {
  static async updateHardDriveCapacityField({ repository, hardDriveCapacity, entity }: { repository: HardDriveCapacityRepository, hardDriveCapacity?: Primitives<HDDCapacity>, entity: DeviceHardDrive }): Promise<void> {
    // Si no se ha pasado un nuevo valor de la capacidad del Disco Duro no realiza ninguna acción
    if (hardDriveCapacity === undefined) {
      return
    }
    // Verifica que si el valor actual y el nuevo valor son iguales no realice ningún cambio
    if (entity.employeeeValue === hardDriveCapacity) {
      return
    }
    // Verifica que el valor de la capacidad del Disco Duro exista en la base de datos, si no existe lanza un error {@link EmployeeDoesNotExistError} con el valor de la capacidad del Disco Duro pasado
    await HardDriveCapacityId.ensureHardDriveCapacityExit({ repository, hardDriveCapacity })
    // Actualiza el campo valor de la capacidad del Disco Duro de la entidad {@link Device} con el nuevo valor de la capacidad del Disco Duro
    entity.updateHardDriveCapacity(hardDriveCapacity)
  }
}
